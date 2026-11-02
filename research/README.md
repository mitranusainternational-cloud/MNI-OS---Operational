---
type: research-index
status: active
updated: 2026-11-02
---

# Riset dan pengetahuan proses

Simpan catatan riset terpisah per pertanyaan atau proses. Gunakan format `YYYY-MM-DD-topik.md`. File kode dan sumber aplikasi disimpan di `apps/`, bukan di folder riset.

Mulai dari [[research/2026-11-02-obsidian-project-workspace-best-practice|riset workflow Obsidian]], [[research/2026-11-02-erp-rationalization-best-practice|metode discovery untuk MNI OS custom]], [[2026-11-02-agent-team-and-skills-best-practice|riset tim agent dan skill]], atau [[2026-11-02-local-supabase-vercel-composio-readiness|audit Supabase/Vercel/Composio]]. Gunakan [[documentation/templates/RESEARCH_NOTE_TEMPLATE|template riset]] pada `documentation/templates/`.

## Format catatan

```markdown
---
date: YYYY-MM-DD
process: nama-proses
status: draft
---

# Pertanyaan riset
## Ringkasan temuan
## Bukti dan sumber
## Interpretasi
## Dampak pada proses MNI
## Hal yang belum terverifikasi
## Tindak lanjut
```

Tandai `Observed` (fakta yang terlihat), `Interpretation` (kesimpulan sementara), `Assumption`, `Proposed`, dan `Approved`. Catat pemilik/sumber, tanggal, cakupan, dan batas data yang dibaca. Discovery proses MNI ada di [[documentation/OPERATIONAL_DISCOVERY]]; source-code inventory adalah petunjuk teknis, bukan kebutuhan proses.
