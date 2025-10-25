"""Simple diagnostics script for validating the development environment."""
from __future__ import annotations

import platform
import sys
from pathlib import Path


def main() -> None:
    python_info = sys.version.replace("\n", " ")
    project_root = Path(__file__).resolve().parents[1]

    print("League of Legends – Development Environment Check")
    print("=" * 60)
    print(f"Python executable: {sys.executable}")
    print(f"Python version:    {python_info}")
    print(f"Platform:          {platform.platform()}")
    print(f"Project root:      {project_root}")
    print()
    print("Installed packages (pip list --format=freeze):")
    try:
        import pkg_resources  # type: ignore

        for dist in sorted(pkg_resources.working_set, key=lambda d: d.project_name.lower()):
            print(f"- {dist.project_name}=={dist.version}")
    except Exception as exc:  # pragma: no cover - best-effort diagnostic
        print(f"Unable to list packages: {exc}")


if __name__ == "__main__":
    main()
