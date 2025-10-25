# League of Legends

A lightweight playground for experimenting with League of Legends related tooling,
prototypes and documentation. The repository currently focuses on laying the
foundation for backend services, match analytics pipelines and future frontend
explorations.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [Additional Documentation](#additional-documentation)

## Project Structure

```
.
├── docs/                 # Long-form documentation and architectural references
├── src/                  # Application source code (to be added incrementally)
├── tests/                # Automated test suite (to be added incrementally)
├── README.md             # Quick-start guide (this file)
└── CONTRIBUTING.md       # Contribution guidelines and review process
```

## Prerequisites

- Python 3.10 or newer
- [pip](https://pip.pypa.io/en/stable/) for managing dependencies
- (Optional) [Virtualenv](https://virtualenv.pypa.io/) or
  [uv](https://github.com/astral-sh/uv) for isolated environments

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_ORG/league-of-legends.git
   cd league-of-legends
   ```
2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\\Scripts\\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Project

The implementation work is tracked in the `src/` directory. As we add services
and utilities, they can be launched using the module runner. For example, once
an API entry point exists you will be able to start it with:

```bash
python -m league_of_legends.api
```

Until runtime components are committed, you can verify the environment setup by
executing the placeholder script:

```bash
python scripts/health_check.py
```

This script prints diagnostic information confirming that Python, the virtual
environment and installed dependencies are functioning as expected.

## Running Tests

The project uses [pytest](https://docs.pytest.org/) for automated testing. After
installing dependencies you can execute:

```bash
pytest
```

As more modules are introduced you can scope the run to a subset of tests:

```bash
pytest tests/test_match_predictions.py
```

## Contributing

Please review the [contribution guidelines](CONTRIBUTING.md) for details on our
branching strategy, code style conventions, pull request requirements and review
process.

## Additional Documentation

- [Architecture Overview](docs/architecture.md) – high-level system description
  and planned component interactions.

> _Note_: The technical implementation is intentionally lightweight at this
> stage to focus on design and process documentation. Follow the repository's
> issue tracker for the latest development milestones.
