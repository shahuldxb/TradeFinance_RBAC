import re
from typing import Dict, List, Any,Optional
import pandas as pd

OPTION_GROUPS = {
    "41a": {"41A", "41D"},
    "42a": {"42A", "42D"},
    "52a": {"52A", "52D"},
    "53a": {"53A", "53D"},
    "57a": {"57A", "57D"},
    "58a": {"58A", "58D"},
}

RULE_IF_PRESENT_NOT_PRESENT_LIST = re.compile(
    r"If field (?P<a>[0-9A-Z]{2,3}[A-Z]?) is present,\s*fields?\s*(?P<bs>.+?)\s*must not be present",
    re.IGNORECASE
)
RULE_IF_PRESENT_MUST_PRESENT = re.compile(
    r"If field (?P<a>[0-9A-Z]{2,3}[A-Z]?) is present,\s*field\s*(?P<b>[0-9A-Z]{2,3}[A-Z]?)\s*must be present",
    re.IGNORECASE
)
TAG_LINE = re.compile(r"^:(?P<tag>[0-9A-Z]{2,3}[A-Z]?):(?P<value>.*)$")


def normalize_mt_type(mt_message_type: str) -> str:

    s = (mt_message_type or "").strip().upper()
    if s.startswith("MT"):
        s = s[2:]
    if len(s) == 3 and s.isdigit():
        return s
    m = re.search(r"\{2:[IO](\d{3})", mt_message_type)
    return m.group(1) if m else ""

def detect_mt_type_from_text(mt_text: str) -> str:
    m = re.search(r"\{2:[IO](\d{3})", mt_text)
    return m.group(1) if m else ""

def detect_mt_type_from_block2(mt_text: str) -> Optional[str]:
    """
    Extract MT type from SWIFT Block 2 header.
    {2:I700....} -> "700"
    {2:O707....} -> "707"
    """
    if not mt_text:
        return None
    m = re.search(r"\{2:[IO](\d{3})", mt_text)
    return m.group(1) if m else None

def extract_tags(mt_text: str) -> Dict[str, List[str]]:
    tags: Dict[str, List[str]] = {}
    current_tag = None
    current_val_lines: List[str] = []

    lines = mt_text.replace("\r\n", "\n").split("\n")
    for line in lines:
        m = TAG_LINE.match(line.strip())
        if m:
            if current_tag is not None:
                tags.setdefault(current_tag, []).append("\n".join(current_val_lines).strip())
            current_tag = m.group("tag")
            current_val_lines = [m.group("value")]
        else:
            if current_tag is not None:
                current_val_lines.append(line)

    if current_tag is not None:
        tags.setdefault(current_tag, []).append("\n".join(current_val_lines).strip())

    return tags

def parse_mt_fields(mt_text: str) -> Dict[str, List[str]]:
    """
    Parses block 4 fields:
    :39A:...
    :50:... (multi-line supported)
    """
    fields: Dict[str, List[str]] = {}
    in4 = False
    current = None
    buf: List[str] = []

    for line in mt_text.splitlines():
        if "{4:" in line:
            in4 = True
            continue
        if not in4:
            continue
        if line.strip() == "-}":
            if current:
                fields.setdefault(current, []).append("\n".join(buf).strip())
            break

        m = re.match(r"^:([0-9]{2}[A-Z0-9]{0,2}):", line.strip(), re.IGNORECASE)
        if m:
            if current:
                fields.setdefault(current, []).append("\n".join(buf).strip())
            current = m.group(1).upper()
            # value after second colon
            after = line.split(":", 2)[2] if line.count(":") >= 2 else ""
            buf = [after]
        else:
            if current:
                buf.append(line)
    return fields

def parse_field_list(bs: str) -> List[str]:
    if not bs:
        return []
    bs = bs.strip().rstrip(".")
    bs = re.sub(r"\band\b", ",", bs, flags=re.IGNORECASE)
    parts = [p.strip() for p in bs.split(",") if p.strip()]
    out = []
    for p in parts:
        m = re.search(r"([0-9A-Z]{2,3}[A-Z]?)", p)
        if m:
            out.append(m.group(1))
    return list(dict.fromkeys(out))

def expand_token(token: str) -> List[str]:
    t = token.strip().replace(".", "").replace(",", "")
    low = t.lower()
    if low in OPTION_GROUPS:
        return list(OPTION_GROUPS[low])
    return [t.upper()]

def is_present(fields: Dict[str, List[str]], token: str) -> bool:
    for f in expand_token(token):
        if f in fields:
            return True
    return False

def get_values(fields: Dict[str, List[str]], token: str) -> List[str]:
    out = []
    for f in expand_token(token):
        out.extend(fields.get(f, []))
    return out

def split_field_list(bs: str) -> List[str]:
    """
    Convert:
      "39B" -> ["39B"]
      "42A and 42D" -> ["42A","42D"]
      "42C, 42A, 42D and 42P" -> ["42C","42A","42D","42P"]
    """
    if not bs:
        return []
    bs = bs.strip().rstrip(".")
    bs = re.sub(r"\band\b", ",", bs, flags=re.IGNORECASE)
    parts = [p.strip() for p in bs.split(",") if p.strip()]
    out: List[str] = []
    for p in parts:
        m = re.search(r"([0-9A-Z]{2,3}[A-Z]?)", p)
        if m:
            out.append(m.group(1))
    # dedupe preserve order
    return list(dict.fromkeys(out))

def basic_structure_checks(mt_text: str) -> List[Dict[str, Any]]:
    issues = []
    if "{4:" not in mt_text:
        issues.append({
            "severity": "CRITICAL", "category": "STRUCTURE", "tag": None,
            "rule_id": None, "error_code": None,
            "description": "Missing block {4: (Text Block).",
            "expected": "Message should contain {4: ... -}",
            "found": "No {4: block found",
            "suggestion": "Ensure message contains block 4 with fields and ends with -}."
        })
    if "-}" not in mt_text:
        issues.append({
            "severity": "CRITICAL", "category": "STRUCTURE", "tag": None,
            "rule_id": None, "error_code": None,
            "description": "Missing -} end delimiter.",
            "expected": "Block 4 must end with -}",
            "found": "No -} delimiter",
            "suggestion": "Add -} at the end of message text block."
        })
    return issues

def mandatory_field_issues(tags: Dict[str, List[str]], fields_df: pd.DataFrame) -> List[Dict[str, Any]]:
    issues= []
    if fields_df is None or fields_df.empty:
        return issues
    
    if "is_mandatory" not in fields_df.columns or "tag" not in fields_df.columns:
        return issues

    subset = fields_df[fields_df["is_mandatory"] == 1]
    for _, f in subset.iterrows():
        tag = str(f["tag"])
        fname = str(f.get("field_name", "") or "")
        if tag not in tags:
            issues.append({
                "severity": "CRITICAL",
                "category": "FIELD",
                "tag": tag,
                "rule_id": None,
                "error_code": None,
                "description": f"Mandatory field missing: :{tag}: ({fname})",
                "expected": f"Field :{tag}: must be present.",
                "found": "Missing",
                "suggestion": f"Add :{tag}: with correct content."
            })
    return issues

def apply_network_rules(tags: Dict[str, List[str]], rules_df: pd.DataFrame) -> List[Dict[str, Any]]:
    issues = []
    if rules_df is None or rules_df.empty:
        return issues

    for _, r in rules_df.iterrows():
        desc = str(r.get("rule_description", "") or "").strip()
        rule_id_raw = r.get("rule_id", None)
        try:
            rule_id = int(rule_id_raw) if pd.notna(rule_id_raw) else None
        except Exception:
            rule_id = None

        error_code = None 


        # 1) IF PRESENT => NOT PRESENT (supports list)
        m1 = RULE_IF_PRESENT_NOT_PRESENT_LIST.search(desc)
        if m1:
            a = m1.group("a")
            bs = parse_field_list(m1.group("bs"))
            if a in tags:
                for b in bs:
                    if b in tags:
                        issues.append({
                            "severity": "CRITICAL",
                            "category": "RULE",
                            "tag": b,
                            "rule_id": rule_id,
                            "error_code": error_code,
                            "description": f"Mutual exclusion violated: {a} present so {b} must not be present.",
                            "expected": f"When {a} is present, {', '.join(bs)} must be absent.",
                            "found": f"{a} present and {b} present.",
                            "suggestion": f"Remove {b} (or remove {a}) based on intended meaning."
                        })
            continue

        # 2) IF PRESENT => MUST PRESENT (single target)
        m2 = RULE_IF_PRESENT_MUST_PRESENT.search(desc)
        if m2:
            a, b = m2.group("a"), m2.group("b")
            if a in tags and b not in tags:
                issues.append({
                    "severity": "CRITICAL",
                    "category": "RULE",
                    "tag": b,
                    "rule_id": rule_id,
                    "error_code": error_code,
                    "description": f"Dependency violated: {a} present so {b} must be present.",
                    "expected": f"{b} must appear when {a} appears.",
                    "found": f"{a} present but {b} missing.",
                    "suggestion": f"Add field {b}, or remove {a} if not applicable."
                })
            continue

    return issues

def dedupe_discrepancies(discs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    seen = set()
    out: List[Dict[str, Any]] = []
    for d in discs or []:
        k = (
            (d.get("category") or "").upper(),
            (d.get("tag") or ""),
            d.get("rule_id"),
            (d.get("error_code") or ""),
            (d.get("expected") or ""),
            (d.get("found") or ""),
        )
        if k in seen:
            continue
        seen.add(k)
        out.append(d)
    return out

def validate_mt(mt_text: str, fields_df: pd.DataFrame, rules_df: pd.DataFrame) -> List[Dict[str, Any]]:
    tags = extract_tags(mt_text)
    disc: List[Dict[str, Any]] = []
    disc.extend(basic_structure_checks(mt_text))
    disc.extend(mandatory_field_issues(tags, fields_df))
    disc.extend(apply_network_rules(tags, rules_df))
    return dedupe_discrepancies(disc)