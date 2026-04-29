export const theme = `
  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #1a1a24;
    --surface3: #222230;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(232,255,71,0.25);
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --accent-dim: rgba(232,255,71,0.1);
    --text: #f0f0f5;
    --muted: rgba(240,240,245,0.45);
    --muted2: rgba(240,240,245,0.25);
    --success: #4ade80;
    --danger: #f87171;
    --info: #60a5fa;
    --radius: 12px;
    --radius-sm: 8px;
  }

  /* ── BASE ── */
  body { background: var(--bg); color: var(--text); font-family: 'Manrope', sans-serif; }

  /* ── PAGE HEADER ── */
  .page-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 36px; padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .page-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    letter-spacing: 2px; line-height: 1;
    color: var(--text);
  }
  .page-title span { color: var(--accent); }

  /* ── DARK CARD ── */
  .dark-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .dark-card-header {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dark-card-header h5, .dark-card-header h6 {
    font-size: 13px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted);
    margin: 0;
  }
  .dark-card-body { padding: 24px; }

  /* ── BUTTONS ── */
  .btn-accent {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
    color: var(--bg) !important;
    background: var(--accent) !important;
    border: none !important;
    padding: 9px 20px; border-radius: var(--radius-sm);
    cursor: pointer; transition: opacity 0.2s, transform 0.15s;
  }
  .btn-accent:hover { opacity: 0.85; transform: translateY(-1px); }
  .btn-accent:disabled { opacity: 0.4; transform: none; cursor: not-allowed; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500;
    color: var(--muted) !important;
    background: rgba(255,255,255,0.05) !important;
    border: 1px solid var(--border) !important;
    padding: 8px 18px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { color: var(--text) !important; background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.15) !important; }
  .btn-ghost:disabled { opacity: 0.35; cursor: not-allowed; }

  .btn-danger-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500;
    color: var(--danger) !important;
    background: rgba(248,113,113,0.08) !important;
    border: 1px solid rgba(248,113,113,0.2) !important;
    padding: 8px 18px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all 0.2s;
  }
  .btn-danger-ghost:hover { background: rgba(248,113,113,0.15) !important; }

  .btn-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: var(--muted);
    background: none; border: none; cursor: pointer;
    padding: 0; transition: color 0.2s;
    text-decoration: none;
  }
  .btn-back:hover { color: var(--text); }

  /* ── TABLE ── */
  .dark-table { width: 100%; border-collapse: collapse; }
  .dark-table th {
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted2);
    padding: 12px 16px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .dark-table td {
    padding: 14px 16px; font-size: 14px; color: var(--text);
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .dark-table tr:last-child td { border-bottom: none; }
  .dark-table tbody tr { transition: background 0.15s; }
  .dark-table tbody tr:hover { background: rgba(255,255,255,0.03); }
  .dark-table tbody tr.row-active { background: var(--accent-dim); }
  .dark-table tbody tr.row-active td { color: var(--text); }
  .dark-table tbody tr.row-clickable { cursor: pointer; }

  /* ── FORM CONTROLS ── */
  .dark-input, .dark-select, .dark-textarea {
    width: 100%;
    background: var(--surface2) !important;
    border: 1px solid var(--border) !important;
    border-radius: var(--radius-sm) !important;
    color: var(--text) !important;
    font-size: 14px !important;
    padding: 10px 14px !important;
    font-family: 'Manrope', sans-serif !important;
    transition: border-color 0.2s !important;
    outline: none !important;
  }
  .dark-input:focus, .dark-select:focus, .dark-textarea:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 3px rgba(232,255,71,0.08) !important;
  }
  .dark-input::placeholder, .dark-textarea::placeholder { color: var(--muted2) !important; }
  .dark-select option { background: var(--surface2); color: var(--text); }
  .dark-label {
    display: block;
    font-size: 12px; font-weight: 600; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 8px;
  }
  .dark-form-group { margin-bottom: 20px; }
  .dark-form-hint { font-size: 12px; color: var(--muted2); margin-top: 5px; }

  /* ── CHECKBOX ── */
  .dark-check { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .dark-check input[type=checkbox] {
    width: 16px; height: 16px; accent-color: var(--accent);
    cursor: pointer;
  }
  .dark-check span { font-size: 14px; color: var(--text); }

  /* ── BADGES ── */
  .badge-accent {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    color: var(--bg); background: var(--accent);
    padding: 3px 8px; border-radius: 4px;
  }
  .badge-info {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 600;
    color: var(--info); background: rgba(96,165,250,0.12);
    padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(96,165,250,0.2);
  }
  .badge-success {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 600;
    color: var(--success); background: rgba(74,222,128,0.12);
    padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(74,222,128,0.2);
  }
  .badge-muted {
    display: inline-flex; align-items: center;
    font-size: 11px; font-weight: 500;
    color: var(--muted); background: rgba(255,255,255,0.06);
    padding: 3px 8px; border-radius: 4px;
  }

  /* ── ALERT ── */
  .dark-alert {
    padding: 14px 18px; border-radius: var(--radius-sm);
    font-size: 14px; margin-bottom: 20px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .dark-alert-danger { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25); color: var(--danger); }
  .dark-alert-success { background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25); color: var(--success); }
  .dark-alert-info { background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.25); color: var(--info); }
  .dark-alert-close { background: none; border: none; cursor: pointer; color: inherit; opacity: 0.7; font-size: 16px; padding: 0; }
  .dark-alert-close:hover { opacity: 1; }

  /* ── SPINNER ── */
  .dark-spinner {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 80px 0; gap: 16px;
  }
  .spinner-ring {
    width: 36px; height: 36px; border-radius: 50%;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    animation: spin 0.7s linear infinite;
  }
  .spinner-text { font-size: 13px; color: var(--muted); letter-spacing: 0.5px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── MODAL ── */
  .dark-modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn 0.15s ease;
  }
  .dark-modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; width: 100%; max-width: 480px;
    animation: modalUp 0.2s ease;
    overflow: hidden;
  }
  .dark-modal-header {
    padding: 20px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .dark-modal-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 1px; color: var(--text);
  }
  .dark-modal-close {
    background: rgba(255,255,255,0.06); border: 1px solid var(--border);
    color: var(--muted); width: 30px; height: 30px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px; transition: all 0.15s;
  }
  .dark-modal-close:hover { background: rgba(255,255,255,0.1); color: var(--text); }
  .dark-modal-body { padding: 24px; }
  .dark-modal-footer {
    padding: 16px 24px; border-top: 1px solid var(--border);
    display: flex; gap: 10px; justify-content: flex-end;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes modalUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* ── AD CARD ── */
  .ad-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); overflow: hidden;
    cursor: pointer; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    display: flex; flex-direction: column;
  }
  .ad-card:hover { transform: translateY(-4px); border-color: var(--border-hover); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
  .ad-card-body {
    padding: 20px;
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    min-height: min-content;
  }
  .ad-card-title { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .ad-card-sub { font-size: 13px; color: var(--muted); margin-bottom: 12px; }
  .ad-card-desc {
    font-size: 13px; color: var(--muted); line-height: 1.55;
    overflow: hidden; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    margin-bottom: 12px;
    flex: 0 1 auto;
    min-height: 0;
  }
  .ad-card-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 1px; color: var(--accent);
    margin-top: 0;
  }
  .ad-card-footer {
    padding: 12px 20px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .ad-card-seller { font-size: 12px; color: var(--muted); }
  .ad-card-actions { display: flex; gap: 8px; }

  /* ── SPEC TABLE (details page) ── */
  .spec-table { width: 100%; border-collapse: collapse; }
  .spec-table tr { border-bottom: 1px solid var(--border); }
  .spec-table tr:last-child { border-bottom: none; }
  .spec-table td { padding: 12px 0; font-size: 14px; }
  .spec-table td:first-child { color: var(--muted); width: 40%; }
  .spec-table td:last-child { color: var(--text); font-weight: 500; }

  /* ── PAGINATION ── */
  .dark-pagination { display: flex; gap: 4px; justify-content: center; margin-top: 32px; }
  .dark-page-btn {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 500; cursor: pointer;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--muted); transition: all 0.15s;
  }
  .dark-page-btn:hover:not(:disabled) { border-color: var(--border-hover); color: var(--text); }
  .dark-page-btn.active { background: var(--accent); border-color: var(--accent); color: var(--bg); font-weight: 700; }
  .dark-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* ── FILTER SIDEBAR ── */
  .filter-sidebar {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px;
    position: sticky; top: 80px;
  }
  .filter-title {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 20px; padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  .filter-group { margin-bottom: 20px; }

  /* ── FEATURE CHIPS ── */
  .feature-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .feature-chip {
    font-size: 12px; font-weight: 500;
    padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    color: var(--muted);
    cursor: pointer; transition: all 0.15s;
    user-select: none;
  }
  .feature-chip:hover { border-color: rgba(232,255,71,0.3); color: var(--text); }
  .feature-chip.selected { background: var(--accent-dim); border-color: rgba(232,255,71,0.4); color: var(--accent); }

  /* ── PHOTO GALLERY ── */
  .photo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .photo-item { position: relative; border-radius: var(--radius-sm); overflow: hidden; }
  .photo-item img { width: 100%; height: 200px; object-fit: cover; display: block; }
  .photo-main-badge {
    position: absolute; top: 8px; left: 8px;
    font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    padding: 3px 8px; border-radius: 4px;
    background: var(--accent); color: var(--bg);
  }
  .photo-empty {
    display: flex; align-items: center; justify-content: center;
    height: 120px; border: 2px dashed var(--border);
    border-radius: var(--radius-sm); color: var(--muted); font-size: 14px;
  }

  /* ── DETAILS LAYOUT ── */
  .details-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
  @media (max-width: 900px) { .details-grid { grid-template-columns: 1fr; } }

  /* ── PRICE BLOCK ── */
  .price-block {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px; margin-bottom: 16px;
  }
  .price-big {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px; letter-spacing: 1px; color: var(--accent);
    margin-bottom: 16px; line-height: 1;
  }

  /* ── RESULTS HEADER ── */
  .results-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }
  .results-count { font-size: 14px; color: var(--muted); }
  .results-count strong { color: var(--text); font-size: 20px; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; }

  /* ── TWO-COL LAYOUT ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 768px) { .two-col, .three-col { grid-template-columns: 1fr; } }

  /* ── SEARCH LAYOUT ── */
  .search-layout { display: grid; grid-template-columns: 280px 1fr; gap: 24px; }
  @media (max-width: 900px) { .search-layout { grid-template-columns: 1fr; } }

  /* ── ADS GRID ── */
  .ads-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center; padding: 60px 24px;
    border: 2px dashed var(--border); border-radius: var(--radius);
  }
  .empty-state-icon { font-size: 40px; margin-bottom: 16px; opacity: 0.5; }
  .empty-state-text { font-size: 15px; color: var(--muted); margin-bottom: 16px; }

  /* ── SECTION DIVIDER ── */
  .section-divider {
    height: 1px; background: var(--border); margin: 28px 0;
  }
  .section-label-sm {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .section-label-sm::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  /* ── VIN ── */
  .vin-code {
    font-family: 'Courier New', monospace;
    font-size: 13px; letter-spacing: 2px;
    color: var(--accent); background: var(--accent-dim);
    padding: 4px 10px; border-radius: 4px;
  }

  /* ── ANIMATIONS ── */
  .fade-in { animation: fadeUp 0.4s ease forwards; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;
