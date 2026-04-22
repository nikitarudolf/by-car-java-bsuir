import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import advertisementService from '../api/advertisementService';
import brandService from '../api/brandService';
import { theme } from '../theme';

const AdvertisementSearch = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ brand: '', maxPrice: '', minPrice: '', minYear: '', maxYear: '' });
  const [page, setPage] = useState(0);
  const [size] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { loadBrands(); }, []);
  useEffect(() => { searchAdvertisements(); }, [page]);

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
              <div className="ads-grid fade-in">
                {advertisements.map(ad => {
                  const car = ad.car || {};
                  const model = car.model || {};
                  const brand = model.brand || {};
                  const features = car.features || [];

                  return (
                    <div key={ad.id} className="ad-card" onClick={() => navigate(`/advertisements/${ad.id}`)}>
                      <div className="ad-card-body">
                        <div className="ad-card-title">{brand.name} {model.name}</div>
                        <div className="ad-card-sub">{car.year} · {car.mileage?.toLocaleString()} км</div>
                        <div className="ad-card-desc">{ad.description}</div>
                        {features.length > 0 && (
                          <div className="feature-chips" style={{ marginBottom: 12 }}>
                            {features.slice(0, 2).map(f => <span key={f.id} className="feature-chip">{f.name}</span>)}
                            {features.length > 2 && <span className="feature-chip">+{features.length - 2}</span>}
                          </div>
                        )}
                        <div className="ad-card-price">${ad.price?.toLocaleString()}</div>
                      </div>
                      <div className="ad-card-footer">
                        <span className="ad-card-seller">{ad.sellerName}</span>
                        <span className="badge-success">{ad.status}</span>
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
