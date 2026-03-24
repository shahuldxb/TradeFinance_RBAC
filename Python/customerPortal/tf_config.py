import os
from dotenv import load_dotenv

load_dotenv()

class TF_Config:
    SQL_SERVER = os.getenv("SQL_SERVER")
    SQL_DATABASE = os.getenv("SQL_DATABASE1")  # tf_back
    SQL_USERNAME = os.getenv("SQL_USERNAME")
    SQL_PASSWORD = os.getenv("SQL_PASSWORD")
    SQL_DRIVER = os.getenv("SQL_DRIVER")  # ODBC Driver 17 for SQL Server
