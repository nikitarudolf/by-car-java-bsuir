import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../api/userService';
import { theme } from '../theme';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      loadUsers();
    }
  }, [isAuthenticated, navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки пользователей: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      await login(userId);
      navigate('/');
    } catch (err) {
      setError('Ошибка входа: ' + err.message);
    }
  };

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
        <h1 className="page-title">Вход в <span>систему</span></h1>
      </div>

      {error && (
        <div className="dark-alert dark-alert-danger fade-in">
          {error}
          <button className="dark-alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="fade-in" style={{ marginTop: 24 }}>
        <div className="dark-card">
          <div className="dark-card-header">
            <h5>Выберите пользователя</h5>
            <span className="badge-muted">{(Array.isArray(users) ? users : []).length} пользователей</span>
          </div>
          <div className="dark-card-body" style={{ padding: 0 }}>
            {(Array.isArray(users) ? users : []).length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
                Нет доступных пользователей
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(Array.isArray(users) ? users : []).map((user, index) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className="user-select-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 24px',
                      background: 'transparent',
                      border: 'none',
                      borderTop: index > 0 ? '1px solid var(--border)' : 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'var(--bg)',
                        flexShrink: 0,
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                        {user.name}
                        {user.isDealer && (
                          <span className="badge-accent" style={{ marginLeft: 8, fontSize: 10 }}>
                            Дилер
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                        {user.phone} • {user.city}
                      </div>
                    </div>
                    <div style={{ fontSize: 18, color: 'var(--muted)' }}>→</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Это демо-версия. В production будет полноценная авторизация.
        </div>
      </div>
    </>
  );
};

export default Login;
