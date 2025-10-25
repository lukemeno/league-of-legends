"""Platzhaltertests für den Projektstart."""

from src.app.main import create_app


def test_create_app_returns_placeholder_config() -> None:
    """Stellt sicher, dass die App-Fabrik vorerst statische Werte liefert."""

    app_config = create_app()

    assert app_config["project_name"] == "League of Legends Data Platform"
    assert app_config["message"] == "FastAPI-Initialisierung ausstehend"
