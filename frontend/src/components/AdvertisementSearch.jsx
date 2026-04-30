import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import advertisementService from '../api/advertisementService';
import brandService from '../api/brandService';
import favoriteService from '../api/favoriteService';
import { theme } from '../theme';

const AdvertisementSearch = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({ brand: '', maxPrice: '', minPrice: '', minYear: '', maxYear: '' });
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => { loadBrands(); }, []);
  useEffect(() => { searchAdvertisements(); }, [page]);
  useEffect(() => { if (currentUser) loadFavorites(); }, [currentUser, advertisements]);

  const loadFavorites = async () => {
    if (!currentUser) return;
    try {
      const userFavorites = await favoriteService.getUserFavorites(currentUser.id);
      const favIds = new Set(userFavorites.map(f => f.advertisement.id));
      setFavorites(favIds);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const loadBrands = async () => {
    try {
      const data = await brandService.getAll();
      setBrands(data);
    } catch (err) { console.error(err); }
  };

  const searchAdvertisements = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, size, sort: 'price,asc' };
      if (filters.brand) params.brand = filters.brand;
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.minYear) params.minYear = parseInt(filters.minYear);
      if (filters.maxYear) params.maxYear = parseInt(filters.maxYear);
      const response = await advertisementService.search(params);
      if (response.content) {
        setAdvertisements(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } else {
        setAdvertisements(Array.isArray(response) ? response : []);
        setTotalPages(1);
        setTotalElements(Array.isArray(response) ? response.length : 0);
      }
    } catch (err) {
      setError('Ошибка поиска: ' + err.message);
      setAdvertisements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => { setPage(0); searchAdvertisements(); };

  const handleClear = () => {
    setFilters({ brand: '', maxPrice: '', minPrice: '', minYear: '', maxYear: '' });
    setPage(0);
    setTimeout(() => searchAdvertisements(), 100);
  };

  const handleFavoriteToggle = async (e, adId) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (favorites.has(adId)) {
        await favoriteService.removeFromFavorites(currentUser.id, adId);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(adId);
          return newSet;
        });
      } else {
        await favoriteService.addToFavorites(currentUser.id, adId);
        setFavorites(prev => new Set(prev).add(adId));
      }
    } catch (err) {
      setError('Ошибка: ' + err.message);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const maxV = 5;
    let start = Math.max(0, page - Math.floor(maxV / 2));
    let end = Math.min(totalPages - 1, start + maxV - 1);
    if (end - start < maxV - 1) start = Math.max(0, end - maxV + 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
      <div className="dark-pagination">
        <button className="dark-page-btn" onClick={() => setPage(0)} disabled={page === 0}>«</button>
        <button className="dark-page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>‹</button>
        {pages.map(i => (
          <button key={i} className={`dark-page-btn${i === page ? ' active' : ''}`} onClick={() => { setPage(i); window.scrollTo(0, 0); }}>
            {i + 1}
          </button>
        ))}
        <button className="dark-page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1}>›</button>
        <button className="dark-page-btn" onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>»</button>
      </div>
    );
  };

  return (
    <>
      <style>{theme}</style>

      <div className="page-header fade-in">
        <h1 className="page-title">Поиск<span> авто</span></h1>
        <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
          + Разместить
        </button>
      </div>

      <div className="search-layout">
        {/* Sidebar */}
        <div className="filter-sidebar fade-in">
          <div className="filter-title">Фильтры</div>

          <div className="filter-group">
            <label className="dark-label">Бренд</label>
            <select name="brand" value={filters.brand} onChange={handleFilterChange} className="dark-select">
              <option value="">Все бренды</option>
              {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="dark-label">Цена (USD)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="number" name="minPrice" placeholder="От" value={filters.minPrice} onChange={handleFilterChange} className="dark-input" min="0" />
              <input type="number" name="maxPrice" placeholder="До" value={filters.maxPrice} onChange={handleFilterChange} className="dark-input" min="0" />
            </div>
          </div>

          <div className="filter-group">
            <label className="dark-label">Год выпуска</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="number" name="minYear" placeholder="От" value={filters.minYear} onChange={handleFilterChange} className="dark-input" min="1900" max="2026" />
              <input type="number" name="maxYear" placeholder="До" value={filters.maxYear} onChange={handleFilterChange} className="dark-input" min="1900" max="2026" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-accent" onClick={handleSearch} style={{ width: '100%', justifyContent: 'center' }}>
              Применить
            </button>
            <button className="btn-ghost" onClick={handleClear} style={{ width: '100%', justifyContent: 'center' }}>
              Сбросить
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="results-header fade-in">
            <div className="results-count">
              <strong>{totalElements}</strong> {' '}
              {totalElements === 1 ? 'объявление' : 'объявлений'}
              {totalPages > 0 && <span style={{ marginLeft: 8, fontSize: 12 }}>· стр. {page + 1} из {totalPages}</span>}
            </div>
          </div>

          {error && (
            <div className="dark-alert dark-alert-danger">
              {error}
              <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
            </div>
          )}

          {loading && (
            <div className="dark-spinner">
              <div className="spinner-ring" />
              <span className="spinner-text">Поиск...</span>
            </div>
          )}

          {!loading && advertisements.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <div className="empty-state-text">Ничего не найдено. Попробуйте изменить фильтры.</div>
              <button className="btn-ghost" onClick={handleClear}>Сбросить фильтры</button>
            </div>
          )}

          {!loading && advertisements.length > 0 && (
            <>
              <div className="vehicle-grid fade-in">
                {advertisements.map(ad => {
                  const car = ad.car || {};
                  const model = car.model || {};
                  const brand = model.brand || {};
                  const features = car.features || [];

                  return (
                    <div key={ad.id} className="vehicle-card">
                      <div className="vehicle-card-body" onClick={() => navigate(`/advertisements/${ad.id}`)}>
                        <div className="vehicle-card-title">{brand.name} {model.name}</div>
                        <div className="vehicle-card-sub">{car.year} · {car.mileage?.toLocaleString()} км</div>
                        <div className="vehicle-card-desc">{ad.description}</div>
                        {features.length > 0 && (
                          <div className="feature-chips" style={{ marginBottom: 12 }}>
                            {features.slice(0, 2).map(f => <span key={f.id} className="feature-chip">{f.name}</span>)}
                            {features.length > 2 && <span className="feature-chip">+{features.length - 2}</span>}
                          </div>
                        )}
                        <div className="vehicle-card-price">${ad.price?.toLocaleString()}</div>
                      </div>
                      <div className="vehicle-card-footer">
                        <span className="vehicle-card-seller">{ad.sellerName}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="badge-success">{ad.status}</span>
                          <button
                            className="btn-ghost"
                            style={{ padding: '4px 8px', fontSize: 16, minWidth: 'auto' }}
                            onClick={(e) => handleFavoriteToggle(e, ad.id)}
                            title={favorites.has(ad.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                          >
                            {favorites.has(ad.id) ? '❤️' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvertisementSearch;
