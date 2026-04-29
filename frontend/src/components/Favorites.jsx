import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import favoriteService from '../api/favoriteService';
const Favorites = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (currentUser) {
      loadFavorites();
    }
  }, [isAuthenticated, navigate, currentUser]);

  const loadFavorites = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const data = await favoriteService.getUserFavorites(currentUser.id);
      setFavorites(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (advertisementId) => {
    try {
      await favoriteService.removeFromFavorites(currentUser.id, advertisementId);
      setFavorites(prev => (Array.isArray(prev) ? prev : []).filter(f => f.advertisement.id !== advertisementId));
    } catch (err) {
      setError('Ошибка удаления: ' + err.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className="dark-spinner">
          <div className="spinner-ring" />
          <span className="spinner-text">Загрузка...</span>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="page-header fade-in">
        <h1 className="page-title">Избранное<span> ({(Array.isArray(favorites) ? favorites : []).length})</span></h1>
      </div>

      {error && (
        <div className="dark-alert dark-alert-danger fade-in">
          {error}
          <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {(Array.isArray(favorites) ? favorites : []).length === 0 ? (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">❤️</div>
          <div className="empty-state-text">У вас пока нет избранных объявлений</div>
          <button className="btn-accent" onClick={() => navigate('/search')}>
            Найти автомобиль
          </button>
        </div>
      ) : (
        <div className="ads-grid">
          {(Array.isArray(favorites) ? favorites : []).map((favorite) => {
            const ad = favorite.advertisement;
            const car = ad.car;
            const model = car.model;
            const brand = model.brand;
            const features = car.features || [];

            return (
              <div key={favorite.id} className="ad-card">
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
                  <span className="ad-card-seller">{ad.sellerName}</span>
                  <button
                    className="btn-danger-ghost"
                    style={{ padding: '4px 12px', fontSize: 12 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(ad.id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Favorites;
