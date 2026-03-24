# cross_new_csv.py
import os
import re
import csv
import glob
from io import StringIO
from datetime import datetime
from pathlib import Path
from openai import AzureOpenAI
from dotenv import load_dotenv
# Load environment variables
load_dotenv()


def first_n_words(text: str, n: int = 3) -> str:
    text = (text or "").strip()
    words = re.findall(r"\w+", text, flags=re.UNICODE)
    return " ".join(words[:n]) if words else "document"


def sanitize_filename(name: str, max_len: int = 80) -> str:
    if not name:
        return ""
    name = name.strip()
    name = (
        name.replace("—", "-")
        .replace("–", "-")
        .replace("/", "-")
        .replace("\\", "-")
    )
    name = re.sub(r'[<>:"/\\|?*\x00-\x1F]', "", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name[:max_len] if len(name) > max_len else name


class TradeFinanceComplianceAnalyzer:
    def __init__(
        self,
        system_prompt: str | None = None,
        
    ):
        # Azure OpenAI configuration
        self.client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        )

        # Get deployment name from env or use default
        self.chat_deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o")

        # Configure folders (Windows-compatible)
        self.input_folder = os.path.join(".", "input")
        self.output_folder = os.path.join(".", "output")

        # LC detection patterns 
        self.lc_patterns = [
            "lc.txt", "ilc.txt", "elc.txt", "ibc.txt", "ebc.txt", "rlc.txt"
        ]
        self.lc_keywords = [
            "letter of credit", "documentary credit", "credit application",
            "irrevocable credit", "export credit", "import credit"
        ]

        # System prompt for compliance analysis
        self.system_prompt = system_prompt
        # Doc types mapping
        self.doc_types = {}

    # --------------------------
    # Files & folders
    # --------------------------
    def create_folders(self):
        """Create input and output folders if they don't exist"""
        try:
            Path(self.input_folder).mkdir(exist_ok=True)
            Path(self.output_folder).mkdir(exist_ok=True)
            print(f"[OK] Folders ready: {self.input_folder} and {self.output_folder}")
        except Exception as e:
            print(f"[ERROR] Error creating folders: {e}")
            return False
        return True

    def find_txt_files(self):
        """Find all .txt files in the input folder"""
        pattern = os.path.join(self.input_folder, "*.txt")
        files = glob.glob(pattern)
        if not files:
            print(f"[ERROR] No .txt files found in {self.input_folder}")
            return []

        print(f"[OK] Found {len(files)} .txt files:")
        for file in files:
            print(f"  - {os.path.basename(file)}")
        return files

    # --------------------------
    # LC identification
    # --------------------------
    def identify_lc_document(self, files):
        """Identify the Letter of Credit document from the file list"""
        lc_file = None

        # Method 1: Exact filename matches
        for file in files:
            filename = os.path.basename(file).lower()
            if filename in self.lc_patterns:
                lc_file = file
                print(f"[OK] LC document identified by filename: {os.path.basename(file)}")
                break

        # Method 2: Partial filename matches
        if not lc_file:
            for file in files:
                filename = os.path.basename(file).lower()
                if any(pattern.replace('.txt', '') in filename for pattern in self.lc_patterns):
                    lc_file = file
                    print(f"[OK] LC document identified by partial filename match: {os.path.basename(file)}")
                    break

        # Method 3: Content analysis
        if not lc_file:
            for file in files:
                try:
                    with open(file, 'r', encoding='utf-8') as f:
                        content = f.read().lower()
                        if any(keyword in content for keyword in self.lc_keywords):
                            lc_file = file
                            print(f"[OK] LC document identified by content analysis: {os.path.basename(file)}")
                            break
                except Exception as e:
                    print(f"[WARN] Could not read {file} for content analysis: {e}")

        if not lc_file:
            print("[ERROR] No Letter of Credit document found!")
            print("Expected patterns:", self.lc_patterns)
            print("Expected keywords:", self.lc_keywords)
            return None, []

        # Get secondary documents (all files except LC)
        secondary_files = [f for f in files if f != lc_file]
        print(f"[OK] Secondary documents: {len(secondary_files)} files")

        return lc_file, secondary_files

    # --------------------------
    # Reading & prompt build
    # --------------------------
    def read_document(self, file_path):
        """Read document content from file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if not content:
                    print(f"[WARN] Warning: {os.path.basename(file_path)} is empty")
                return content
        except Exception as e:
            print(f"[ERROR] Error reading {file_path}: {e}")
            return None

    def build_user_prompt(self, lc_file, secondary_files):
        """Build STRICT user prompt – analyze ONLY provided documents"""

        lc_content = self.read_document(lc_file)
        if not lc_content:
            return None

        lc_name = os.path.basename(lc_file)

        prompt_parts = [
            "You are a trade finance compliance analyzer.",
            "",
            "IMPORTANT RULES (STRICT):",
            "- Analyze ONLY the secondary documents explicitly provided below.",
            "- DO NOT assume or infer any document that is not listed.",
            "- If a document type is required by the LC but NOT provided, IGNORE it completely.",
            "- DO NOT generate discrepancies for missing documents.",
            "",
            f"### Letter of Credit (LC) – GOLDEN TRUTH DOCUMENT: {lc_name}",
            lc_content,
            ""
        ]

        self.doc_types = {}

        for idx, sec_file in enumerate(secondary_files, 1):
            sec_content = self.read_document(sec_file)
            if not sec_content:
                continue

            sec_name = os.path.basename(sec_file)
            doc_type = self.determine_document_type(sec_name)

            self.doc_types.setdefault(doc_type, []).append(sec_name)

            prompt_parts.append(
                f"### Secondary Document {idx}: {doc_type} — {sec_name}"
            )
            prompt_parts.append(sec_content)
            prompt_parts.append("")

        prompt_parts.append(
            "ONLY compare the LC with the above listed secondary documents."
        )

        return "\n".join(prompt_parts)

    def determine_document_type(self, filename):
        """Determine document type from filename"""
        filename_lower = filename.lower()
        if any(x in filename_lower for x in ['ocean bill of lading', 'bill of lading', 'b/l', 'bol', 'bill', 'lading', 'ocean']):
            return "Bill of Lading (BOL)"
        elif any(x in filename_lower for x in ['insurance', 'ins', 'policy', 'cargo']):
            return "Insurance Certificate (INS)"
        elif any(x in filename_lower for x in ['invoice', 'inv']):
            return "Commercial Invoice (INV)"
        elif any(x in filename_lower for x in ['packing', 'pack', 'list']):
            return "Packing List (PL)"
        elif any(x in filename_lower for x in ['quality', 'inspection']):
            return "Quality Certificate (QC)"
        elif any(x in filename_lower for x in ['certificate of origin', 'coo', 'origin certificate']):
            return "Certificate of Origin (COO)"
        else:
            return f"Trade Document ({filename})"

    # --------------------------
    # LLM call for table (returns tokens)
    # --------------------------
    def analyze_compliance(self, user_prompt):
        """Send documents to Azure OpenAI for compliance analysis and return both text & tokens"""
        try:
            print("[PROCESSING] Sending documents to Azure OpenAI for table analysis...")

            response = self.client.chat.completions.create(
                model=self.chat_deployment,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0
            )

            result_text = response.choices[0].message.content

            # Extract token usage (Azure returns usage)
            tokens = {
                "prompt_tokens": getattr(response.usage, "prompt_tokens", 0),
                "completion_tokens": getattr(response.usage, "completion_tokens", 0),
                "total_tokens": getattr(response.usage, "total_tokens", 0),
            }

            print("[OK] Table analysis completed successfully")
            return {
                "text": result_text,
                "tokens": tokens
            }

        except Exception as e:
            print(f"[ERROR] Error during Azure OpenAI analysis: {e}")
            return None

    # --------------------------
    # LLM call for each detail
    # --------------------------
#     def generate_detailed_discrepancy(self, serial_id, base_doc, target_doc, fields, base_val, target_val, issue, lc_filename, severity_level):
#         """Generate detailed description for a single discrepancy"""
#         try:
#             user_prompt = f"""
# ou are a Trade Finance Compliance Assistant.



# """
#             response = self.client.chat.completions.create(
#                 model=self.chat_deployment,
#                 messages=[
#                     {"role": "user", "content": user_prompt},
#                 ],
#                 temperature=0
#             )

#             result = response.choices[0].message.content
#             return result

#         except Exception as e:
#             print(f"[ERROR] Error generating detailed discrepancy: {e}")
#             return f"#### Serial ID: {serial_id}\nError generating details."


    def _parse_single_markdown_table(self, block_lines):
        """
        Parse a single markdown table block (list of lines). Returns dict with headers and rows.
        """
        # Remove empty lines
        block = [ln for ln in block_lines if ln.strip()]
        if len(block) < 2:
            return None

        # Header is first line; separator is the first line with --- after header
        header_line = block[0]
        sep_index = None
        for idx in range(1, len(block)):
            if re.match(r'^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$', block[idx]):
                sep_index = idx
                break
        if sep_index is None:
            return None

        headers = self._split_md_row(header_line)
        # Data rows are everything after separator
        data_lines = block[sep_index + 1:]

        rows = []
        for ln in data_lines:
            # ignore accidental second separator or malformed short rows
            if re.match(r'^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$', ln):
                continue
            vals = self._split_md_row(ln)
            if len(vals) == 0:
                continue
            # Normalize row length to headers (pad with empty if fewer)
            if len(vals) < len(headers):
                vals += [""] * (len(headers) - len(vals))
            elif len(vals) > len(headers):
                vals = vals[:len(headers)]
            rows.append(vals)

        # Clean header names
        headers = [h.strip() for h in headers]
        return {"headers": headers, "rows": rows}

    def _split_md_row(self, line):
        """
        Split a markdown table line into cells. Handles leading/trailing pipes and trims spaces.
        Does not support escaped pipes inside cells (rare in our outputs).
        """
        # Remove leading/trailing pipes
        s = line.strip()
        if s.startswith('|'):
            s = s[1:]
        if s.endswith('|'):
            s = s[:-1]
        # Split by pipe and strip spaces
        return [c.strip() for c in s.split('|')]

    def save_tables_to_csv(self, tables, csv_path):
        """
        Save the first table to CSV for the user's requirement. If multiple tables are found,
        concatenate them one after another separated by a blank row.
        """
        if not tables:
            print("[WARN] No Markdown tables detected to export as CSV.")
            return False

        wrote_any = False
        with open(csv_path, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)

            for t_index, tbl in enumerate(tables, start=1):
                headers = tbl["headers"]
                rows = tbl["rows"]
                if not headers:
                    continue

                # Write a section header when multiple tables are present
                if t_index > 1:
                    writer.writerow([])
                writer.writerow(headers)
                for r in rows:
                    writer.writerow(r)
                wrote_any = True

        if wrote_any:
            print(f"[OK] CSV exported: {csv_path}")
        else:
            print("[WARN] Tables found but empty; no CSV rows written.")
        return wrote_any

    # --------------------------
    # Markdown table → CSV helpers
    # --------------------------
    def extract_markdown_tables(self, text):
        """
        Find all GitHub-flavored Markdown tables in text and return a list of dicts:
        [{'headers': [...], 'rows': [[...], ...]}, ...]
        A table is detected as a contiguous block of lines starting with '|' and
        containing a separator line like |---|---|.
        """
        tables = []
        # Capture contiguous blocks of lines starting with '|'
        lines = (text or "").splitlines()
        i = 0
        while i < len(lines):
            if lines[i].lstrip().startswith('|'):
                block = [lines[i]]
                i += 1
                while i < len(lines) and lines[i].lstrip().startswith('|'):
                    block.append(lines[i])
                    i += 1
                # Validate separator line exists
                if any(re.match(r'^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$', ln) for ln in block):
                    table_obj = self._parse_single_markdown_table(block)
                    if table_obj:
                        tables.append(table_obj)
            else:
                i += 1
        return tables

    def strip_code_fences(self,text: str) -> str:
        """
        Remove markdown code fences so tables render correctly in UI.
        """
        if not text:
            return ""
        return (
            text
            .replace("```markdown", "")
            .replace("```md", "")
            .replace("```", "")
            .strip()
        )

    def save_results(self, analysis_result, lc_file, secondary_files):
        """Save analysis results to output folder and export the Markdown table(s) to CSV"""
        try:
            # Generate timestamp for unique filenames
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

            # Create result filenames
            lc_name = os.path.splitext(os.path.basename(lc_file))[0]
            result_md_filename = f"compliance_analysis_{lc_name}_{timestamp}.md"
            result_md_path = os.path.join(self.output_folder, result_md_filename)

            result_csv_filename = f"compliance_analysis_{lc_name}_{timestamp}.csv"
            result_csv_path = os.path.join(self.output_folder, result_csv_filename)

            # Prepare header (for MD file)
            report_header = f"""#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**Base Document (Golden Truth):** {os.path.basename(lc_file)}
**Secondary Documents Analyzed:** {len(secondary_files)} files

## Documents Processed:
- **Golden Truth:** {os.path.basename(lc_file)}
"""
            for i, sec_file in enumerate(secondary_files, 1):
                report_header += f"- **Secondary {i}:** {os.path.basename(sec_file)}\n"

            report_header += f"\n---\n\n## Compliance Analysis Results:\n\n"

            # Table section
            # table_section = "### Markdown Table of Discrepancies\n\n" + (analysis_result or "")
            clean_analysis = "\n".join(
                            line.lstrip() for line in self.strip_code_fences(analysis_result or "").splitlines()
                        )


            table_section = (
                "### Markdown Table of Discrepancies\n\n"
                + clean_analysis
                + "\n\n"
            )

            tables = self.extract_markdown_tables(clean_analysis)

            # Extract tables for CSV and rows for details
            # tables = self.extract_markdown_tables(analysis_result or "")
            rows = []
            if tables:
                rows = tables[0]["rows"]
            self.save_tables_to_csv(tables, result_csv_path)

            # # # Generate detailed sections
            # lc_filename = os.path.basename(lc_file)
            # detailed_sections = []
            # for i, row in enumerate(rows, 1):
            #     (
            #         base_doc,
            #         target_doc,
            #         fields,
            #         base_val,
            #         target_val,
            #         issue,
            #         severity_level
            #     ) = (row + ["Medium"])[:7]

            #     detail = self.generate_detailed_discrepancy(
            #         i,
            #         base_doc,
            #         target_doc,
            #         fields,
            #         base_val,
            #         target_val,
            #         issue,
            #         lc_filename,
            #         severity_level
            #     )
            #     detailed_sections.append(detail)
            # # Post-process detailed sections for unique IDs
            # type_counts = {}
            # processed_details = []
            # for detail in detailed_sections:
            #     id_match = re.search(r'Discrepancy ID: (\w+)-XXX', detail)
            #     code = 'DISC'
            #     if id_match:
            #         code = id_match.group(1)
            #     type_counts.setdefault(code, 0)
            #     type_counts[code] += 1
            #     new_id = f"{code}-{type_counts[code]:03d}"
            #     detail = re.sub(r'Discrepancy ID: \w+-XXX', f"Discrepancy ID: {new_id}", detail)
            #     processed_details.append(detail)

            # Build detailed analysis section
#             golden_truth = f"Irrevocable Letter of Credit (LC) - {os.path.basename(lc_file)}"
#             secondary_list = "\n".join([f"{i}. {self.determine_document_type(os.path.basename(sec_file))} - {os.path.basename(sec_file)}" for i, sec_file in enumerate(secondary_files, 1)])
#             detailed_analysis = f"""
# ### Detailed Analysis

# **GOLDEN TRUTH DOCUMENT:** {golden_truth}  
# **SECONDARY DOCUMENTS FOUND:**  
# {secondary_list}  

# **TOTAL DISCREPANCIES FOUND:** {len(rows)}  

# ---

# {"\n---\n".join(processed_details)}
# """

            # Combine all
            full_report = report_header + "\n\n" + clean_analysis
            # Ensure output folder exists
            Path(self.output_folder).mkdir(parents=True, exist_ok=True)

            # Save Markdown report
            with open(result_md_path, 'w', encoding='utf-8') as f:
                f.write(full_report)
            print(f"[OK] Results saved to: {result_md_path}")

            return result_md_path

        except Exception as e:
            import traceback
            traceback.print_exc()
            raise

    # --------------------------
    # Orchestration
    # --------------------------
    def run_analysis(self):
        """Main method to run the complete compliance analysis"""
        print("[*] Starting Trade Finance Compliance Analysis")
        print("=" * 50)

        # Step 1: Create folders
        if not self.create_folders():
            return False
        

        # Step 2: Find all .txt files
        files = self.find_txt_files()
        if not files:
            print("\n📝 Please add .txt files to the input folder and run again.")
            return False

        # Step 3: Identify LC document and secondary documents
        lc_file, secondary_files = self.identify_lc_document(files)
        if not lc_file:
            return False

        if not secondary_files:
            print("[WARN] No secondary documents found to compare against LC.")
            return False

        # Step 4: Build user prompt
        print("\n[PROCESSING] Building analysis prompt...")
        user_prompt = self.build_user_prompt(lc_file, secondary_files)
        if not user_prompt:
            print("[ERROR] Failed to build analysis prompt")
            return False

        # Step 5: Perform compliance analysis for table
        analysis_data = self.analyze_compliance(user_prompt)
        if not analysis_data:
            return False

        analysis_result = analysis_data["text"]
        analysis_tokens = analysis_data["tokens"]


        # Step 6: Save results (MD + CSV), which includes generating details in loop
        result_path = self.save_results(analysis_result, lc_file, secondary_files)
        if not result_path:
            return False

        print("\n" + "=" * 50)
        print("[SUCCESS] Compliance Analysis Completed Successfully!")
        print(f"[REPORT] Report saved to: {result_path}")
        print(f"[CSV] CSV exported alongside the report in the output folder.")
        print(f"[STATS] Base Document: {os.path.basename(lc_file)}")
        print(f"[FILES] Secondary Documents: {len(secondary_files)} files analyzed")

        return True
        # return user_prompt



def main():
    """Main function to run the compliance analyzer"""
    analyzer = TradeFinanceComplianceAnalyzer()

    try:
        success = analyzer.run_analysis()
        if not success:
            print("\n[ERROR] Analysis failed. Please check the errors above and try again.")
            return 1
        return 0

    except KeyboardInterrupt:
        print("\n\n[STOP] Analysis interrupted by user")
        return 1
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
        return 1


if __name__ == "__main__":
    exit(main())