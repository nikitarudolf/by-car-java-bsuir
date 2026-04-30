import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { currentUser, isAuthenticated } = useAuth();
  const isEditMode = !!id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [features, setFeatures] = useState([]);

  const [formData, setFormData] = useState({
    userId: currentUser?.id || null, brandId: '', modelId: '',
    year: new Date().getFullYear(), mileage: 0, vin: '',
    title: '', description: '', price: 0,
    city: '', region: '', contactName: '',
    showPhone: true, negotiable: false, exchangePossible: false,
    featureIds: [],
    // Car technical specifications
    engineType: '', engineVolume: '', enginePower: '',
    transmissionType: '', driveType: '', bodyType: '',
    color: '', doorsCount: '', fuelConsumption: '',
    condition: '', isCustomsCleared: false,
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
        userId: currentUser?.id || null,
        brandId: (ad.car?.model?.brand?.id || '').toString(),
        modelId: (ad.car?.model?.id || '').toString(),
        year: ad.car?.year || new Date().getFullYear(),
        mileage: ad.car?.mileage || 0,
        vin: ad.car?.vin || '',
        title: ad.title || '', description: ad.description || '',
        price: ad.price || 0,
        featureIds: ad.car?.features?.map(f => f.id) || [],
        city: ad.city || '', region: ad.region || '', contactName: ad.contactName || '',
        showPhone: ad.showPhone !== undefined ? ad.showPhone : true,
        negotiable: ad.negotiable || false,
        exchangePossible: ad.exchangePossible || false,
        // Car technical specifications
        engineType: ad.car?.engineType || '',
        engineVolume: ad.car?.engineVolume || '',
        enginePower: ad.car?.enginePower || '',
        transmissionType: ad.car?.transmissionType || '',
        driveType: ad.car?.driveType || '',
        bodyType: ad.car?.bodyType || '',
        color: ad.car?.color || '',
        doorsCount: ad.car?.doorsCount || '',
        fuelConsumption: ad.car?.fuelConsumption || '',
        condition: ad.car?.condition || '',
        isCustomsCleared: ad.car?.isCustomsCleared || false,
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

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError('Максимум 10 фотографий');
      return;
    }
    setSelectedPhotos(files);

    // Generate previews
    const previews = [];
    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previews.push({ id: idx, url: ev.target.result, file, isMain: idx === 0 });
        if (previews.length === files.length) {
          setPhotoPreviews(previews.sort((a, b) => a.id - b.id));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSetMainPhoto = (idx) => {
    setPhotoPreviews(prev => prev.map((p, i) => ({ ...p, isMain: i === idx })));
    const reordered = [...selectedPhotos];
    const [main] = reordered.splice(idx, 1);
    reordered.unshift(main);
    setSelectedPhotos(reordered);
  };

  const handleRemovePhoto = (idx) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== idx));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== idx).map((p, i) => ({ ...p, id: i, isMain: i === 0 })));
  };

  const uploadPhotos = async (adId) => {
    setUploadingPhotos(true);
    try {
      for (let i = 0; i < selectedPhotos.length; i++) {
        const file = selectedPhotos[i];
        const reader = new FileReader();
        await new Promise((res, rej) => {
          reader.onload = async () => {
            try {
              const base64 = reader.result.split(',')[1];
              await axiosInstance.post(`/photos/advertisement/${adId}`, {
                url: `data:${file.type};base64,${base64}`,
                orderIndex: i,
                isMain: i === 0,
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
        // Car technical specifications
        engineType: formData.engineType || null,
        engineVolume: formData.engineVolume ? parseFloat(formData.engineVolume) : null,
        enginePower: formData.enginePower ? parseInt(formData.enginePower) : null,
        transmissionType: formData.transmissionType || null,
        driveType: formData.driveType || null,
        bodyType: formData.bodyType || null,
        color: formData.color || null,
        doorsCount: formData.doorsCount ? parseInt(formData.doorsCount) : null,
        fuelConsumption: formData.fuelConsumption ? parseFloat(formData.fuelConsumption) : null,
        condition: formData.condition || null,
        isCustomsCleared: formData.isCustomsCleared || false,
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

        {/* Technical Specifications block */}
        {!isEditMode && (
          <div className="dark-card" style={{ marginBottom: 16 }}>
            <div className="dark-card-header"><h5>Технические характеристики</h5></div>
            <div className="dark-card-body">
              <div className="two-col">
                <div className="dark-form-group">
                  <label className="dark-label">Тип двигателя</label>
                  <select name="engineType" value={formData.engineType} onChange={handleChange} className="dark-select">
                    <option value="">Не указан</option>
                    <option value="PETROL">Бензин</option>
                    <option value="DIESEL">Дизель</option>
                    <option value="HYBRID">Гибрид</option>
                    <option value="ELECTRIC">Электро</option>
                  </select>
                </div>
                <div className="dark-form-group">
                  <label className="dark-label">Мощность (л.с.)</label>
                  <input type="number" name="enginePower" value={formData.enginePower} onChange={handleChange} className="dark-input" min="1" placeholder="150" />
                </div>
              </div>

              {formData.engineType === 'ELECTRIC' && (
                <div style={{ padding: '12px 16px', background: 'rgba(232,255,71,0.1)', borderRadius: 8, marginBottom: 16, fontSize: 13, color: 'var(--accent)' }}>
                  ⚡ Электромобиль — объем двигателя и расход топлива не требуются
                </div>
              )}

              {formData.engineType && formData.engineType !== 'ELECTRIC' && (
                <div className="two-col">
                  <div className="dark-form-group">
                    <label className="dark-label">Объем двигателя (л)</label>
                    <input type="number" name="engineVolume" value={formData.engineVolume} onChange={handleChange} className="dark-input" min="0" max="10" step="0.1" placeholder="2.0" />
                  </div>
                  <div className="dark-form-group">
                    <label className="dark-label">Расход топлива (л/100км)</label>
                    <input type="number" name="fuelConsumption" value={formData.fuelConsumption} onChange={handleChange} className="dark-input" min="0" step="0.1" placeholder="7.5" />
                  </div>
                </div>
              )}

              <div className="three-col">
                <div className="dark-form-group">
                  <label className="dark-label">Коробка передач</label>
                  <select name="transmissionType" value={formData.transmissionType} onChange={handleChange} className="dark-select">
                    <option value="">Не указана</option>
                    <option value="AUTOMATIC">Автомат</option>
                    <option value="MANUAL">Механика</option>
                    <option value="ROBOT">Робот</option>
                    <option value="VARIATOR">Вариатор</option>
                  </select>
                </div>
                <div className="dark-form-group">
                  <label className="dark-label">Привод</label>
                  <select name="driveType" value={formData.driveType} onChange={handleChange} className="dark-select">
                    <option value="">Не указан</option>
                    <option value="FRONT">Передний</option>
                    <option value="REAR">Задний</option>
                    <option value="ALL">Полный</option>
                  </select>
                </div>
                <div className="dark-form-group">
                  <label className="dark-label">Тип кузова</label>
                  <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="dark-select">
                    <option value="">Не указан</option>
                    <option value="SEDAN">Седан</option>
                    <option value="HATCHBACK">Хэтчбек</option>
                    <option value="SUV">Внедорожник</option>
                    <option value="COUPE">Купе</option>
                    <option value="WAGON">Универсал</option>
                    <option value="MINIVAN">Минивэн</option>
                    <option value="PICKUP">Пикап</option>
                  </select>
                </div>
              </div>

              <div className="three-col">
                <div className="dark-form-group">
                  <label className="dark-label">Цвет</label>
                  <input type="text" name="color" value={formData.color} onChange={handleChange} className="dark-input" maxLength="50" placeholder="Черный" />
                </div>
                <div className="dark-form-group">
                  <label className="dark-label">Количество дверей</label>
                  <select name="doorsCount" value={formData.doorsCount} onChange={handleChange} className="dark-select">
                    <option value="">Не указано</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="dark-form-group">
                  <label className="dark-label">Состояние</label>
                  <select name="condition" value={formData.condition} onChange={handleChange} className="dark-select">
                    <option value="">Не указано</option>
                    <option value="NEW">Новый</option>
                    <option value="USED">Б/У</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <label className="dark-check">
                  <input type="checkbox" name="isCustomsCleared" checked={formData.isCustomsCleared} onChange={handleCheck('isCustomsCleared')} />
                  <span>Растаможен</span>
                </label>
              </div>
            </div>
          </div>
        )}

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
            <div className="dark-card-header">
              <h5>Фотографии</h5>
              {selectedPhotos.length > 0 && <span className="badge-success">{selectedPhotos.length} фото</span>}
            </div>
            <div className="dark-card-body">
              <div className="dark-form-group">
                <label className="dark-label">Загрузить фото</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="dark-input"
                  style={{ cursor: 'pointer' }}
                />
                <p className="dark-form-hint">До 10 фотографий. Первая будет главной. Кликните на фото чтобы сделать его главным.</p>
              </div>

              {photoPreviews.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <div className="photo-grid">
                    {photoPreviews.map((preview, idx) => (
                      <div
                        key={preview.id}
                        className="photo-item"
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onClick={() => handleSetMainPhoto(idx)}
                      >
                        <img src={preview.url} alt={`Preview ${idx + 1}`} />
                        {preview.isMain && <span className="photo-main-badge">Главное</span>}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleRemovePhoto(idx); }}
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: 28,
                            height: 28,
                            cursor: 'pointer',
                            fontSize: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
