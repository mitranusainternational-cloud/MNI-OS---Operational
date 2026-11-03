# Kebijakan keamanan

Sistem ini dipakai tim Operasional PT Mitra Nusa Internasional.

## Melaporkan kerentanan

Jangan membuka isu publik berisi detail kerentanan. Laporkan secara privat lewat **GitHub Security Advisories** pada repo ini (tab Security, "Report a vulnerability"), atau hubungi pemilik repo langsung. Sertakan langkah memicu, dampak, dan lingkungan (production, staging, dev).

## Aturan yang berlaku di repo ini

- Tidak ada kunci rahasia, kunci service-role, password, atau data operasional nyata di Git. Kunci `anon`/publishable Supabase bersifat publik dan dipakai di browser; kunci `service_role` dan `secret` tidak boleh masuk ke repo, Vercel (`VITE_*`), atau klien.
- Akses data dibatasi RLS per role (lihat `documentation/DECISIONS.md` dan skill `rls-roles`); migration tidak boleh melonggarkan RLS tanpa tinjauan.
- `main` hanya berubah lewat PR dengan CI hijau dan satu approval.
- Secret scanning dan push protection GitHub aktif.

## Versi yang didukung

Hanya versi pada branch `main` yang dilayani di production dan staging.
