---
type: foundation-baseline
status: in-progress-with-explicit-gates
updated: 2026-11-02
---

# Baseline fondasi MNI OS Operational

Halaman ini merangkum keadaan yang benar-benar telah diperiksa. Status `done` berarti ada bukti; `blocked` berarti langkah berikutnya membutuhkan akses/keputusan yang belum tersedia.

## Lingkungan dan source

| Bagian | Keadaan | Bukti / batas |
|---|---|---|
| Checkout aktif | Branch `development` | Source dan dokumentasi lokal berada di repository `MNI-OS---Operational`; belum ada push pada pekerjaan ini. |
| Source aplikasi | HTML/CSS/JavaScript tanpa bundler | `apps/gudang-logistik/index.html`, `assets/css/app.css`, `assets/js/app.js`; HTML asal ada di `reference/`. |
| Data adapter aktif | `window.claude` | Source menunggu runtime adapter; ini bukan koneksi Supabase. |
| Preview UI | `http://localhost:8002/` | `scripts/preview-server.mjs`, bind loopback; root, CSS, JS merespons HTTP 200. Tidak menyediakan database. |
| Supabase CLI | Tersedia melalui `npx supabase@2.122.0` | `supabase/config.toml` dibuat lokal; `projects list` terhenti karena CLI belum memiliki access token; belum ada link/project-ref, migration SQL, env keys, atau remote writes. |
| Docker/local DB | Belum berjalan | Docker Desktop dibuka, tetapi engine pipe tidak tersedia; `com.docker.service` stopped dan usaha start ditolak oleh akses Windows. |
| Browser QA | Belum dijalankan | Local browser surface tidak tersedia untuk runner. HTTP asset response bukan bukti visual/functional. |
| Vercel/GitHub | Belum dipakai untuk deployment | Push dan deployment ditahan sampai local-ready dan gate rilis. |

## Hosted Supabase discovery — read-only

Connected account exposes a project named `MNI - Operational` (ACTIVE_HEALTHY, Postgres 17, ap-southeast-2). The project is **not yet confirmed as this checkout's target**.

- Inventory: 80 tables under `public`; each table summary reports RLS enabled and 0 rows; 19 migration ledger records through version `20261019231625` / `020_seed_demo_data` (the version label is not the record count).
- Supabase management connector can inspect metadata read-only. The CLI is not authenticated, and `list_branches` returned no development branches for this candidate project.
- Table families include tenant/membership, company/plant/warehouse, items/materials, inventory, work orders/production, purchasing, sales, delivery, audit, and billing.
- Security Advisor snapshot (2026-11-02): 3 mutable-search-path functions, 1 SECURITY DEFINER RPC executable by `anon`, 7 SECURITY DEFINER RPCs executable by `authenticated`, leaked-password protection disabled.
- Performance Advisor snapshot: 94 foreign keys without covering index, 20 auth init-plan findings, and 109 unused-index notices.
- These are advisor findings, not an exploit proof. Review each function/policy against intended callers and change only through source migrations after the database target is confirmed.
- No hosted tables, policies, functions, users, or settings were changed.

## Schema lineage check

- Current checkout contains no `supabase/migrations/` SQL.
- A sibling folder outside this repository has two foundation migrations using `organizations` and `organization_members`.
- The hosted project uses `tenants` and `tenant_memberships`; it also has many later modules.
- Therefore the sibling migration files cannot be treated as the source of truth for the hosted project or this checkout without an owner-confirmed lineage check.

## Application data boundary

- Static preview: files/UI only; no live or local database, no Auth, no shared persistence.
- Hosted discovery through Supabase management tools: read-only metadata/advisors; no row data was queried.
- Local Supabase config: generated, not runnable until Docker service access works; seeds are disabled until a reviewed local schema exists.
- Real operational data: not loaded into local preview, seed files, screenshots, or Git.

## Legacy pilot hypothesis (not approved)

An inquiry for raw material balances by warehouse was previously proposed from the prototype. This is **only a hypothesis**; it is not the selected pilot or a confirmed Operasional requirement.

- User: signed-in warehouse or operational manager; exact role names require process owner approval.
- Context order: active membership → tenant → company → plant/site → warehouse → storage location. Never infer it from a label or first row.
- Data: item identity/unit and a balance definition would need discovery and owner validation. Hosted table names are observations only and do not prescribe the custom schema.
- Acceptance candidates: an authorized user sees only the selected allowed context; an unauthorized/different tenant sees no rows; loading, empty, stale, and error states are explicit; totals reconcile to the approved source; no writes occur.
- Owner must confirm authoritative balance definition, adjustment/hold states, warehouse/location semantics, and role names before implementation.

## Status

- **Done:** source, preview, remote schema metadata, migration ledger, advisor snapshot, integration status, and local tool gaps recorded.
- **In progress:** local config scaffold and product discovery preparation. Hosted schema metadata is recorded as an external observation only; it does not define custom product requirements or the target schema. Neither this app nor its local preview is connected to Supabase.
- **Blocked by host:** starting Docker service/engine for Supabase local stack.
- **Blocked by CLI access:** `supabase projects list` requires a CLI access token; none is configured or stored. The read-only management connector is separate from CLI/app authentication.
- **Needs owner decision:** current-state workflows, user roles, controls, data definitions, priority and first pilot with the Operasional team; whether UI stays vanilla JS or migrates by an approved decision. Hosted candidate currently has no development branch and is not presumed to be the product database.
- **Needs browser surface:** post-fix visual verification and screenshots.

## Navigation

- [[ROADMAP|Roadmap]]
- [[IMPLEMENTATION_PLAN|Rencana implementasi]]
- [[PROJECT_PROGRESS|Progress proyek]]
- [[apps/gudang-logistik/docs/PILOT_BRIEF|Brief pilot]]
- [[apps/gudang-logistik/docs/DATA_MAPPING|Pemetaan UI dan schema]]
- [[research/2026-11-02-local-supabase-vercel-composio-readiness|Audit kesiapan Supabase/Vercel/Composio]]
