# LoL Dodge Trainer

Ein browserbasiertes Trainingsspiel, das die Reaktions- und Ausweichfähigkeiten aus beliebten Dodge-Games der League-of-Legends-Community nachbildet. Das Projekt orientiert sich am Funktionsumfang von [loldodgegame.com](https://loldodgegame.com/) und legt eine moderne, erweiterbare Frontend-Codebasis an.

## Projektumfang
- **Interaktive Spielfläche:** HTML5-Canvas mit Echtzeit-Rendering von Skillshots und Spielerbewegungen.
- **Skillshot-Muster:** Konfigurierbare Angriffswellen, die typische Fähigkeiten von Champions wie Ahri, Ezreal oder Lux simulieren.
- **Spielsteuerung:** Start-, Pause- und Reset-Logik inkl. Countdown, Lebenspunkten und Score-Tracking.
- **Responsives Layout:** Stilistisch an League of Legends angelehnt, inklusive Control-Panel für Schwierigkeitsgrad und Szenario.
- **Erweiterbarkeit:** Struktur für zusätzliche Champions, Effekte, Audio und Persistenz (Highscores, Profile).

## Technologie-Stack
- **Frontend:** Vanilla JavaScript (ES Modules) + HTML5 Canvas für performantes Rendering ohne Build-Tooling.
- **Styling:** Modernes CSS mit Fokus auf dunkles UI-Design, responsive Grid-Layouts und komponentenähnliche Abschnitte.
- **Tooling:** Optional Vite oder ein vergleichbarer Bundler für spätere Iterationen (derzeit nicht notwendig).
- **Tests:** Python `pytest`-basierter Strukturtest, der die wichtigste Frontend-Dateien und Assets sicherstellt. E2E-Tests (z. B. Playwright) sind für spätere Meilensteine vorgesehen.
- **Dokumentation:** Markdown-Dokumente unter `docs/` für Spielmechaniken, Architektur und Beitragsrichtlinien.

## Basis-Verzeichnisstruktur
```text
├── README.md
├── docs/
│   └── README.md
├── src/
│   └── client/
│       ├── index.html
│       ├── scripts/
│       │   └── game.js
│       └── styles/
│           └── main.css
└── tests/
    ├── __init__.py
    └── test_structure.py
```

## Setup & lokale Entwicklung
1. **Statisches Hosting:** Öffne `src/client/index.html` direkt im Browser oder nutze einen einfachen HTTP-Server (`python -m http.server src/client`).
2. **Hot Reloading (optional):** Richte Vite o. ä. ein, sobald modulare Bundles, Assets oder TypeScript erforderlich werden.
3. **Linting & Quality-Gates:** Empfohlen sind ESLint/Prettier (JavaScript) sowie Stylelint (CSS). Konfiguration folgt in späteren Commits.

## Tests ausführen
```bash
pytest
```
Der Strukturtest validiert, dass zentrale Client-Dateien existieren und nicht leer sind.

## Roadmap
1. Skillshot-Physik verfeinern (Trefferboxen, Bewegungskurven, Geschwindigkeitskurven).
2. Audio & visuelles Feedback (SFX, Trefferanimationen, Hitmarker).
3. Eingabemethoden erweitern (Touch-Unterstützung, Gamepad-API).
4. Progression & Challenges (Highscore-Listen, Missionsziele, Tag/Nacht-Modi).
5. Deployment auf statischem Hosting (z. B. GitHub Pages, Netlify) inkl. CI/CD.

## Lizenz
TBD
