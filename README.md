<div align="center">

# NiveshPro

**A modern personal finance dashboard** — track spending, portfolio, goals, and bills in one clean interface.

[![Live site](https://img.shields.io/badge/Live%20site-Open%20NiveshPro-22c55e?style=for-the-badge&logo=googlechrome&logoColor=white)](https://niveshpro-1.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Rajeebdas%2FNiveshPro-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rajeebdas/NiveshPro)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## Live application

The dashboard is deployed on Render:

**[https://niveshpro-1.onrender.com/](https://niveshpro-1.onrender.com/)**

---

## Highlights

| Area | What you get |
|------|----------------|
| **Dashboard** | At-a-glance view of your financial picture |
| **Transactions** | Income and expense history |
| **Portfolio** | Holdings and performance context |
| **Goals** | Savings targets you can work toward |
| **Bills** | Upcoming and recurring payments |
| **Auth** | Secure sign-in via Supabase |

---

## Tech stack

- **Frontend:** React 19, TypeScript, Vite  
- **UI:** Tailwind CSS v4, Radix UI primitives, shadcn-style components, Lucide icons  
- **Data & state:** TanStack Query, Zod  
- **Backend integration:** Supabase client, workspace API packages  
- **Charts:** Recharts  
- **Routing:** Wouter  
- **Monorepo:** pnpm workspaces (`artifacts/*`, `lib/*`)

---

## Repository

Source code and issues live here:

**[https://github.com/Rajeebdas/NiveshPro](https://github.com/Rajeebdas/NiveshPro)**

---

## Local development

**Requirements:** [Node.js](https://nodejs.org/) (see `render.yaml` for the pinned version used in production), [pnpm](https://pnpm.io/) 9.x.

```bash
# Install dependencies
pnpm install

# Run the dashboard dev server
pnpm run dev:dashboard
```

The app is served from the `@workspace/niveshpro` package under `artifacts/niveshpro`.

**Production build**

```bash
pnpm run build:dashboard
```

Output is written to `artifacts/niveshpro/dist/public`.

---

## Deploying (Render)

This repo includes a [Render](https://render.com/) blueprint in `render.yaml` for a static site build.

For production, configure these **environment variables** in the Render service (required for Supabase in the browser):

- `VITE_SUPABASE_URL`  
- `VITE_SUPABASE_ANON_KEY`  

See comments in `render.yaml` for details.

---

## License

MIT — see the root `package.json` license field.

---

<div align="center">

Built with care for clarity and everyday money management.

**[Open the live app →](https://niveshpro-1.onrender.com/)**

</div>
