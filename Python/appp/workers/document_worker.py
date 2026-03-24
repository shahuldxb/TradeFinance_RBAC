from concurrent.futures import ProcessPoolExecutor

executor = ProcessPoolExecutor(max_workers=4)

def submit_document_job(fn, *args):
    executor.submit(fn, *args)
