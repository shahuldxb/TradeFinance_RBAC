# MTConvertor/prompt_loader.py
import os
from collections import defaultdict

# Go up ONE level: MTConvertor → Python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Correct folder name (CASE MATTERS)
PROMPT_DIR = os.path.join(BASE_DIR, "Prompts")


def load_prompt(relative_path: str, **kwargs) -> str:
    file_path = os.path.join(PROMPT_DIR, relative_path)

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Prompt file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        template = f.read()

    #  Escape ALL braces
    template = template.replace("{", "{{").replace("}", "}}")

    #  Re-enable ONLY named placeholders
    for k in kwargs.keys():
        template = template.replace("{{" + k + "}}", "{" + k + "}")

    return template.format_map(defaultdict(str, **kwargs))
