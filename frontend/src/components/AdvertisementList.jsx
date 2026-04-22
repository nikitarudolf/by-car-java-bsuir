import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import advertisementService from '../api/advertisementService';
import { theme } from '../theme';

const AdvertisementList = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);
      const data = await advertisementService.getAll();
      setAdvertisements(data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки объявлений: ' + err.message);
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

  if (loading) return (
    <>
      <style>{theme}</style>
      <div className="dark-spinner">
        <div className="spinner-ring" />
        <span className="spinner-text">Загрузка объявлений...</span>
      </div>
    </>
  );

  return (
    <>
      <style>{theme}</style>

      <div className="page-header fade-in">
        <h1 className="page-title">Объяв<span>ления</span></h1>
        <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
          + Создать
        </button>
      </div>

      {error && (
        <div className="dark-alert dark-alert-danger">
          {error}
          <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {advertisements.length === 0 ? (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">🚗</div>
          <div className="empty-state-text">Нет объявлений</div>
          <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
            Создать первое
          </button>
        </div>
      ) : (
        <div className="ads-grid fade-in">
          {advertisements.map(ad => {
            const car = ad.car || {};
            const model = car.model || {};
            const brand = model.brand || {};
            const features = car.features || [];

            return (
              <div
                key={ad.id}
                className="ad-card"
                onClick={() => navigate(`/advertisements/${ad.id}`)}
              >
                <div className="ad-card-body">
                  <div className="ad-card-title">{brand.name} {model.name}</div>
                  <div className="ad-card-sub">{car.year} · {car.mileage?.toLocaleString()} км</div>
                  <div className="ad-card-desc">{ad.description}</div>

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

                  <div className="ad-card-price">${ad.price?.toLocaleString()}</div>
                </div>
                <div className="ad-card-footer">
                  <span className="ad-card-seller">{ad.sellerName}</span>
                  <div className="ad-card-actions" onClick={e => e.stopPropagation()}>
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
      )}
    </>
  );
};

export default AdvertisementList;
