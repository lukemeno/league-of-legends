# League of Legends Data Platform

## Projektbeschreibung
Dieses Projekt soll eine datengetriebene Plattform rund um League of Legends bereitstellen. Der Fokus liegt auf der Sammlung, Aufbereitung und Bereitstellung von Spiel-, Champion- und Match-Statistiken über eine moderne Web-API. Ziel ist es, Analyst:innen, Entwickler:innen und Enthusiast:innen schnelle Einblicke in relevante Kennzahlen zu ermöglichen und aufbereitete Daten für eigene Anwendungen bereitzustellen.

## Anforderungen
### Funktionale Anforderungen
- **Match-Daten erfassen:** Historische Matches aus der Riot Games API abrufen und in einer eigenen Datenbank speichern.
- **Champion- und Item-Metadaten synchronisieren:** Regelmäßige Aktualisierung von Champions, Items, Runen und Patches.
- **Statistische Aggregationen bereitstellen:** Kennzahlen wie Winrates, Pick-/Ban-Raten und durchschnittliche Spielzeiten berechnen.
- **REST-API für Analysen:** Endpunkte zur Verfügung stellen, über die Clients gefilterte Statistiken abrufen können.
- **Authentifizierung und Ratenbegrenzung:** Zugriff über API-Schlüssel steuern und Missbrauch durch Rate Limiting verhindern.

### Nicht-funktionale Anforderungen
- **Skalierbarkeit:** Verarbeitung steigender Datenmengen und gleichzeitiger Anfragen.
- **Performance:** Antwortzeiten unter 500 ms für typische Analyse-Abfragen.
- **Zuverlässigkeit:** Monitoring, strukturierte Logs und automatisierte Tests.
- **Wartbarkeit:** Saubere Modulstruktur, umfangreiche Dokumentation und CI/CD-Pipeline.

## Projektumfang (Scope)
Das Initialrelease umfasst den Aufbau der Daten-Pipeline, die Bereitstellung einer öffentlichen REST-API sowie eine einfache Weboberfläche für Basis-Auswertungen. Visualisierungen, Machine-Learning-Prognosen oder umfangreiche User-Management-Funktionen sind explizit **nicht** Teil des ersten Meilensteins und werden in späteren Iterationen adressiert.

## Technologie-Stack
- **Programmiersprache:** Python 3.11
- **Web-Framework:** FastAPI für performante REST-Endpunkte und automatische OpenAPI-Dokumentation.
- **Datenbank:** PostgreSQL (Produktiv) sowie SQLite für lokale Entwicklung und Tests.
- **ETL & Hintergrundprozesse:** Celery mit Redis als Message Broker für periodische Synchronisationsjobs.
- **Testing:** Pytest für Unit- und Integrationstests.
- **CI/CD:** GitHub Actions für Tests, Linting und Deployments.
- **Containerisierung:** Docker & Docker Compose für reproduzierbare Umgebungen.

## Basis-Verzeichnisstruktur
```text
├── README.md
├── docs/
│   └── README.md
├── src/
│   └── app/
│       ├── __init__.py
│       └── main.py
└── tests/
    ├── __init__.py
    └── test_placeholder.py
```

## Nächste Schritte
1. Projektabhängigkeiten in einer `pyproject.toml` definieren und virtuelle Umgebung einrichten.
2. Datenbank-Schema modellieren und Migrations-Setup mit Alembic erstellen.
3. Erste FastAPI-Endpunkte (z. B. `/health`, `/matches`) prototypisch implementieren.
4. Automatisierte Tests für Datenimporte und API-Endpunkte hinzufügen.
5. Deployment-Strategie (z. B. Docker Compose oder Kubernetes) ausarbeiten.

## Lizenz
TBD
