/**
 * MNI Gudang - DB Adapter
 *
 * Drop-in replacement for the Firestore calls in the original single-file app.
 * The original app used global functions: addDoc, updDoc, delDoc, and
 * a global listener via onSnapshot that populated window.S (the state object).
 *
 * This module re-exports those same function names so the main app code
 * needs zero changes to its business logic.
 *
 * HOW IT WORKS:
 *   1. On init, subscribeAll() fetches all tables and wires Realtime.
 *   2. Each change calls window.__dbUpdate(col, rows), which the app
 *      listens to for updating S[col] and re-rendering.
 *   3. CRUD functions are bound to the current session user automatically.
 *
 * USAGE in main HTML:
 *   <script type="module">
 *     import { initDB } from '/src/lib/db-adapter.js';
 *     initDB((col, rows) => {
 *       S[col] = rows;
 *       calc();
 *       renderAll();
 *     });
 *   </script>
 */

import {
  addDoc as _addDoc,
  updDoc as _updDoc,
  delDoc as _delDoc,
  subscribeAll,
  getCurrentUser,
  onAuthStateChange,
  supabase
} from './supabase.js';

// Current user cache
let _currentUser = null;
let _currentEmail = null;

async function refreshUser() {
  _currentUser = await getCurrentUser();
  _currentEmail = _currentUser?.email || null;
  return _currentUser;
}

// ── Public CRUD (auto-inject current user email) ──────────────────────────────

export async function addDoc(col, data) {
  return _addDoc(col, data, _currentEmail);
}

export async function updDoc(col, id, data) {
  return _updDoc(col, id, data, _currentEmail);
}

export async function delDoc(col, id, hard = false) {
  return _delDoc(col, id, hard);
}

// ── Init ──────────────────────────────────────────────────────────────────────

/**
 * Initialize the DB adapter.
 * @param {Function} onUpdate - called with (col, rows) on every change
 * @param {Function} onAuthChange - called with (event, session)
 * @returns {{ unsubscribe: Function }}
 */
export async function initDB(onUpdate, onAuthChange) {
  await refreshUser();

  // Auth state listener
  const unsubAuth = onAuthStateChange(async (event, session) => {
    _currentUser = session?.user || null;
    _currentEmail = _currentUser?.email || null;
    if (onAuthChange) onAuthChange(event, session);
  });

  // Realtime subscription
  const unsubRT = subscribeAll(onUpdate);

  return {
    unsubscribe: () => {
      unsubAuth();
      unsubRT();
    },
    getUser: () => _currentUser,
    getEmail: () => _currentEmail
  };
}

// ── Expose to window for use from non-module scripts ─────────────────────────
window.DB = { addDoc, updDoc, delDoc, initDB };
export { supabase };
