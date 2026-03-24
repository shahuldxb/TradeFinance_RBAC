import pyodbc
from configures.config import Config, OCR_Config,TF_Config

def get_connection():
    conn_str = (
        f"DRIVER={Config.SQL_DRIVER};"
        f"SERVER={Config.SQL_SERVER};"
        f"DATABASE={Config.SQL_DATABASE};"
        f"UID={Config.SQL_USERNAME};"
        f"PWD={Config.SQL_PASSWORD};"
        "TrustServerCertificate=yes;"
    )
    return pyodbc.connect(conn_str)
def fetch_all(query: str, params: tuple = ()):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(query, params)

        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()

        return [dict(zip(columns, row)) for row in rows]

    finally:
        conn.close()

def get_connection_OCR():
    conn_str = (
         f"DRIVER={OCR_Config.SQL_DRIVER};"
        f"SERVER={OCR_Config.SQL_SERVER};"
        f"DATABASE={OCR_Config.DB_DATABASE};"
        f"UID={OCR_Config.SQL_USERNAME};"
        f"PWD={OCR_Config.SQL_PASSWORD};"
        "TrustServerCertificate=yes;"
    )
    
    print(f"[OCR DB] Connecting to database: {OCR_Config.DB_DATABASE} on server: {OCR_Config.SQL_SERVER}")

    return pyodbc.connect(conn_str)

def get_connection_TF():
    conn_str = (
        f"DRIVER={TF_Config.SQL_DRIVER};"
        f"SERVER={TF_Config.SQL_SERVER};"
        f"DATABASE={TF_Config.SQL_DATABASE};"
        f"UID={TF_Config.SQL_USERNAME};"
        f"PWD={TF_Config.SQL_PASSWORD};"
        "TrustServerCertificate=yes;"
        "Connection Timeout=30;" 
    )
    return pyodbc.connect(conn_str)

       