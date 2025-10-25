from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
CLIENT_DIR = BASE_DIR / "src" / "client"


def test_client_structure_exists():
    assert CLIENT_DIR.exists(), "Client directory is missing"
    assert (CLIENT_DIR / "index.html").exists(), "index.html fehlt"
    assert (CLIENT_DIR / "scripts" / "game.js").exists(), "game.js fehlt"
    assert (CLIENT_DIR / "styles" / "main.css").exists(), "main.css fehlt"


def test_files_are_not_empty():
    for file_path in [
        CLIENT_DIR / "index.html",
        CLIENT_DIR / "scripts" / "game.js",
        CLIENT_DIR / "styles" / "main.css",
    ]:
        assert file_path.stat().st_size > 50, f"{file_path.name} sollte Inhalt besitzen"
