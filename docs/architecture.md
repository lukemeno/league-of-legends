# Architecture Overview

This document captures the planned architecture for the League of Legends
analytics platform. The goal is to provide a transparent blueprint for new
contributors and to support discussions about trade-offs as the project evolves.

## High-Level System Diagram

```
                        ┌────────────────────┐
                        │  Riot Data APIs    │
                        └────────┬───────────┘
                                 │
                           Data Ingestion
                                 │
┌───────────────┐        ┌───────▼────────┐        ┌────────────────┐
│  Storage &    │◄───────┤ Ingestion/ETL  ├───────►│ Monitoring &   │
│  Feature Store│        │ (Python, Prefect)│       │ Observability │
└───────┬───────┘        └───────┬────────┘        └────────────────┘
        │                        │
        │                 Processed Datasets
        │                        │
┌───────▼─────────┐        ┌─────▼────────┐        ┌──────────────────┐
│  Analytics &    │        │  Public API  │        │  Frontend / CLI  │
│  Modeling (PyTorch)│     │  (FastAPI)   │        │  (React, Typer)  │
└─────────────────┘        └─────┬────────┘        └────────┬─────────┘
                                  │                          │
                              Client Integrations        Internal Tools
```

## Components

### Data Ingestion & ETL
- **Purpose**: Periodically fetch raw match, champion and player data from Riot
  Games' APIs and normalize them into structured datasets.
- **Technology**: Python workers orchestrated by Prefect or Airflow.
- **Key Responsibilities**:
  - Rate-limit aware API client
  - Incremental syncing and deduplication
  - Feature engineering for downstream consumers

### Storage Layer
- **Purpose**: Persist raw and processed data. Candidate technologies include
  PostgreSQL for relational data and DuckDB or Parquet for analytical workloads.
- **Key Responsibilities**:
  - Maintain reproducible datasets
  - Provide snapshots for experimentation
  - Support feature store access patterns

### Analytics & Modeling
- **Purpose**: Train and serve predictive models for win probability, champion
  recommendations and team compositions.
- **Technology**: PyTorch, scikit-learn, pandas for exploratory analysis.
- **Key Responsibilities**:
  - Model training pipelines and experiment tracking
  - Batch scoring jobs for new matches
  - Exporting model artifacts for serving

### Public API Service
- **Purpose**: Expose curated statistics and predictive insights via a RESTful
  interface.
- **Technology**: FastAPI with Pydantic models, running behind Uvicorn or
  Gunicorn.
- **Key Responsibilities**:
  - Authentication and rate limiting
  - Aggregated endpoints for matches, champions and predictions
  - Integration with storage layer and analytics services

### Frontend & Internal Tooling
- **Purpose**: Provide dashboards and developer utilities for interacting with
  the platform.
- **Technology**: React for dashboards, Typer-based CLI for scripting.
- **Key Responsibilities**:
  - Visualization of match trends and model outputs
  - Administrative tooling for data backfills
  - Enabling analysts to run ad-hoc analyses

## Development Environments

- **Local**: Developers run the API and analytics components locally using the
  Python virtual environment described in the README. Optional Docker Compose
  definitions can reproduce the production topology for integration tests.
- **CI/CD**: GitHub Actions will lint, test and build images on each pull
  request. Deployment gates ensure code quality and security checks pass before
  promoting to staging or production environments.

## Future Enhancements

- Establish infrastructure-as-code definitions (Terraform) for reproducible
  environments.
- Implement event-driven ingestion using message queues (e.g., Kafka) as data
  volume grows.
- Add feature store capabilities to improve reuse of engineered features across
  models.
- Provide public documentation and SDKs for partners interacting with the API.
