import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQL_SERVER = os.getenv("SQL_SERVER")
    SQL_DATABASE = os.getenv("SQL_DATABASE")
    SQL_USERNAME = os.getenv("SQL_USERNAME")
    SQL_PASSWORD = os.getenv("SQL_PASSWORD")
    SQL_DRIVER = os.getenv("SQL_DRIVER")
  
class OCR_Config:
    SQL_SERVER = os.getenv("SQL_SERVER")
    # SQL_DATABASE = os.getenv("SQL_DATABASE")
    SQL_USERNAME = os.getenv("SQL_USERNAME")
    SQL_PASSWORD = os.getenv("SQL_PASSWORD")
    SQL_DRIVER = os.getenv("SQL_DRIVER")
    DB_DATABASE = os.getenv("DB_DATABASE")
class TF_Config:
    SQL_SERVER = os.getenv("SQL_SERVER")
    SQL_DATABASE = os.getenv("SQL_DATABASE1")
    SQL_USERNAME = os.getenv("SQL_USERNAME")
    SQL_PASSWORD = os.getenv("SQL_PASSWORD")
    SQL_DRIVER = os.getenv("SQL_DRIVER")