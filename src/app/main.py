"""Einstiegspunkt für die spätere FastAPI-Anwendung."""

from dataclasses import dataclass
from typing import Any, Mapping


@dataclass
class AppConfig:
    """Konfigurationswerte für die Anwendung."""

    project_name: str = "League of Legends Data Platform"
    version: str = "0.1.0"


def create_app() -> Mapping[str, Any]:
    """Erstelle und konfiguriere die FastAPI-Anwendung.

    Diese Funktion dient aktuell als Platzhalter. In einer späteren Iteration
    wird hier eine `FastAPI`-Instanz erstellt, Router registriert und Middleware
    eingebunden.
    """

    return {
        "project_name": AppConfig().project_name,
        "version": AppConfig().version,
        "message": "FastAPI-Initialisierung ausstehend",
    }
