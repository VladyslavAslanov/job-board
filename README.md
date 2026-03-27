# Job Board Search Page

Frontend homework task implementation built with React, TypeScript, Vite, Less, MobX, Axios.
The main tak is stored in mainTask.md file

## Time spent

~9 hours

## Tech stack

- React
- TypeScript
- Vite
- MobX (`makeAutoObservable`)
- Axios
- Less + CSS Modules

## How to run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite in the terminal.

## Available scripts

```
npm run dev
npm run build
npm run preview
npm run lint
```

## Implemented features

```
 • Job search page built from the provided design
 • Keyword search
 • Country single-select filter
 • Search on button click
 • Automatic initial load with empty search
 • Desktop layout with:
 	• Selectable job list
 	• Sticky detail panel
 	• Independently scrollable description area
 • Mobile layout with:
 	• Real API integration:
    		• Countries
    		• Paginated jobs list
    		• Job detail
 • Infinite scroll using IntersectionObserver
 • Loading / error / empty states
 • DTO → domain model mapping
 • Localized formatting with Intl
 • Relative posted date formatting
 • Basic accessibility and keyboard interactions
```

## Architecture notes

```
The project uses a feature-oriented structure with clear separation between:
 • Entities — domain-specific models, mappers, and UI pieces
 • Features — user interactions and store logic
 • Widgets — composed UI blocks
 • Pages — page-level composition
 • Shared — infrastructure, hooks, formatters, and utilities
```

## Data flow

API response DTOs are mapped into UI/domain models before being used by the store or components.

## Flow:

HTTP -> DTO -> mapper -> domain model -> store -> UI

This keeps the UI decoupled from raw API field names and transport format.

## State management

A single MobX store orchestrates the job board page flow:

```
 • Draft filters
 • Applied filters
 • Jobs list
 • Selected job
 • Detail loading
 • Mobile modal state
 • Pagination
```

makeAutoObservable is used to keep the store concise and readable.

## Key decisions

1. MobX with one orchestration store – Chosen because the search page flow is tightly connected: filters, list, selection, detail loading, and mobile modal behavior all depend on each other.

2. DTO and domain model separation – Keeps UI components independent from raw API naming like organization_logo or ai_salary_minvalue.

3. Search only on button click – Matches the clarified task requirements and keeps filter behavior explicit.

4. IntersectionObserver for infinite scroll – Cleaner and more efficient than manual scroll handlers.

## What I would improve if I had more time

• More pixel-perfect spacing and typography matching

• Skeleton loaders for cards and detail panel

• More refined mobile modal transitions

• Stronger accessibility audit

• Unit tests for formatters, mappers, and store logic

• Cypress coverage for main user flows

• More polished iconography

• Image fallback improvements and richer empty states

## Notes

• Job description HTML is rendered with dangerouslySetInnerHTML because the task explicitly states that the HTML is trusted.

• The first job is auto-selected on desktop after initial search/load.

• On mobile, details open in a modal instead of a persistent side panel.
