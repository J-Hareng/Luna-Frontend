# Luna Frontend

Luna is an Angular client for managing collections, files, teams, and tasks.

> **Availability notice:** The Luna site is temporarily unavailable. The project
> is under development. It is not expected to become available again.

## Current status

This repository contains the frontend application and its supporting UI
components and services. The application is still being developed, so features,
integrations, and deployment availability may change.

## Features

- User login and account registration
- Dashboard navigation
- Collection and file management
- File uploads and previews
- Team and task management
- Reusable Luna UI components
- Angular Material-based interface

## Technology

- Angular 18
- TypeScript
- Angular Material and CDK
- RxJS
- Express and Angular SSR support

## Local development

### Prerequisites

- Node.js and npm
- A configured backend/API if API-connected features are needed

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Then open `http://localhost:4200/` in a browser. The development server
reloads automatically when source files change.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run build` | Create a production build |
| `npm run watch` | Build continuously using the development configuration |
| `npm test` | Run the unit test suite |
| `npm run lint` | Run the project linter |

## Main application areas

- `src/app/comp/l-p-comp/` — login and registration pages
- `src/app/comp/m-p-comp/` — dashboard, collections, teams, and tasks
- `src/app/custom-components/` — reusable Luna UI components
- `src/app/serv/` — API and application services
- `src/CssUtilitys/` — shared styling utilities

## Build and deployment

To create a production build:

```bash
npm run build
```

The generated files are written to `dist/`. The public deployment is temporarily
offline while the application is being developed.

## Contributing

Changes should be focused, tested where practical, and consistent with the
existing Angular structure. Before submitting changes, run the relevant tests,
lint checks, and production build.
