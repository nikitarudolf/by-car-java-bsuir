import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import BrandManagement from './components/BrandManagement';
import FeatureManagement from './components/FeatureManagement';
import AdvertisementList from './components/AdvertisementList';
import AdvertisementForm from './components/AdvertisementForm';
import AdvertisementDetails from './components/AdvertisementDetails';
import AdvertisementSearch from './components/AdvertisementSearch';
import Login from './components/Login';
import Profile from './components/Profile';
import Favorites from './components/Favorites';
import MyAds from './components/MyAds';

function NavBar() {
    const location = useLocation();
    const { currentUser, logout } = useAuth();

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
                {currentUser && (
                    <>
                        <Link
                            to="/my-ads"
                            className={`nav-link${location.pathname === '/my-ads' ? ' active' : ''}`}
                        >Мои объявления</Link>
                        <Link
                            to="/favorites"
                            className={`nav-link${location.pathname === '/favorites' ? ' active' : ''}`}
                        >Избранное</Link>
                    </>
                )}
            </div>
            {currentUser ? (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link to="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--bg)',
                        }}>
                            {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        {currentUser.name}
                    </Link>
                    <Link to="/advertisements/create" className="nav-cta">+ Подать объявление</Link>
                </div>
            ) : (
                <Link to="/login" className="nav-cta" style={{ marginLeft: 'auto' }}>Войти</Link>
            )}
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

        <section className="cta-section">
            <div className="cta-box">
                <div className="cta-content">
                    <h2 className="cta-title">Готовы найти свой автомобиль?</h2>
                    <p className="cta-subtitle">
                        Присоединяйтесь к тысячам пользователей, которые уже нашли свой идеальный автомобиль на нашей платформе.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/search" className="btn-primary-custom">
                            Начать поиск
                        </Link>
                        <Link to="/advertisements/create" className="btn-secondary-custom">
                            Разместить объявление
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <footer className="footer">
            <div className="footer-logo">ByCar</div>
            <div className="footer-copy">© 2026 ByCar — платформа для продажи автомобилей</div>
        </footer>
    </>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<div className="page-wrap"><Login /></div>} />
                    <Route path="/profile" element={<div className="page-wrap"><Profile /></div>} />
                    <Route path="/favorites" element={<div className="page-wrap"><Favorites /></div>} />
                    <Route path="/my-ads" element={<div className="page-wrap"><MyAds /></div>} />
                    <Route path="/search" element={<div className="page-wrap"><AdvertisementSearch /></div>} />
                    <Route path="/advertisements" element={<div className="page-wrap"><AdvertisementList /></div>} />
                    <Route path="/advertisements/create" element={<div className="page-wrap"><AdvertisementForm /></div>} />
                    <Route path="/advertisements/edit/:id" element={<div className="page-wrap"><AdvertisementForm /></div>} />
                    <Route path="/advertisements/:id" element={<div className="page-wrap"><AdvertisementDetails /></div>} />
                    <Route path="/brands" element={<div className="page-wrap"><BrandManagement /></div>} />
                    <Route path="/features" element={<div className="page-wrap"><FeatureManagement /></div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;