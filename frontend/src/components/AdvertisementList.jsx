import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import advertisementService from '../api/advertisementService';

const AdvertisementList = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    loadAdvertisements();
  }, [page]);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);
      const params = { page, size, sort: 'id,desc' };
      const response = await advertisementService.search(params);

      console.log('Response from API:', response);

      if (response.content) {
        setAdvertisements(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } else {
        setAdvertisements(Array.isArray(response) ? response : []);
      }
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Удалить это объявление?')) return;
    try {
      await advertisementService.delete(id);
      await loadAdvertisements();
    } catch (err) {
      setError('Ошибка удаления: ' + err.message);
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

  console.log('=== Render ===', 'ads:', advertisements.length, 'loading:', loading);

  if (loading) return (
    <>
      <div className="dark-spinner">
        <div className="spinner-ring" />
        <span className="spinner-text">Загрузка объявлений...</span>
      </div>
    </>
  );

  return (
    <>

      <div className="page-header fade-in">
        <h1 className="page-title">Объяв<span>ления</span></h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {totalElements > 0 && (
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>
              {totalElements} {totalElements === 1 ? 'объявление' : 'объявлений'}
            </span>
          )}
          <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
            + Создать
          </button>
        </div>
      </div>

      {error && (
        <div className="dark-alert dark-alert-danger">
          {error}
          <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {(Array.isArray(advertisements) ? advertisements : []).length === 0 ? (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">🚗</div>
          <div className="empty-state-text">Нет объявлений</div>
          <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
            Создать первое
          </button>
        </div>
      ) : (
        <>
          <div className="vehicle-grid">
            {(Array.isArray(advertisements) ? advertisements : []).map(ad => {
              const car = ad.car || {};
              const model = car.model || {};
              const brand = model.brand || {};
              const features = car.features || [];

              return (
                <div
                  key={ad.id}
                  className="vehicle-card"
                  onClick={() => navigate(`/advertisements/${ad.id}`)}
                >
                  <div className="vehicle-card-body">
                    <div className="vehicle-card-title">{brand.name} {model.name}</div>
                    <div className="vehicle-card-sub">{car.year} · {car.mileage?.toLocaleString()} км</div>
                    <div className="vehicle-card-desc">{ad.description}</div>

                    {features.length > 0 && (
                      <div className="feature-chips" style={{ marginBottom: 12 }}>
                        {features.slice(0, 3).map(f => (
                          <span key={f.id} className="feature-chip">{f.name}</span>
                        ))}
                        {features.length > 3 && (
                          <span className="feature-chip">+{features.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="vehicle-card-price">${ad.price?.toLocaleString()}</div>
                  </div>
                  <div className="vehicle-card-footer">
                    <span className="vehicle-card-seller">{ad.sellerName}</span>
                    <div className="vehicle-card-actions" onClick={e => e.stopPropagation()}>
                      <button
                        className="btn-ghost"
                        style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={() => navigate(`/advertisements/edit/${ad.id}`)}
                      >
                        Изменить
                      </button>
                      <button
                        className="btn-danger-ghost"
                        style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={(e) => handleDelete(ad.id, e)}
                      >
                        Удалить
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
    </>
  );
};

export default AdvertisementList;
