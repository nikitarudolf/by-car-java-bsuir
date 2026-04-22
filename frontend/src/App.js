import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import BrandManagement from './components/BrandManagement';
import FeatureManagement from './components/FeatureManagement';
import AdvertisementList from './components/AdvertisementList';
import AdvertisementForm from './components/AdvertisementForm';
import AdvertisementDetails from './components/AdvertisementDetails';
import AdvertisementSearch from './components/AdvertisementSearch';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600;700&display=swap');

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #1a1a24;
    --border: rgba(255,255,255,0.07);
    --accent: #e8ff47;
    --accent2: #ff6b35;
    --text: #f0f0f5;
    --muted: rgba(240,240,245,0.45);
    --nav-h: 64px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Manrope', sans-serif;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .nav-wrap {
    position: sticky; top: 0; z-index: 100;
    height: var(--nav-h);
    display: flex; align-items: center;
    background: rgba(10,10,15,0.82);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    gap: 40px;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--accent);
    text-decoration: none;
    flex-shrink: 0;
  }
  .nav-logo span { color: var(--text); }
  .nav-links { display: flex; gap: 4px; flex: 1; }
  .nav-link {
    font-size: 13px; font-weight: 500; letter-spacing: 0.5px;
    color: var(--muted);
    text-decoration: none;
    padding: 6px 14px; border-radius: 6px;
    transition: color 0.2s, background 0.2s;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.06); }
  .nav-link.active { color: var(--accent); }
  .nav-cta {
    margin-left: auto; flex-shrink: 0;
    font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
    color: var(--bg);
    background: var(--accent);
    text-decoration: none;
    padding: 8px 20px; border-radius: 8px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    position: relative; overflow: hidden;
    min-height: calc(100vh - var(--nav-h));
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 80px 80px;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
  }
  .hero-bg::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 720px; height: 720px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,255,71,0.09) 0%, transparent 70%);
  }
  .hero-bg::after {
    content: '';
    position: absolute; bottom: 10%; left: 5%;
    width: 480px; height: 480px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-content { position: relative; max-width: 720px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    color: var(--accent);
    border: 1px solid rgba(232,255,71,0.3);
    padding: 5px 14px; border-radius: 100px;
    margin-bottom: 32px;
    animation: fadeUp 0.6s ease both;
  }
  .hero-badge::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 10vw, 128px);
    line-height: 0.92;
    letter-spacing: 2px;
    color: var(--text);
    margin-bottom: 8px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-title .accent { color: var(--accent); }
  .hero-subtitle {
    font-size: 18px; font-weight: 300; color: var(--muted);
    max-width: 460px; line-height: 1.65;
    margin-bottom: 48px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-primary-custom {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 600; letter-spacing: 0.3px;
    color: var(--bg);
    background: var(--accent);
    text-decoration: none;
    padding: 14px 32px; border-radius: 10px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(232,255,71,0.25);
    color: var(--bg);
  }
  .btn-secondary-custom {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 500; letter-spacing: 0.3px;
    color: var(--text);
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    text-decoration: none;
    padding: 14px 28px; border-radius: 10px;
    transition: background 0.2s, transform 0.2s;
  }
  .btn-secondary-custom:hover {
    background: rgba(255,255,255,0.1); transform: translateY(-2px);
    color: var(--text);
  }

  /* ── STATS ── */
  .stats-row {
    position: relative;
    border-top: 1px solid var(--border);
    display: grid; grid-template-columns: repeat(4, 1fr);
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .stat-item {
    padding: 40px 48px;
    border-right: 1px solid var(--border);
  }
  .stat-item:last-child { border-right: none; }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px; line-height: 1;
    color: var(--text);
  }
  .stat-num span { color: var(--accent); }
  .stat-label {
    font-size: 12px; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted);
    margin-top: 6px;
  }

  /* ── FEATURES SECTION ── */
  .section {
    padding: 100px 80px;
  }
  .section-label {
    font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--accent); margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5vw, 64px); letter-spacing: 1px;
    color: var(--text); margin-bottom: 60px;
    line-height: 1.05;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .feature-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px 32px;
    text-decoration: none;
    color: var(--text);
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    display: block;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(232,255,71,0.05), transparent);
    opacity: 0; transition: opacity 0.25s;
  }
  .feature-card:hover { transform: translateY(-4px); border-color: rgba(232,255,71,0.25); box-shadow: 0 12px 40px rgba(0,0,0,0.4); color: var(--text); }
  .feature-card:hover::before { opacity: 1; }
  .card-icon {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 20px;
    background: rgba(232,255,71,0.1);
  }
  .card-title { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .card-arrow {
    position: absolute; bottom: 28px; right: 28px;
    font-size: 18px; color: var(--muted);
    transition: transform 0.2s, color 0.2s;
  }
  .feature-card:hover .card-arrow { transform: translate(3px,-3px); color: var(--accent); }

  /* ── RELATIONS SECTION ── */
  .relations-section {
    padding: 0 80px 100px;
  }
  .rel-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;
  }
  .rel-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 28px;
  }
  .rel-tag {
    display: inline-block;
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 4px;
    margin-bottom: 14px;
  }
  .tag-one { background: rgba(232,255,71,0.12); color: var(--accent); }
  .tag-many { background: rgba(255,107,53,0.12); color: var(--accent2); }
  .rel-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
  .rel-desc { font-size: 13px; color: var(--muted); line-height: 1.55; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── PAGE CONTENT (non-home) ── */
  .page-wrap {
    max-width: 1200px; margin: 0 auto;
    padding: 48px 32px;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 32px 80px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 2px;
    color: var(--muted);
  }
  .footer-copy { font-size: 12px; color: var(--muted); }

  @media (max-width: 900px) {
    .hero { padding: 60px 24px 60px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .section, .relations-section { padding-left: 24px; padding-right: 24px; }
    .rel-grid { grid-template-columns: 1fr; }
    .footer { padding: 24px; flex-direction: column; gap: 12px; }
  }
`;

function NavBar() {
    const location = useLocation();
    const links = [
        { to: '/', label: 'Главная' },
        { to: '/search', label: 'Поиск' },
        { to: '/advertisements', label: 'Объявления' },
        { to: '/brands', label: 'Бренды' },
        { to: '/features', label: 'Характеристики' },
    ];
    return (
        <nav className="nav-wrap">
            <Link to="/" className="nav-logo">By<span>Car</span></Link>
            <div className="nav-links">
                {links.map(l => (
                    <Link
                        key={l.to}
                        to={l.to}
                        className={`nav-link${location.pathname === l.to ? ' active' : ''}`}
                    >{l.label}</Link>
                ))}
            </div>
            <Link to="/advertisements/create" className="nav-cta">+ Подать объявление</Link>
        </nav>
    );
}

const Home = () => (
    <>
        <section className="hero">
            <div className="hero-bg">
                <div className="hero-grid" />
            </div>
            <div className="hero-content">
                <div className="hero-badge">Платформа автообъявлений</div>
                <h1 className="hero-title">
                    НАЙДИ<br />СВОЁ<br /><span className="accent">АВТО</span>
                </h1>
                <p className="hero-subtitle">
                    Тысячи проверенных объявлений. Удобный поиск с фильтрами, детальные характеристики и прозрачные сделки.
                </p>
                <div className="hero-actions">
                    <Link to="/search" className="btn-primary-custom">
                        🔍 Найти автомобиль
                    </Link>
                    <Link to="/advertisements/create" className="btn-secondary-custom">
                        Разместить объявление →
                    </Link>
                </div>
            </div>
        </section>

        <div className="stats-row">
            {[
                { num: '12K', suf: '+', label: 'Объявлений' },
                { num: '340', suf: '', label: 'Брендов и моделей' },
                { num: '98', suf: '%', label: 'Довольных покупателей' },
                { num: '24/7', suf: '', label: 'Поддержка' },
            ].map(s => (
                <div key={s.label} className="stat-item">
                    <div className="stat-num">{s.num}<span>{s.suf}</span></div>
                    <div className="stat-label">{s.label}</div>
                </div>
            ))}
        </div>

        <section className="section">
            <div className="section-label">Возможности</div>
            <h2 className="section-title">Всё что нужно<br />для покупки авто</h2>
            <div className="cards-grid">
                {[
                    { icon: '🔍', title: 'Умный поиск', desc: 'Фильтрация по марке, модели, году и характеристикам с мгновенной пагинацией.', to: '/search' },
                    { icon: '📋', title: 'Объявления', desc: 'Просматривайте, создавайте и редактируйте объявления с подробными фото.', to: '/advertisements' },
                    { icon: '🏷️', title: 'Бренды и модели', desc: 'Полная база марок с иерархией моделей — связь один ко многим.', to: '/brands' },
                    { icon: '⚙️', title: 'Характеристики', desc: 'Детальные технические параметры для каждого автомобиля.', to: '/features' },
                ].map(card => (
                    <Link key={card.to} to={card.to} className="feature-card">
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-title">{card.title}</div>
                        <div className="card-desc">{card.desc}</div>
                        <span className="card-arrow">↗</span>
                    </Link>
                ))}
            </div>
        </section>

        <section className="relations-section">
            <div className="section-label">Архитектура данных</div>
            <h2 className="section-title" style={{ marginBottom: 32 }}>Связи в системе</h2>
            <div className="rel-grid">
                <div className="rel-card">
                    <span className="rel-tag tag-one">OneToMany</span>
                    <div className="rel-title">Бренд → Модели</div>
                    <div className="rel-desc">Каждый бренд содержит список моделей. Выберите бренд — увидите все его модели.</div>
                </div>
                <div className="rel-card">
                    <span className="rel-tag tag-one">OneToMany</span>
                    <div className="rel-title">Объявление → Фото</div>
                    <div className="rel-desc">К каждому объявлению прикреплён набор фотографий — смотрите на странице деталей.</div>
                </div>
                <div className="rel-card">
                    <span className="rel-tag tag-many">ManyToMany</span>
                    <div className="rel-title">Авто ↔ Характеристики</div>
                    <div className="rel-desc">Автомобиль может иметь множество характеристик, характеристика — несколько авто.</div>
                </div>
            </div>
        </section>

        <footer className="footer">
            <div className="footer-logo">ByCar</div>
            <div className="footer-copy">© 2024 ByCar — платформа для продажи автомобилей</div>
        </footer>
    </>
);

function App() {
    return (
        <Router>
            <style>{styles}</style>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<div className="page-wrap"><AdvertisementSearch /></div>} />
                <Route path="/advertisements" element={<div className="page-wrap"><AdvertisementList /></div>} />
                <Route path="/advertisements/create" element={<div className="page-wrap"><AdvertisementForm /></div>} />
                <Route path="/advertisements/edit/:id" element={<div className="page-wrap"><AdvertisementForm /></div>} />
                <Route path="/advertisements/:id" element={<div className="page-wrap"><AdvertisementDetails /></div>} />
                <Route path="/brands" element={<div className="page-wrap"><BrandManagement /></div>} />
                <Route path="/features" element={<div className="page-wrap"><FeatureManagement /></div>} />
            </Routes>
        </Router>
    );
}

export default App;