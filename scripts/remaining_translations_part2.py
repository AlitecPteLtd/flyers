import json
from pathlib import Path

with (Path(__file__).parent / "part2_projects.json").open(encoding="utf-8") as fh:
    REMAINING = json.load(fh)
