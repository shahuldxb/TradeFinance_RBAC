import os
import pyodbc
from dotenv import load_dotenv

load_dotenv()

DB_SERVER = os.getenv("SQL_SERVER")
DB_NAME = os.getenv("SQL_DATABASE1")   # tf_back
DB_USER = os.getenv("SQL_USERNAME")
DB_PASSWORD = os.getenv("SQL_PASSWORD")
DB_TIMEOUT = int(os.getenv("DB_TIMEOUT", "30"))

def get_tf_connection():
    """
    SQL Server connection
    (SAME STYLE as your working sample code)
    """
    conn_str = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={DB_SERVER};"
        f"DATABASE={DB_NAME};"
        f"UID={DB_USER};"
        f"PWD={DB_PASSWORD};"
        f"Connection Timeout={DB_TIMEOUT};"
        f"TrustServerCertificate=yes;"
    )

    return pyodbc.connect(conn_str)
