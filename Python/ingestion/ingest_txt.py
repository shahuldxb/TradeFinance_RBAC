import os
from pathlib import Path
from dotenv import load_dotenv
from tqdm import tqdm
import time

from langchain_openai import AzureOpenAIEmbeddings
from langchain_postgres import PGVector
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader


def get_env(name: str, required=True, default=None):
    v = os.getenv(name, default)
    if required and not v:
        raise ValueError(f"Missing env var: {name}")
    return v


def load_txts(docs_dir: str):
    docs = []
    for txt_path in Path(docs_dir).glob("**/*.txt"):
        loader = TextLoader(str(txt_path), encoding='utf-8')
        docs.extend(loader.load())
    return docs


def main():
    load_dotenv()
    docs_dir = get_env("DOCS_DIR")
    db_url = get_env("PGVECTOR_DATABASE_URL")
    endpoint = get_env("AZURE_OPENAI_ENDPOINT")
    api_key = get_env("AZURE_OPENAI_API_KEY")
    api_version = get_env("AZURE_OPENAI_API_VERSION")
    emb_deployment = get_env("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT")
    collections = get_env("COLLECTION_NAME")


    print(f"Loading TXT files from: {docs_dir}")
    raw_docs = load_txts(docs_dir)
    print(f"Loaded {len(raw_docs)} documents")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        separators=["\n\n", "\n", " ", ""],
    )
    docs = splitter.split_documents(raw_docs)
    print(f"Split into {len(docs)} chunks")

    embeddings = AzureOpenAIEmbeddings(
        azure_endpoint=endpoint,
        api_key=api_key,
        api_version=api_version,
        deployment=emb_deployment,   # your embeddings deployment name
    )

    # Create (or connect to) a PGVector collection/table
    vectorstore = PGVector(
        embeddings=embeddings,
        connection=db_url,
        collection_name=collections,  # logical collection/table prefix
        use_jsonb=True,                # store metadata as JSONB
    )

    # Upsert docs with tqdm progress bar
    uuids = []
    with tqdm(total=len(docs), desc="Embedding & inserting", unit="chunk") as pbar:
        for doc in docs:
            start_time = time.time()
            ids = vectorstore.add_documents([doc])
            uuids.extend(ids)
            elapsed = time.time() - start_time
            pbar.set_postfix({"last_time_sec": f"{elapsed:.2f}"})
            pbar.update(1)

    print(f"✅ Upserted {len(uuids)} vectors")


if __name__ == "__main__":
    main()