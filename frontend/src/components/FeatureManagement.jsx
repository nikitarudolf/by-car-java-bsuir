import React, { useState, useEffect } from 'react';
import featureService from '../api/featureService';
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

const FeatureManagement = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [featureName, setFeatureName] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { loadFeatures(); }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await featureService.getAll();
      setFeatures(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!featureName.trim()) { setError('Название не может быть пустым'); return; }
    try {
      setLoading(true);
      if (editingFeature) { await featureService.update(editingFeature.id, { name: featureName }); setSuccess('Характеристика обновлена'); }
      else { await featureService.create({ name: featureName }); setSuccess('Характеристика создана'); }
      await loadFeatures();
      setShowModal(false); setFeatureName(''); setEditingFeature(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (fid) => {
    if (!window.confirm('Удалить характеристику?')) return;
    try {
      setLoading(true);
      await featureService.delete(fid);
      setSuccess('Характеристика удалена');
      await loadFeatures();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const filtered = (Array.isArray(features) ? features : []).filter(
    f => (f?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      <div className="page-header fade-in">
        <h1 className="page-title">Харак<span>теристики</span></h1>
        <button className="btn-accent"
          onClick={() => { setEditingFeature(null); setFeatureName(''); setShowModal(true); }}>
          + Добавить
        </button>
      </div>

      {error && <div className="dark-alert dark-alert-danger">{error}<button className="dark-alert-close" onClick={() => setError(null)}>✕</button></div>}
      {success && <div className="dark-alert dark-alert-success">{success}<button className="dark-alert-close" onClick={() => setSuccess(null)}>✕</button></div>}

      <div className="dark-card fade-in">
        <div className="dark-card-header">
          <h5>Характеристики автомобилей</h5>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge-muted">{features.length} всего</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dark-input"
              placeholder="Поиск..."
              style={{ width: 200, padding: '6px 12px', fontSize: 13 }}
            />
          </div>
        </div>

        {loading && features.length === 0 ? (
          <div className="dark-spinner" style={{ padding: 48 }}><div className="spinner-ring" /></div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
            {search ? `Нет результатов для «${search}»` : 'Нет характеристик'}
          </div>
        ) : (
          <table className="dark-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>ID</th>
                <th>Название</th>
                <th style={{ width: 160 }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id}>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>#{f.id}</td>
                  <td>
                    <span className="feature-chip selected" style={{ cursor: 'default' }}>{f.name}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={() => { setEditingFeature(f); setFeatureName(f.name); setShowModal(true); }}>
                        Изменить
                      </button>
                      <button className="btn-danger-ghost" style={{ padding: '5px 12px', fontSize: 12 }}
                        onClick={() => handleDelete(f.id)}>
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

      <Modal
        show={showModal}
        title={editingFeature ? 'Редактировать характеристику' : 'Создать характеристику'}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        loading={loading}
      >
        <div className="dark-form-group" style={{ marginBottom: 0 }}>
          <label className="dark-label">Название</label>
          <input
            type="text"
            value={featureName}
            onChange={e => setFeatureName(e.target.value)}
            className="dark-input"
            placeholder="Например: ABS, Климат-контроль, Парктроник"
          />
          <p className="dark-form-hint">Примеры: ESP, Круиз-контроль, Камера заднего вида</p>
        </div>
      </Modal>
    </>
  );
};

export default FeatureManagement;
