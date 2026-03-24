import random
import string
from datetime import datetime

def generate_unique_transaction_no(db, prefix: str = "TXN") -> str:
    """
    Generate unique transaction number using pyodbc connection.
    """
    while True:
        random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        ym = datetime.now().strftime("%Y%m")
        txn_no = f"{prefix}-{ym}-{random_str}"

        cursor = db.cursor()
        cursor.execute(
            "SELECT 1 FROM dbo.tool_instrument WHERE transaction_no = ?", 
            (txn_no,)
        )
        exists = cursor.fetchone()  # returns None if not exists

        if not exists:
            return txn_no
