# Frontend Developer — Homework Task

## Introduction

Build a **job board search page** from the provided Figma designs using **React** and **TypeScript**.

- **Time budget:** ~6 hours (max 8h). Submit whatever you have finished — we value working, clean, readable code over 100% completion.
- You will consume 3 real REST API endpoints (no auth required).
- Focus on code quality, component structure, and design fidelity.

---

## Design

**Figma file:** [FE dev task — job board](https://www.figma.com/design/Q5jSoZLWHlX4amdmPi9UdG/FE-dev-task---job-board?node-id=2-4089&t=pUIXLILQTsqii7PG-0)

**Prototypes:** [Desktop](https://www.figma.com/proto/Q5jSoZLWHlX4amdmPi9UdG/FE-dev-task---job-board?node-id=2-3718&t=pUIXLILQTsqii7PG-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3718) | [Mobile modal](https://www.figma.com/proto/Q5jSoZLWHlX4amdmPi9UdG/FE-dev-task---job-board?node-id=2-3471&t=tQas1uV3PA86uF3O-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A3471)

The file contains 3 frames:

| Frame                     | What it shows                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------|
| **Desktop**               | Sticky search bar at the top, job card list on the left, sticky detail panel on the right sidebar |
| **Mobile — Page**         | Single column layout with stacked search bar and job card list                                    |
| **Mobile — Detail Modal** | Modal overlay showing job details with a fixed bottom bar containing Back and Apply Now buttons   |

**Scrolling behavior (desktop):** The search bar stays sticky at the top. The job list scrolls independently. The detail panel on the right is also sticky, and its job description area is separately scrollable when the content overflows.

---

## Expected Functionality

### Search Bar
- Keyword text input
- Country dropdown — single-select (populated from the countries API). The API supports multiple countries, but for simplicity use a single-select dropdown and send an array with one item.
- Search button

### Job Listing
- Each card shows: company logo (if available), job title, company name, location + work arrangement tags, posted date
- Search results count (e.g. "1,732 search results")
- Infinite scroll (load more results as user scrolls down)

### Detail View
- **Desktop:** clicking a card opens the detail in a sticky right sidebar panel
- **Mobile:** clicking a card opens a modal overlay with a fixed bottom bar (Back + Apply Now buttons)
- Detail shows: job title, company name, salary range, work arrangement, location, full description (HTML), Apply button, posted date
- Selected card has a distinct visual state (coral/red border)

### General Requirements
- **Responsive:** must work on both desktop and mobile (designs provided for both)
- **Loading states:** show loading indicators while fetching data
- **Error handling:** display user-friendly error messages when API calls fail

---

## API Documentation

**Base URL:** `https://test1.kickresume.com/api`

No authentication required. All endpoints accept `GET` requests.

### GET `/job-post-countries/`

Returns the list of countries that have active job posts.

**Response:** `200 OK`

```json
{
  "countries": [
    "Canada",
    "France",
    "Germany",
    "Slovakia",
    "United States"
  ]
}
```

**Notes:**
- Returns distinct country names from all non-expired jobs, sorted alphabetically
- Response is cached

### GET `/job-posts/`

Search for job posts. Returns paginated results.

**Query Parameters:**

| Param       | Type    | Required | Default | Description                                                      |
|-------------|---------|----------|---------|------------------------------------------------------------------|
| `q`         | string  | no       | —       | Free-text search query (searches title, organization, skills)    |
| `country`   | string  | no       | —       | Country name filter (supports multiple values, e.g. `?country=United States&country=Canada`) |
| `limit`     | integer | no       | `20`    | Results per page (1–100)                                         |
| `offset`    | integer | no       | `0`     | Pagination offset                                                |

**Response:** `200 OK`

```json
{
  "count": 1732,
  "next": "https://test1.kickresume.com/api/job-posts/?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "id": "abc123",
      "title": "Javascript Developer",
      "organization": "Cisco",
      "organization_logo": "https://example.com/logo.png",
      "date_posted": "2025-03-07T12:00:00Z",
      "locations_derived": ["Boston, Massachusetts, United States"],
      "ai_work_arrangement": "on-site",
      "ai_salary_minvalue": 20000,
      "ai_salary_maxvalue": 25000,
      "ai_salary_currency": "USD",
      "url": "https://example.com/apply"
    }
  ]
}
```

**Notes:**
- `next` / `previous` are full URLs for pagination (or `null`)
- `organization_logo` may be `null`
- `url` is the external link to the original job posting (use for the Apply button)
- `ai_work_arrangement` is one of: `"on-site"`, `"hybrid"`, `"remote"`, or `null`
- `ai_salary_minvalue` / `ai_salary_maxvalue` / `ai_salary_currency` may be `null`
- With a search query (`q`), results are sorted by relevance; without, sorted by date
- `offset + limit` cannot exceed 10,000

### GET `/job-posts/<id>/`

Returns a single job post with full details including the HTML description.

**Response:** `200 OK`

```json
{
  "id": "abc123",
  "title": "Javascript Developer",
  "organization": "Cisco",
  "organization_logo": "https://example.com/logo.png",
  "date_posted": "2025-03-07T12:00:00Z",
  "locations_derived": ["Boston", "Massachusetts", "United States"],
  "ai_work_arrangement": "on-site",
  "ai_salary_minvalue": 20000,
  "ai_salary_maxvalue": 25000,
  "ai_salary_currency": "USD",
  "url": "https://example.com/apply",
  "description_html": "<p>Full HTML job description...</p>"
}
```

**Notes:**
- Same fields as the list endpoint, plus `description_html`
- `description_html` contains the full job description as trusted HTML — you can render it directly without sanitization
- Returns `404` if job not found

---

## Priorities

We'd rather see clean, working code that covers the core functionality than a pixel-perfect implementation that's half-broken. Prioritize content and functionality first — leave the sticky positioning, independent scroll areas, and other CSS refinements for last if you're running out of time.

---

## Tips

- **Project setup:** use any starter/boilerplate you're comfortable with — spend your time on the actual task, not scaffolding
- **CSS approach:** your choice — pick whatever you're most productive with
- **AI assistants** are welcome — use whatever tools you normally use
- **Don't waste time on:** authentication, deployment, or backend work
- **Do focus on:** clean component architecture, responsive design, and a good user experience

---

## Submission

- Share a Git repository (preferably public GitHub)
- Include a **README** with:
  - How to set up and run the project
  - Roughly how long you spent
  - What you would improve or add with more time

---

## Grading Criteria

We evaluate submissions holistically, but here's what we look at:

- code quality
- component architecture
- responsive design
- data fetching + error handling
