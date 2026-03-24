import re


def parse_sub_documents(raw_text: str):
    # 🔥 Allow spaces before and after FILE name
    regex = r"---\s*FILE:\s*(.*?)\s*---\s*([\s\S]*?)(?=---\s*FILE:|$)"
    results = []

    matches = list(re.finditer(regex, raw_text, re.IGNORECASE))

    for match in matches:
        name = match.group(1).strip()
        content = match.group(2).strip()
        results.append((name, content))

    return results
