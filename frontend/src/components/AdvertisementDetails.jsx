import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import advertisementService from '../api/advertisementService';
import photoService from '../api/photoService';
import { theme } from '../theme';

const AdvertisementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { loadAdvertisement(); loadPhotos(); }, [id]);

  const loadAdvertisement = async () => {
    try {
      setLoading(true);
      const data = await advertisementService.getById(id);
      setAdvertisement(data);
      setError(null);
    } catch (err) { setError('Ошибка загрузки: ' + err.message); }
    finally { setLoading(false); }
  };

  const loadPhotos = async () => {
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

  if (loading) return (
    <>
      <style>{theme}</style>
      <div className="dark-spinner"><div className="spinner-ring" /><span className="spinner-text">Загрузка...</span></div>
    </>
  );

  if (error) return (
    <>
      <style>{theme}</style>
      <div className="dark-alert dark-alert-danger">{error}</div>
      <button className="btn-ghost" onClick={() => navigate('/advertisements')}>← Назад</button>
    </>
  );

  if (!advertisement) return (
    <>
      <style>{theme}</style>
      <div className="dark-alert dark-alert-info">Объявление не найдено</div>
      <button className="btn-ghost" onClick={() => navigate('/advertisements')}>← Назад</button>
    </>
  );

  const car = advertisement.car || {};
  const model = car.model || {};
  const brand = model.brand || {};
  const features = car.features || [];

  const specs = [
    { label: 'Бренд', value: brand.name },
    { label: 'Модель', value: model.name },
    { label: 'Год выпуска', value: car.year },
    { label: 'Пробег', value: car.mileage ? `${car.mileage.toLocaleString()} км` : null },
    { label: 'VIN', value: car.vin ? <span className="vin-code">{car.vin}</span> : null },
    { label: 'Тип двигателя', value: car.engineType },
    { label: 'Объём', value: car.engineVolume ? `${car.engineVolume} л` : null },
    { label: 'КПП', value: car.transmissionType },
    { label: 'Кузов', value: car.bodyType },
    { label: 'Цвет', value: car.color },
  ].filter(s => s.value);

  return (
    <>
      <style>{theme}</style>

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
            <button className="btn-accent" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>
              Связаться с продавцом
            </button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              В избранное ♡
            </button>
          </div>

          {/* Seller */}
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header"><h5>Продавец</h5></div>
            <div className="dark-card-body">
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{advertisement.sellerName}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{advertisement.sellerPhone}</div>
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
    </>
  );
};

export default AdvertisementDetails;
