
import pandas as pd
import pyodbc
from dotenv import load_dotenv
import os

# -------------------------------
# 1️⃣ Load environment variables
# -------------------------------
load_dotenv(r"E:\ofiice related\Framework\clone_framework\Framework_metronics_main\Python\sanction_1\.env")

DB_SERVER = os.getenv("DB_SERVER")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_TIMEOUT = int(os.getenv("DB_TIMEOUT", 30))
DB_CHARSET = os.getenv("DB_CHARSET", "UTF-8")

# -------------------------------
# 2️⃣ CSV file path
# -------------------------------
csv_file = r"E:\ofiice related\Framework\clone_framework\Framework_metronics_main\Python\sanction_1\tf_sanctions.csv"

# -------------------------------
# 3️⃣ Read CSV safely
# -------------------------------
try:
    df = pd.read_csv(csv_file, encoding='cp1252')  # Windows CSV encoding
except UnicodeDecodeError:
    df = pd.read_csv(csv_file, encoding='latin1')

print(f"CSV loaded successfully: {len(df)} rows")

# -------------------------------
# 4️⃣ Check required columns
# -------------------------------
required_columns = ['name', 'uniqid', 'country', 'source']
missing_columns = [col for col in required_columns if col not in df.columns]
if missing_columns:
    raise Exception(f"CSV is missing required columns: {missing_columns}")

# -------------------------------
# 5️⃣ Convert all values to strings and replace NaN with None
# -------------------------------
df[required_columns] = df[required_columns].astype(object).where(pd.notnull(df[required_columns]), None)

# -------------------------------
# 6️⃣ Choose available ODBC driver
# -------------------------------
available_drivers = pyodbc.drivers()
if 'ODBC Driver 18 for SQL Server' in available_drivers:
    driver = 'ODBC Driver 18 for SQL Server'
elif 'ODBC Driver 17 for SQL Server' in available_drivers:
    driver = 'ODBC Driver 17 for SQL Server'
else:
    raise Exception("No suitable ODBC Driver found. Install ODBC Driver 17 or 18.")

# -------------------------------
# 7️⃣ Connect to SQL Server
# -------------------------------
conn_str = f"""
DRIVER={{{driver}}};
SERVER={DB_SERVER};
DATABASE={DB_NAME};
UID={DB_USER};
PWD={DB_PASSWORD};
TrustServerCertificate=yes;
"""
conn = pyodbc.connect(conn_str, timeout=DB_TIMEOUT)
cursor = conn.cursor()
cursor.fast_executemany = True  # Faster bulk insert

# -------------------------------
# 8️⃣ Prepare and insert data
# -------------------------------
insert_query = """
INSERT INTO dbo.tf_sanctions (name, uniqid, country, source)
VALUES (?, ?, ?, ?)
"""
data_to_insert = df[required_columns].values.tolist()
cursor.executemany(insert_query, data_to_insert)

# -------------------------------
# 9️⃣ Commit and close
# -------------------------------
conn.commit()
cursor.close()
conn.close()

print("CSV data inserted successfully into dbo.tf_sanctions!")
