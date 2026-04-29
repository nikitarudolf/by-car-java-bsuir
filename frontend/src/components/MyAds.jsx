import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import advertisementService from '../api/advertisementService';
import { theme } from '../theme';

const MyAds = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      loadMyAds();
    }
  }, [isAuthenticated, navigate, currentUser]);

  const loadMyAds = async () => {
    try {
      setLoading(true);
      const data = await advertisementService.getByUserId(currentUser.id);
      setAdvertisements(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить это объявление?')) return;
    try {
      await advertisementService.delete(id);
      setAdvertisements(prev => prev.filter(ad => ad.id !== id));
    } catch (err) {
      setError('Ошибка удаления: ' + err.message);
    }
  };

  const safeAdvertisements = Array.isArray(advertisements) ? advertisements : [];
  const filteredAds = statusFilter === 'ALL'
    ? safeAdvertisements
    : safeAdvertisements.filter(ad => ad.status === statusFilter);

  if (loading) {
    return (
      <>
        <style>{theme}</style>
        <div className="dark-spinner">
          <div className="spinner-ring" />
          <span className="spinner-text">Загрузка...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{theme}</style>

      <div className="page-header fade-in">
        <h1 className="page-title">Мои объявления<span> ({safeAdvertisements.length})</span></h1>
        <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
          + Создать объявление
        </button>
      </div>

      {error && (
        <div className="dark-alert dark-alert-danger fade-in">
          {error}
          <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="fade-in" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['ALL', 'ACTIVE', 'PENDING', 'SOLD'].map(status => (
            <button
              key={status}
              className={statusFilter === status ? 'btn-accent' : 'btn-ghost'}
              style={{ padding: '6px 16px', fontSize: 13 }}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'ALL' ? 'Все' : status}
            </button>
          ))}
        </div>
      </div>

      {filteredAds.length === 0 ? (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-text">
            {statusFilter === 'ALL'
              ? 'У вас пока нет объявлений'
              : `Нет объявлений со статусом ${statusFilter}`}
          </div>
          <button className="btn-accent" onClick={() => navigate('/advertisements/create')}>
            Создать объявление
          </button>
        </div>
      ) : (
        <div className="ads-grid fade-in">
          {filteredAds.map(ad => {
            const car = ad.car || {};
            const model = car.model || {};
            const brand = model.brand || {};
            const features = car.features || [];

            return (
              <div key={ad.id} className="ad-card">
                <div className="ad-card-body" onClick={() => navigate(`/advertisements/${ad.id}`)}>
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
                  <span className={`badge-${ad.status === 'ACTIVE' ? 'success' : ad.status === 'PENDING' ? 'warning' : 'muted'}`}>
                    {ad.status}
                  </span>
                  <div className="ad-card-actions">
                    <button
                      className="btn-ghost"
                      style={{ padding: '5px 12px', fontSize: 12 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/advertisements/edit/${ad.id}`);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      className="btn-danger-ghost"
                      style={{ padding: '5px 12px', fontSize: 12 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ad.id);
                      }}
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

export default MyAds;
