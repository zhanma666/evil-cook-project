import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 获取用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 获取用户信息
        const userResponse = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          credentials: 'include', // 包含cookie
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!userResponse.ok) {
          throw new Error('获取用户信息失败');
        }
        
        const userData = await userResponse.json();
        setUser(userData.data);
        
        // 模拟我的菜谱数据
        const mockMyRecipes = [
          {
            id: 1,
            title: "微波炉蒸蛋",
            cookingTime: 5,
            likes: 128,
            image: null
          },
          {
            id: 2,
            title: "电饭煲蛋糕",
            cookingTime: 60,
            likes: 96,
            image: null
          },
          {
            id: 3,
            title: "芝士爆浆馒头",
            cookingTime: 25,
            likes: 156,
            image: null
          }
        ];
        
        // 模拟我的收藏数据
        const mockFavorites = [
          {
            id: 1,
            title: "微波炉芝士爆浆玉米",
            author: "芝士控",
            likes: 542,
            image: null
          },
          {
            id: 2,
            title: "电饭煲炖牛肉",
            author: "慢炖专家",
            likes: 428,
            image: null
          },
          {
            id: 3,
            title: "空气炸锅烤翅",
            author: "烧烤大师",
            likes: 397,
            image: null
          }
        ];
        
        setMyRecipes(mockMyRecipes);
        setFavorites(mockFavorites);
      } catch (err) {
        setError('获取用户数据失败，请稍后重试');
        console.error('获取用户数据出错:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // 调用后端登出API
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include', // 包含cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('登出失败');
      }
      
      // 清除本地认证状态
      localStorage.removeItem('isAuthenticated');
      
      // 跳转到登录页面
      navigate('/login');
    } catch (err) {
      console.error('登出出错:', err);
      // 即使API调用失败，也清除本地状态并跳转
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>个人信息加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <Button variant="primary" onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <div className="error-message">未找到用户信息</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* 顶部导航栏 */}
      <header className="profile-header">
        <div className="header-content">
          <h1 className="logo">邪修厨房</h1>
          <nav className="main-nav">
            <Link to="/home" className="nav-link">首页</Link>
            <Link to="/categories" className="nav-link">分类</Link>
            <Link to="/create" className="nav-link">创作</Link>
            <Link to="/profile" className="nav-link active">我的</Link>
          </nav>
          <div className="user-actions">
            <Button variant="primary" onClick={handleLogout}>登出</Button>
          </div>
        </div>
      </header>

      <main className="profile-main">
        {/* 用户信息卡片 */}
        <section className="user-info-section">
          <Card className="user-info-card">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <div className="user-details">
              <h2 className="username">{user.username}</h2>
              <p className="user-level">{user.level}</p>
              <p className="user-email">{user.email}</p>
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-value">{user.experience || 0}</span>
                  <span className="stat-label">经验值</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{myRecipes.length}</span>
                  <span className="stat-label">我的菜谱</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{favorites.length}</span>
                  <span className="stat-label">我的收藏</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 我的菜谱 */}
        <section className="my-recipes-section">
          <div className="section-header">
            <h2>我的菜谱</h2>
            <Link to="/create" className="create-link">+ 创建菜谱</Link>
          </div>
          <div className="recipes-grid">
            {myRecipes.map(recipe => (
              <Card key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} />
                  ) : (
                    <div className="image-placeholder">🍳</div>
                  )}
                </div>
                <div className="recipe-info">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-meta">
                    <span>⏱️ {recipe.cookingTime}分钟</span>
                    <span>👍 {recipe.likes}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 我的收藏 */}
        <section className="favorites-section">
          <div className="section-header">
            <h2>我的收藏</h2>
          </div>
          <div className="recipes-grid">
            {favorites.map(recipe => (
              <Card key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} />
                  ) : (
                    <div className="image-placeholder">🍳</div>
                  )}
                </div>
                <div className="recipe-info">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-author">by {recipe.author}</p>
                  <p className="recipe-meta">
                    <span>👍 {recipe.likes}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;