"""
Database connectivity module for SQL Server
"""
import pyodbc
import os
from datetime import datetime
from Goods_Matcher.logger import AuditLogger

class DatabaseManager:
    """Manage SQL Server database connections and operations"""
    
    def __init__(self, logger: AuditLogger):
        self.logger = logger
        self.server = os.getenv("DB_SERVER")
        self.database = os.getenv("DB_NAME")
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.timeout = int(os.getenv("DB_TIMEOUT", 30))
        self.connection = None
        
    def test_connection(self):
        """Test database connectivity"""
        try:
            conn_str = (
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={self.server};"
                f"DATABASE={self.database};"
                f"UID={self.username};"
                f"PWD={self.password};"
                f"Timeout={self.timeout};"
            )
            conn = pyodbc.connect(conn_str, timeout=self.timeout)
            conn.close()
            self.logger.log_connectivity_test("SQL Server", "SUCCESS", f"Connected to {self.database}")
            return True, f"Connected to {self.database} on {self.server}"
        except Exception as e:
            self.logger.log_connectivity_test("SQL Server", "FAILED", str(e))
            return False, f"Connection failed: {str(e)}"
    
    def connect(self):
        """Establish database connection"""
        try:
            conn_str = (
                f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                f"SERVER={self.server};"
                f"DATABASE={self.database};"
                f"UID={self.username};"
                f"PWD={self.password};"
                f"Timeout={self.timeout};"
            )
            self.connection = pyodbc.connect(conn_str, timeout=self.timeout)
            return True
        except Exception as e:
            self.logger.log_error("Database Connection", str(e))
            return False
    
    def disconnect(self):
        """Close database connection"""
        if self.connection:
            self.connection.close()
            self.connection = None
    
    def get_export_control_items(self):
        """Retrieve all items from ExportControlItems using stored procedure"""
        try:
            if not self.connection:
                self.connect()

            query = "{CALL GetExportControlItems}"

            cursor = self.connection.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            columns = [column[0] for column in cursor.description]
            results = [dict(zip(columns, row)) for row in rows]

            self.logger.log_sql(
                "GetExportControlItems",
                result_count=len(results)
            )
            return results

        except Exception as e:
            self.logger.log_error("Query Execution", str(e), "GetExportControlItems")
            return []
  
    def save_activity(self, run_id, input_description, matches, techniques_used):
        """Save matching activity to tf_sanctions_activity using stored procedure"""
        try:
            if not self.connection:
                self.connect()

            query = "{CALL SaveSanctionsActivity(?, ?, ?, ?, ?, ?)}"

            match_results = str(matches)[:4000]
            techniques = ", ".join(techniques_used)
            screening_status = "COMPLETED"

            cursor = self.connection.cursor()
            cursor.execute(
                query,
                (
                    run_id,
                    input_description,
                    match_results,
                    len(matches),
                    techniques,
                    screening_status
                )
            )
            self.connection.commit()

            self.logger.log_sql(
                "SaveSanctionsActivity",
                params=f"id={run_id}",
                result_count=1
            )
            return True

        except Exception as e:
            self.logger.log_error("Save Activity", str(e))
            return False

    def get_activity_by_run_id(self, run_id):
        """Retrieve activity by ID from tf_sanctions_activity"""
        try:
            if not self.connection:
                self.connect()

            query = "{CALL GetActivityByRunId(?)}"

            cursor = self.connection.cursor()
            cursor.execute(query, (run_id,))
            row = cursor.fetchone()

            if row:
                columns = [column[0] for column in cursor.description]
                result = dict(zip(columns, row))

                self.logger.log_sql(
                    "GetActivityByRunId",
                    params=f"id={run_id}",
                    result_count=1
                )
                return result

            self.logger.log_sql(
                "GetActivityByRunId",
                params=f"id={run_id}",
                result_count=0
            )
            return None

        except Exception as e:
            self.logger.log_error("Retrieve Activity By ID", str(e))
            return None


    def add_test_entry(self, name, address=None):
        try:
            if not self.connection:
                self.connect()

            # Create table if it doesn't exist - only Name column
            query = "{CALL AddTestEntry(?)}"

            cursor = self.connection.cursor()
            # cursor.execute(create_table_query)
            # self.connection.commit()

            # Insert test entry (no Address)
            # insert_query = "INSERT INTO tf_sanctions (Name) VALUES (?)"
            cursor.execute(query, (name,))
            self.connection.commit()

            self.logger.log_sql("AddTestEntry", params=f"Name={name}", result_count=1)
            self.logger.log_activity("Test Entry Added", f"Name: {name}")
            return True, "Test entry added successfully"
        except Exception as e:
            self.logger.log_error("Add Test Entry", str(e))
            return False, f"Failed to add test entry: {str(e)}"

