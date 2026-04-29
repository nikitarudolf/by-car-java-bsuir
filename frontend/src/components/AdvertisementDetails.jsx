import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import advertisementService from '../api/advertisementService';
import photoService from '../api/photoService';
import favoriteService from '../api/favoriteService';
import { theme } from '../theme';

const AdvertisementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [advertisement, setAdvertisement] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadAdvertisement();
      loadPhotos();
      if (currentUser) {
        checkFavorite();
      }
    }
  }, [id, currentUser]);

  const checkFavorite = async () => {
    if (!currentUser || !id) return;
    try {
      const result = await favoriteService.isFavorite(currentUser.id, id);
      setIsFavorite(result);
    } catch (err) {
      console.error('Failed to check favorite:', err);
    }
  };

  const loadAdvertisement = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await advertisementService.getById(id);
      setAdvertisement(data);
      setError(null);
    } catch (err) { setError('Ошибка загрузки: ' + err.message); }
    finally { setLoading(false); }
  };

  const loadPhotos = async () => {
    if (!id) return;
    try {
      const data = await photoService.getByAdvertisement(id);
      setPhotos(data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить это объявление?')) return;
    try {
      await advertisementService.delete(id);
      navigate('/advertisements');
    } catch (err) { setError('Ошибка удаления: ' + err.message); }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await favoriteService.removeFromFavorites(currentUser.id, id);
        setIsFavorite(false);
      } else {
        await favoriteService.addToFavorites(currentUser.id, id);
        setIsFavorite(true);
      }
    } catch (err) {
      setError('Ошибка: ' + err.message);
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) return (
    <>
      <div className="dark-spinner"><div className="spinner-ring" /><span className="spinner-text">Загрузка...</span></div>
    </>
  );

  if (error) return (
    <>
      <div className="dark-alert dark-alert-danger">{error}</div>
      <button className="btn-ghost" onClick={() => navigate('/advertisements')}>← Назад</button>
    </>
  );

  if (!advertisement) return (
    <>
      <div className="dark-alert dark-alert-info">Объявление не найдено</div>
      <button className="btn-ghost" onClick={() => navigate('/advertisements')}>← Назад</button>
    </>
  );

  const car = advertisement.car || {};
  const model = car.model || {};
  const brand = model.brand || {};
  const features = car.features || [];

  const translateEngineType = (type) => {
    const map = { PETROL: 'Бензин', DIESEL: 'Дизель', HYBRID: 'Гибрид', ELECTRIC: 'Электро' };
    return map[type] || type;
  };

  const translateTransmission = (type) => {
    const map = { AUTOMATIC: 'Автомат', MANUAL: 'Механика', ROBOT: 'Робот', VARIATOR: 'Вариатор' };
    return map[type] || type;
  };

  const translateDriveType = (type) => {
    const map = { FRONT: 'Передний', REAR: 'Задний', ALL: 'Полный' };
    return map[type] || type;
  };

  const translateBodyType = (type) => {
    const map = {
      SEDAN: 'Седан', HATCHBACK: 'Хэтчбек', SUV: 'Внедорожник',
      COUPE: 'Купе', WAGON: 'Универсал', MINIVAN: 'Минивэн', PICKUP: 'Пикап'
    };
    return map[type] || type;
  };

  const translateCondition = (cond) => {
    const map = { NEW: 'Новый', USED: 'Б/У' };
    return map[cond] || cond;
  };

  const specs = [
    { label: 'Бренд', value: brand.name },
    { label: 'Модель', value: model.name },
    { label: 'Год выпуска', value: car.year },
    { label: 'Пробег', value: car.mileage ? `${car.mileage.toLocaleString()} км` : null },
    { label: 'VIN', value: car.vin ? <span className="vin-code">{car.vin}</span> : null },
    { label: 'Состояние', value: car.condition ? translateCondition(car.condition) : null },
    { label: 'Тип двигателя', value: car.engineType ? translateEngineType(car.engineType) : null },
    { label: 'Объём двигателя', value: car.engineVolume ? `${car.engineVolume} л` : null },
    { label: 'Мощность', value: car.enginePower ? `${car.enginePower} л.с.` : null },
    { label: 'Расход топлива', value: car.fuelConsumption ? `${car.fuelConsumption} л/100км` : null },
    { label: 'КПП', value: car.transmissionType ? translateTransmission(car.transmissionType) : null },
    { label: 'Привод', value: car.driveType ? translateDriveType(car.driveType) : null },
    { label: 'Кузов', value: car.bodyType ? translateBodyType(car.bodyType) : null },
    { label: 'Цвет', value: car.color },
    { label: 'Количество дверей', value: car.doorsCount },
    { label: 'Растаможен', value: car.isCustomsCleared ? 'Да' : car.isCustomsCleared === false ? 'Нет' : null },
  ].filter(s => s.value);

  return (
    <>

      <div style={{ marginBottom: 28 }} className="fade-in">
        <button className="btn-back" onClick={() => navigate('/advertisements')}>
          ← Назад к списку
        </button>
      </div>

      <div className="page-header fade-in">
        <h1 className="page-title">{brand.name} {model.name} <span>{car.year}</span></h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-ghost" onClick={() => navigate(`/advertisements/edit/${id}`)}>
            Редактировать
          </button>
          <button className="btn-danger-ghost" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>

      {error && <div className="dark-alert dark-alert-danger">{error}<button className="dark-alert-close" onClick={() => setError(null)}>✕</button></div>}

      <div className="details-grid fade-in">
        {/* Left column */}
        <div>
          {/* Photos */}
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header">
              <h5>Фотографии</h5>
              <span className="badge-muted">{photos.length} фото</span>
            </div>
            <div className="dark-card-body">
              {photos.length > 0 ? (
                <div className="photo-grid">
                  {photos.sort((a, b) => a.orderIndex - b.orderIndex).map(photo => (
                    <div key={photo.id} className="photo-item">
                      <img src={photo.url} alt="" />
                      {photo.isMain && <span className="photo-main-badge">Главное</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="photo-empty">Нет фотографий</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header"><h5>Описание</h5></div>
            <div className="dark-card-body">
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0, fontSize: 14 }}>
                {advertisement.description}
              </p>
            </div>
          </div>

          {/* Specs */}
          <div className="dark-card">
            <div className="dark-card-header"><h5>Технические характеристики</h5></div>
            <div className="dark-card-body">
              <table className="spec-table">
                <tbody>
                  {specs.map(s => (
                    <tr key={s.label}>
                      <td>{s.label}</td>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          {/* Price */}
          <div className="price-block">
            <div className="price-big">${advertisement.price?.toLocaleString()}</div>
            <button
              className="btn-accent"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}
              onClick={() => setShowContactModal(true)}
            >
              Связаться с продавцом
            </button>
            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? 'Загрузка...' : (isFavorite ? '❤️ В избранном' : '♡ В избранное')}
            </button>
          </div>

          {/* Seller */}
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header"><h5>Продавец</h5></div>
            <div className="dark-card-body">
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{advertisement.sellerName}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {showContactModal ? advertisement.sellerPhone : 'Нажмите "Связаться" чтобы увидеть телефон'}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header">
              <h5>Характеристики</h5>
              <span className="badge-muted">{features.length}</span>
            </div>
            <div className="dark-card-body">
              {features.length > 0 ? (
                <div className="feature-chips">
                  {features.map(f => <span key={f.id} className="feature-chip selected">{f.name}</span>)}
                </div>
              ) : (
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>Не указаны</span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="dark-card">
            <div className="dark-card-header"><h5>Статистика</h5></div>
            <div className="dark-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>Просмотров</span>
                  <span>{advertisement.viewsCount || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>Статус</span>
                  <span className="badge-success">{advertisement.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>Создано</span>
                  <span>{new Date(advertisement.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="dark-card"
            style={{ maxWidth: 400, width: '90%', margin: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dark-card-header">
              <h5>Контакты продавца</h5>
              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>
            <div className="dark-card-body">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Имя</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{advertisement.sellerName}</div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>Телефон</div>
                <a
                  href={`tel:${advertisement.sellerPhone}`}
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                  }}
                >
                  {advertisement.sellerPhone}
                </a>
              </div>
              <button
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => window.location.href = `tel:${advertisement.sellerPhone}`}
              >
                📞 Позвонить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertisementDetails;
