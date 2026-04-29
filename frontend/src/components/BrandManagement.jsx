import React, { useState, useEffect } from 'react';
import brandService from '../api/brandService';
import modelService from '../api/modelService';
import { theme } from '../theme';

const Modal = ({ show, title, onClose, onSave, loading, children }) => {
  if (!show) return null;
  return (
    <div className="dark-modal-overlay" onClick={onClose}>
      <div className="dark-modal" onClick={e => e.stopPropagation()}>
        <div className="dark-modal-header">
          <span className="dark-modal-title">{title}</span>
          <button className="dark-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="dark-modal-body">{children}</div>
        <div className="dark-modal-footer">
          <button className="btn-ghost" onClick={onClose}>Отмена</button>
          <button className="btn-accent" onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editingModel, setEditingModel] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');

  useEffect(() => { loadBrands(); loadModels(); }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await brandService.getAll();
      setBrands(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const loadModels = async () => {
    try {
      const data = await modelService.getAll();
      setModels(Array.isArray(data) ? data : []);
    }
    catch (err) { console.error(err); }
  };

  const getModelsForBrand = (bid) =>
    (Array.isArray(models) ? models : []).filter(m => m.brand && m.brand.id === bid);

  const handleSaveBrand = async () => {
    if (!brandName.trim()) { setError('Название не может быть пустым'); return; }
    try {
      setLoading(true);
      if (editingBrand) { await brandService.update(editingBrand.id, { name: brandName }); setSuccess('Бренд обновлён'); }
      else { await brandService.create({ name: brandName }); setSuccess('Бренд создан'); }
      await loadBrands();
      setShowBrandModal(false); setBrandName(''); setEditingBrand(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDeleteBrand = async (bid) => {
    if (!window.confirm('Удалить бренд?')) return;
    try {
      setLoading(true);
      await brandService.delete(bid);
      setSuccess('Бренд удалён');
      await loadBrands();
      if (selectedBrand?.id === bid) setSelectedBrand(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleSaveModel = async () => {
    if (!modelName.trim()) { setError('Название не может быть пустым'); return; }
    if (!selectedBrand) { setError('Бренд не выбран'); return; }
    try {
      setLoading(true);
      if (editingModel) { await modelService.update(editingModel.id, { name: modelName }); setSuccess('Модель обновлена'); }
      else { await modelService.create({ name: modelName, brandId: selectedBrand.id }); setSuccess('Модель создана'); }
      await loadModels();
      setShowModelModal(false); setModelName(''); setEditingModel(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDeleteModel = async (mid) => {
    if (!window.confirm('Удалить модель?')) return;
    try { setLoading(true); await modelService.delete(mid); setSuccess('Модель удалена'); await loadModels(); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const safeBrands = Array.isArray(brands) ? brands : [];
  const brandModels = selectedBrand ? getModelsForBrand(selectedBrand.id) : [];

  return (
    <>
      <style>{theme}</style>

      <div className="page-header fade-in">
        <h1 className="page-title">Бренды <span>&amp; Модели</span></h1>
      </div>

      {error && <div className="dark-alert dark-alert-danger">{error}<button className="dark-alert-close" onClick={() => setError(null)}>✕</button></div>}
      {success && <div className="dark-alert dark-alert-success">{success}<button className="dark-alert-close" onClick={() => setSuccess(null)}>✕</button></div>}

      <div className="two-col fade-in" style={{ alignItems: 'start' }}>
        {/* Brands */}
        <div className="dark-card">
          <div className="dark-card-header">
            <h5>Бренды</h5>
            <button className="btn-accent" style={{ padding: '6px 14px', fontSize: 12 }}
              onClick={() => { setEditingBrand(null); setBrandName(''); setShowBrandModal(true); }}>
              + Добавить
            </button>
          </div>
          <div>
            {loading && safeBrands.length === 0 ? (
              <div className="dark-spinner" style={{ padding: 40 }}><div className="spinner-ring" /></div>
            ) : safeBrands.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>Нет брендов</div>
            ) : (
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Модели</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {safeBrands.map(b => (
                    <tr
                      key={b.id}
                      className={`row-clickable${selectedBrand?.id === b.id ? ' row-active' : ''}`}
                      onClick={() => setSelectedBrand(b)}
                    >
                      <td style={{ color: 'var(--muted)', fontSize: 12 }}>#{b.id}</td>
                      <td style={{ fontWeight: 600 }}>{b.name}</td>
                      <td><span className="badge-muted">{getModelsForBrand(b.id).length}</span></td>
                      <td onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => { setEditingBrand(b); setBrandName(b.name); setShowBrandModal(true); }}>
                            Изм.
                          </button>
                          <button className="btn-danger-ghost" style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => handleDeleteBrand(b.id)}>
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Models */}
        <div className="dark-card">
          <div className="dark-card-header">
            <h5>
              {selectedBrand ? (
                <>{selectedBrand.name} <span style={{ color: 'var(--accent)' }}>— модели</span></>
              ) : 'Модели'}
            </h5>
            <button
              className="btn-accent"
              style={{ padding: '6px 14px', fontSize: 12 }}
              disabled={!selectedBrand}
              onClick={() => { setEditingModel(null); setModelName(''); setShowModelModal(true); }}
            >
              + Добавить
            </button>
          </div>
          <div>
            {!selectedBrand ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                ← Выберите бренд слева
              </div>
            ) : brandModels.length === 0 ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                Нет моделей для этого бренда
              </div>
            ) : (
              <table className="dark-table">
                <thead>
                  <tr><th>ID</th><th>Название</th><th>Бренд</th><th>Действия</th></tr>
                </thead>
                <tbody>
                  {brandModels.map(m => (
                    <tr key={m.id}>
                      <td style={{ color: 'var(--muted)', fontSize: 12 }}>#{m.id}</td>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td><span className="badge-muted">{m.brand?.name}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => { setEditingModel(m); setModelName(m.name); setShowModelModal(true); }}>
                            Изм.
                          </button>
                          <button className="btn-danger-ghost" style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => handleDeleteModel(m.id)}>
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Modal show={showBrandModal} title={editingBrand ? 'Редактировать бренд' : 'Создать бренд'}
        onClose={() => setShowBrandModal(false)} onSave={handleSaveBrand} loading={loading}>
        <div className="dark-form-group" style={{ marginBottom: 0 }}>
          <label className="dark-label">Название бренда</label>
          <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)}
            className="dark-input" placeholder="Например: Toyota" />
        </div>
      </Modal>

      <Modal show={showModelModal} title={editingModel ? 'Редактировать модель' : 'Создать модель'}
        onClose={() => setShowModelModal(false)} onSave={handleSaveModel} loading={loading}>
        <div className="dark-form-group">
          <label className="dark-label">Бренд</label>
          <input type="text" value={selectedBrand?.name || ''} className="dark-input" disabled />
        </div>
        <div className="dark-form-group" style={{ marginBottom: 0 }}>
          <label className="dark-label">Название модели</label>
          <input type="text" value={modelName} onChange={e => setModelName(e.target.value)}
            className="dark-input" placeholder="Например: Camry" />
        </div>
      </Modal>
    </>
  );
};

export default BrandManagement;
