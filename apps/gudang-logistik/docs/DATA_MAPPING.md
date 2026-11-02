---
type: data-mapping
status: legacy-observation-not-product-specification
updated: 2026-11-02
---

# Catatan observasi source dan Supabase hosted — bukan spesifikasi custom

> Dokumen lama ini membandingkan collection source dengan tabel hosted yang terlihat di metadata. Ia **bukan** mapping yang disetujui, kontrak data, rancangan schema MNI OS, atau izin memakai tabel tersebut. MNI OS akan memiliki model custom yang diturunkan dari kebutuhan Operasional yang tervalidasi.

| Source prototype | Kandidat schema hosted | Status dan hal yang belum pasti |
|---|---|---|
| `rm` — bahan baku | `items`, `material_skus`, `material_units`, `inventory_balances` | Belum jelas apakah record `rm` adalah master SKU, unit fisik, atau saldo; saldo harus mengikuti ledger yang disahkan. |
| `fg` — barang jadi | `products`, `inventory_balances` | Perlu identitas produk/varian, lokasi, satuan, status QC, serta sumber saldo. |
| `mutasi`, `rmhist` — mutasi/histori | `inventory_movements`, `inventory_movement_lines`, atau `inventory_transactions` | Tabel/event berbeda generasi; jangan pilih sebelum cocokkan aturan posted/reversal dan entity key. |
| `opname` — stok fisik | Belum tampak entity stock-count khusus pada daftar metadata | Jangan memaksakan ke transaction table. Perlu desain stock count, variance, approval, dan posting. |
| `spk` — surat perintah kerja | `work_orders` atau `production_orders` | Dua model produksi terdeteksi; definisi SPK, nomor, status, BOM, dan migrasi belum dicocokkan. |
| `pr` — permintaan pembelian | `purchase_orders`, `purchase_order_lines` | Prototype menyebut permintaan pembelian; PO bukan otomatis PR. Belum tampak requisition entity spesifik. |
| `vendor` — vendor finishing | `vendors`, `subcontract_services`, `subcontract_shipments`, `subcontract_returns` | Perlu validasi perjalanan keluar → proses vendor → hasil/return → rekonsiliasi kuantitas. |
| `kirim` — pengiriman | `delivery_orders`, `delivery_order_lines`, mungkin `sales_orders` | Perlu pemetaan surat jalan, order referensi, status, bukti serah terima, dan pembatalan. |
| `bongkar` — bongkar muat | `receiving_lots` atau `inventory_movements` mungkin terkait | Tidak ada mapping langsung yang terbukti; jadwal dock/logistics event mungkin perlu entity terpisah. |
| `master` — master item/config | `items`, `products`, `item_categories`, `uoms`, `units_of_measure` | Daftar field dan kepemilikan tiap master harus dipisah. |
| `mvendor`, `msupplier` | `vendors`, `suppliers`, `item_suppliers` | Bedakan vendor jasa, pemasok material, dan relasi item/vendor. |
| `mcustomer` | `customers`, `customer_contacts` | PII kontak harus dibatasi dan tidak masuk fixture. |
| `marmada` | Belum ada vehicle/fleet table yang tampak | Butuh keputusan apakah armada bagian proses pilot; jangan gunakan field kendaraan generik. |
| `mwc` | `work_centres`, `work_centers`, `machines` | Ada varian ejaan/dua model work-center; canonical entity belum dipastikan. |
| `muser` | `user_profiles`, `tenant_memberships` | Pastikan profile vs role/membership; UI prototype `ROLE_ON=false` bukan kontrol akses. |
| `ureq`, `uinv` | Belum ada mapping langsung yang terverifikasi | Bisa berkaitan invite/requests; jangan salin data/token. Cek fungsi Auth dan retensi dahulu. |
| `log` | `audit_logs` | Event schema, actor, before/after, retention, redaction, dan append-only rule belum dicocokkan. |

## Ketidakcocokan penting

- Prototype menggunakan nama collection pendek dan `window.claude`; hosted Supabase memakai schema relasional dengan `tenant_id` dan tabel-tabel khusus.
- Hosted project punya tenant model (`tenants`, `tenant_memberships`). Dua migration yang ada pada sibling checkout memakai organization model (`organizations`, `organization_members`). Jangan campur model tersebut.
- Beberapa domain memiliki dua generasi entity (`items`/`products`, `work_centres`/`work_centers`, `inventory_movements`/`inventory_transactions`). Nama mirip tidak membuktikan ekuivalensi.
- Table metadata menunjukkan RLS aktif, namun akses harus tetap diuji via role dan tenant yang sebenarnya di lingkungan lokal/nonproduction.

## Status dan langkah berikutnya

1. Jalankan discovery dan validasi kebutuhan melalui [[documentation/OPERATIONAL_DISCOVERY|register Operasional]].
2. Pilih proses pertama bersama pemilik proses; brief saldo bahan baku tetap hipotesis sampai saat itu.
3. Rancang entity/relasi, permission, dan migration lokal dari requirement dan sumber MNI yang tervalidasi.
4. Pakai metadata hosted hanya jika project target dan tujuannya dikonfirmasi; jangan menganggap nama tabel sebagai rekomendasi desain.
5. Catat keputusan/data lineage yang disetujui di data dictionary dan log keputusan.

## Sumber pemeriksaan

- Prototype: `assets/js/app.js`, `docs/DATA_INVENTORY.md`, dan `docs/INVENTORY.md`.
- Backend candidate: schema metadata Supabase `MNI - Operational`, diakses read-only pada 2026-11-02. Tidak ada row/query operasional yang dibaca.
- Ringkasan akses dan ketidakpastian: [[documentation/FOUNDATION_BASELINE|baseline fondasi]].
