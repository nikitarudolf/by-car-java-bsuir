import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import advertisementService from '../api/advertisementService';
import brandService from '../api/brandService';
import modelService from '../api/modelService';
import featureService from '../api/featureService';
import userService from '../api/userService';
import axiosInstance from '../api/axiosConfig';
import { theme } from '../theme';

const AdvertisementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [features, setFeatures] = useState([]);

  const [formData, setFormData] = useState({
    userId: 1, brandId: '', modelId: '',
    year: new Date().getFullYear(), mileage: 0, vin: '',
    title: '', description: '', price: 0,
    city: '', region: '', contactName: '',
    showPhone: true, negotiable: false, exchangePossible: false,
    featureIds: [],
  });

  useEffect(() => { loadDictionaries(); if (isEditMode) loadAdvertisement(); }, [id]);

  useEffect(() => {
    if (formData.brandId) {
      setModels(allModels.filter(m => m.brand && m.brand.id === parseInt(formData.brandId)));
    } else {
      setModels([]);
    }
  }, [formData.brandId, allModels]);

  const loadDictionaries = async () => {
    try {
      setLoading(true);
      const [brandsData, modelsData, featuresData] = await Promise.all([
        brandService.getAll(), modelService.getAll(), featureService.getAll(),
      ]);
      setBrands(brandsData); setAllModels(modelsData); setFeatures(featuresData);
    } catch (err) { setError('Ошибка загрузки: ' + err.message); }
    finally { setLoading(false); }
  };

  const loadAdvertisement = async () => {
    try {
      setLoading(true);
      const ad = await advertisementService.getById(id);
      setFormData({
        userId: 1,
        brandId: (ad.car?.model?.brand?.id || '').toString(),
        modelId: (ad.car?.model?.id || '').toString(),
        year: ad.car?.year || new Date().getFullYear(),
        mileage: ad.car?.mileage || 0,
        vin: ad.car?.vin || '',
        title: ad.title || '', description: ad.description || '',
        price: ad.price || 0,
        featureIds: ad.car?.features?.map(f => f.id) || [],
        city: '', region: '', contactName: '',
        showPhone: true, negotiable: false, exchangePossible: false,
      });
    } catch (err) { setError('Ошибка загрузки: ' + err.message); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheck = (name) => (e) => setFormData(prev => ({ ...prev, [name]: e.target.checked }));

  const handleFeatureToggle = (fid) => {
    setFormData(prev => ({
      ...prev,
      featureIds: prev.featureIds.includes(fid) ? prev.featureIds.filter(i => i !== fid) : [...prev.featureIds, fid],
    }));
  };

  const uploadPhotos = async (adId) => {
    setUploadingPhotos(true);
    try {
      for (const file of selectedPhotos) {
        const reader = new FileReader();
        await new Promise((res, rej) => {
          reader.onload = async () => {
            try {
              const base64 = reader.result.split(',')[1];
              await axiosInstance.post(`/photos/advertisement/${adId}`, {
                url: `data:${file.type};base64,${base64}`,
                orderIndex: 0, isMain: selectedPhotos.indexOf(file) === 0,
              });
              res();
            } catch (err) { rej(err); }
          };
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      }
    } finally { setUploadingPhotos(false); }
  };

  const validate = () => {
    if (!formData.brandId) { setError('Выберите бренд'); return false; }
    if (!formData.modelId) { setError('Выберите модель'); return false; }
    if (!formData.vin || formData.vin.length !== 17) { setError('VIN — ровно 17 символов'); return false; }
    if (formData.year < 1900 || formData.year > 2026) { setError('Год: 1900–2026'); return false; }
    if (formData.mileage < 0) { setError('Пробег не может быть отрицательным'); return false; }
    if (!formData.title || formData.title.length < 5) { setError('Заголовок — минимум 5 символов'); return false; }
    if (!formData.description || formData.description.length < 10) { setError('Описание — минимум 10 символов'); return false; }
    if (formData.price <= 0) { setError('Цена должна быть больше нуля'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true); setError(null);
      const payload = {
        userId: formData.userId,
        modelId: parseInt(formData.modelId),
        year: parseInt(formData.year), mileage: parseInt(formData.mileage),
        vin: formData.vin, title: formData.title,
        description: formData.description, price: parseFloat(formData.price),
        city: formData.city || null, region: formData.region || null,
        contactName: formData.contactName || null,
        showPhone: formData.showPhone, negotiable: formData.negotiable,
        exchangePossible: formData.exchangePossible, featureIds: formData.featureIds,
      };
      if (isEditMode) {
        await advertisementService.update(id, { title: payload.title, description: payload.description, price: payload.price });
        setSuccess('Объявление обновлено');
      } else {
        const created = await advertisementService.create(payload);
        setSuccess(selectedPhotos.length > 0 ? 'Загружаем фото...' : 'Объявление создано');
        if (selectedPhotos.length > 0) { await uploadPhotos(created.id); setSuccess('Объявление и фото загружены'); }
      }
      setTimeout(() => navigate('/advertisements'), 1500);
    } catch (err) { setError('Ошибка сохранения: ' + err.message); }
    finally { setLoading(false); }
  };

  if (loading && isEditMode) return (
    <>
      <style>{theme}</style>
      <div className="dark-spinner"><div className="spinner-ring" /><span className="spinner-text">Загрузка...</span></div>
    </>
  );

  return (
    <>
      <style>{theme}</style>

      <div style={{ marginBottom: 28 }}>
        <button className="btn-back" onClick={() => navigate('/advertisements')}>← Назад к объявлениям</button>
      </div>

      <div className="page-header fade-in">
        <h1 className="page-title">{isEditMode ? 'Редактировать' : 'Создать'} <span>объявление</span></h1>
      </div>

      {error && <div className="dark-alert dark-alert-danger">{error}<button className="dark-alert-close" onClick={() => setError(null)}>✕</button></div>}
      {success && <div className="dark-alert dark-alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="fade-in">
        {/* Car block */}
        <div className="dark-card" style={{ marginBottom: 16 }}>
          <div className="dark-card-header"><h5>Автомобиль</h5></div>
          <div className="dark-card-body">
            <div className="two-col">
              <div className="dark-form-group">
                <label className="dark-label">Бренд *</label>
                <select name="brandId" value={formData.brandId} onChange={handleChange} className="dark-select" disabled={isEditMode} required>
                  <option value="">Выберите бренд</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="dark-form-group">
                <label className="dark-label">Модель *</label>
                <select name="modelId" value={formData.modelId} onChange={handleChange} className="dark-select" disabled={!formData.brandId || isEditMode} required>
                  <option value="">Выберите модель</option>
                  {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            </div>
            <div className="three-col">
              <div className="dark-form-group">
                <label className="dark-label">Год *</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} className="dark-input" min="1900" max="2026" disabled={isEditMode} required />
              </div>
              <div className="dark-form-group">
                <label className="dark-label">Пробег (км) *</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="dark-input" min="0" disabled={isEditMode} required />
              </div>
              <div className="dark-form-group">
                <label className="dark-label">VIN * <span style={{ color: 'var(--muted2)', fontWeight: 400 }}>(17 симв.)</span></label>
                <input type="text" name="vin" value={formData.vin} onChange={handleChange} className="dark-input" maxLength="17" placeholder="1HGBH41JXMN109186" disabled={isEditMode} required />
              </div>
            </div>
          </div>
        </div>

        {/* Features block */}
        {!isEditMode && (
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header">
              <h5>Характеристики</h5>
              <span className="badge-muted">Выбрано: {formData.featureIds.length}</span>
            </div>
            <div className="dark-card-body">
              <div className="feature-chips">
                {features.map(f => (
                  <span
                    key={f.id}
                    className={`feature-chip${formData.featureIds.includes(f.id) ? ' selected' : ''}`}
                    onClick={() => handleFeatureToggle(f.id)}
                  >
                    {f.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Details block */}
        <div className="dark-card" style={{ marginBottom: 16 }}>
          <div className="dark-card-header"><h5>Детали объявления</h5></div>
          <div className="dark-card-body">
            <div className="dark-form-group">
              <label className="dark-label">Заголовок *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="dark-input" placeholder="Краткое название (мин. 5 символов)" maxLength="200" required />
            </div>
            <div className="dark-form-group">
              <label className="dark-label">Описание *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="dark-textarea" rows={4} placeholder="Опишите автомобиль (мин. 10 символов)" required style={{ resize: 'vertical' }} />
            </div>
            <div className="two-col">
              <div className="dark-form-group">
                <label className="dark-label">Цена (USD) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="dark-input" min="1" step="0.01" required />
              </div>
              <div className="dark-form-group">
                <label className="dark-label">Контактное имя</label>
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="dark-input" placeholder="Имя продавца" maxLength="100" />
              </div>
            </div>
            <div className="two-col">
              <div className="dark-form-group">
                <label className="dark-label">Город</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="dark-input" placeholder="Например: Минск" maxLength="100" />
              </div>
              <div className="dark-form-group">
                <label className="dark-label">Регион</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} className="dark-input" placeholder="Минская область" maxLength="100" />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 4 }}>
              {[
                { name: 'showPhone', label: 'Показывать телефон' },
                { name: 'negotiable', label: 'Торг возможен' },
                { name: 'exchangePossible', label: 'Возможен обмен' },
              ].map(ch => (
                <label key={ch.name} className="dark-check">
                  <input type="checkbox" checked={formData[ch.name]} onChange={handleCheck(ch.name)} />
                  <span>{ch.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Photos block */}
        {!isEditMode && (
          <div className="dark-card" style={{ marginBottom: 24 }}>
            <div className="dark-card-header"><h5>Фотографии</h5></div>
            <div className="dark-card-body">
              <div className="dark-form-group" style={{ marginBottom: 0 }}>
                <label className="dark-label">Загрузить фото</label>
                <input type="file" multiple accept="image/*" onChange={(e) => setSelectedPhotos(Array.from(e.target.files))} className="dark-input" style={{ cursor: 'pointer' }} />
                <p className="dark-form-hint">До 10 фотографий. Первая станет главной.</p>
                {selectedPhotos.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <span className="badge-success">Выбрано: {selectedPhotos.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn-accent" disabled={loading}>
            {loading ? 'Сохранение...' : isEditMode ? 'Обновить' : 'Создать объявление'}
          </button>
          <button type="button" className="btn-ghost" onClick={() => navigate('/advertisements')}>
            Отмена
          </button>
        </div>
      </form>
    </>
  );
};

export default AdvertisementForm;
