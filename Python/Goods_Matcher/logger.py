"""
Logger module for SQL queries, activities, and errors
"""
import os
from datetime import datetime
from pathlib import Path

class AuditLogger:
    """Unified logger for SQL queries, activities, and errors"""
    
    def __init__(self, log_dir="logs"):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        self.log_file = self.log_dir / "audit_log.txt"
        
    def _write_log(self, log_type, message, details=None):
        """Write log entry to file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        log_entry = f"[{timestamp}] [{log_type}] {message}"
        
        if details:
            log_entry += f"\n    Details: {details}"
        
        log_entry += "\n" + "-" * 80 + "\n"
        
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception as e:
            print(f"Failed to write log: {e}")
    
    def log_sql(self, query, params=None, result_count=None):
        """Log SQL query execution"""
        details = f"Query: {query}"
        if params:
            details += f"\n    Parameters: {params}"
        if result_count is not None:
            details += f"\n    Result Count: {result_count}"
        self._write_log("SQL", "Query Executed", details)
    
    def log_activity(self, activity, details=None):
        """Log general activity"""
        self._write_log("ACTIVITY", activity, details)
    
    def log_error(self, error_type, error_message, details=None):
        """Log error"""
        error_details = f"Error: {error_message}"
        if details:
            error_details += f"\n    Additional Info: {details}"
        self._write_log("ERROR", error_type, error_details)
    
    def log_connectivity_test(self, service, status, message=None):
        """Log connectivity test results"""
        details = f"Service: {service}\n    Status: {status}"
        if message:
            details += f"\n    Message: {message}"
        self._write_log("CONNECTIVITY", "Connection Test", details)
    
    def log_match_run(self, run_id, input_description, match_count):
        """Log matching run"""
        details = f"Run ID: {run_id}\n    Input: {input_description}\n    Matches Found: {match_count}"
        self._write_log("MATCH_RUN", "Matching Operation", details)
    
    def get_recent_logs(self, lines=50):
        """Get recent log entries"""
        try:
            if not self.log_file.exists():
                return "No logs available yet."
            
            with open(self.log_file, "r", encoding="utf-8") as f:
                all_lines = f.readlines()
                return "".join(all_lines[-lines:])
        except Exception as e:
            return f"Error reading logs: {e}"
            
    def get_next_run_id(self):
        """
        Generate incremental Run ID based on audit log file
        """
        try:
            if not self.log_file.exists():
                return 1

            with open(self.log_file, "r", encoding="utf-8") as f:
                lines = f.readlines()

            run_ids = []
            for line in lines:
                if "[MATCH_RUN]" in line and "Run ID:" in line:
                    try:
                        run_id = int(line.split("Run ID:")[1].strip())
                        run_ids.append(run_id)
                    except:
                        continue

            return max(run_ids) + 1 if run_ids else 1

        except Exception as e:
            print(f"[LOGGER] Failed to generate run_id: {e}")
            return int(datetime.now().timestamp())

