import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{theme}</style>

      <div className="page-header fade-in">
        <h1 className="page-title">Мой <span>профиль</span></h1>
        <button className="btn-danger-ghost" onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <div className="fade-in" style={{ marginTop: 24 }}>
        <div className="dark-card">
          <div className="dark-card-header">
            <h5>Информация о пользователе</h5>
            {currentUser.isDealer && (
              <span className="badge-accent">Дилер</span>
            )}
          </div>
          <div className="dark-card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 600,
                  color: 'var(--bg)',
                  flexShrink: 0,
                }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                  ID: {currentUser.id}
                </div>
              </div>
            </div>

            <table className="spec-table">
              <tbody>
                <tr>
                  <td>Телефон</td>
                  <td>{currentUser.phone}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{currentUser.email || 'Не указан'}</td>
                </tr>
                <tr>
                  <td>Город</td>
                  <td>{currentUser.city || 'Не указан'}</td>
                </tr>
                <tr>
                  <td>Тип аккаунта</td>
                  <td>
                    {currentUser.isDealer ? (
                      <span className="badge-accent">Дилер</span>
                    ) : (
                      <span className="badge-muted">Частное лицо</span>
                    )}
                  </td>
                </tr>
                {currentUser.isDealer && currentUser.companyName && (
                  <tr>
                    <td>Компания</td>
                    <td>{currentUser.companyName}</td>
                  </tr>
                )}
                <tr>
                  <td>Верификация</td>
                  <td>
                    {currentUser.isVerified ? (
                      <span className="badge-success">Подтвержден</span>
                    ) : (
                      <span className="badge-warning">Не подтвержден</span>
                    )}
                  </td>
                </tr>
                {currentUser.registeredAt && (
                  <tr>
                    <td>Дата регистрации</td>
                    <td>{new Date(currentUser.registeredAt).toLocaleDateString('ru-RU')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button className="btn-accent" onClick={() => navigate('/my-ads')} style={{ flex: 1 }}>
            Мои объявления
          </button>
          <button className="btn-ghost" onClick={() => navigate('/favorites')} style={{ flex: 1 }}>
            Избранное
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
