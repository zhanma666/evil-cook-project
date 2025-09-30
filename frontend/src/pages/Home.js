import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import './Home.css';

// 骨架屏组件
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-actions">
        <div className="skeleton-button small"></div>
        <div className="skeleton-button small"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  // 流派分类
  const categories = [
    { id: 1, name: "微波炉派", icon: "🔥", description: "快速简单，无明火" },
    { id: 2, name: "电饭煲党", icon: "🍚", description: "一锅出，预约功能" },
    { id: 3, name: "饮料替代流", icon: "🥤", description: "创新低成本" },
    { id: 4, name: "空气炸锅派", icon: "💨", description: "无油健康" },
    { id: 5, name: "极简主义", icon: "⏱️", description: "步骤少，时间短" },
    { id: 6, name: "矿泉水瓶妙用", icon: "🧃", description: "面食制作神器" }
  ];

  // 模拟数据 - 用于降级方案
  const mockRecipes = [
    {
      id: 1,
      title: "微波炉蒸蛋",
      author: { username: "厨神小李" },
      metadata: { cookingTime: 5 },
      likes: 128
    },
    {
      id: 2,
      title: "电饭煲蛋糕",
      author: { username: "美食家小王" },
      metadata: { cookingTime: 60 },
      likes: 96
    },
    {
      id: 3,
      title: "芝士爆浆馒头",
      author: { username: "厨房新手小张" },
      metadata: { cookingTime: 25 },
      likes: 156
    }
  ];

  // 获取数据
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 调用真实的后端API
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) {
          throw new Error('菜谱加载失败');
        }
        
        const data = await response.json();
        const recipesData = Array.isArray(data) ? data : data.data?.recipes || [];
        
        // 设置菜谱数据
        setRecipes(recipesData.slice(0, 6));
        setPopularRecipes(recipesData.slice(0, 3));
      } catch (err) {
        setError(err.message);
        console.error("加载菜谱时出错:", err);
        // 降级到模拟数据
        setRecipes(mockRecipes);
        setPopularRecipes(mockRecipes.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // 搜索功能实现
    if (searchTerm.trim()) {
      // 添加到搜索历史
      const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategoryClick = (categoryId) => {
    // 处理分类点击事件
    if (categoryId === 6) {
      // 特殊处理矿泉水瓶妙用分类
      navigate('/mineral-water-noodles');
    } else {
      navigate(`/categories/${categoryId}`);
    }
  };

  const handleViewDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <p className="error-message">错误: {error}</p>
          <button onClick={() => window.location.reload()}>重新加载</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* 顶部导航栏 */}
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">邪修厨房</h1>
          </div>
          
          <nav className="main-nav">
            <Link to="/home" className="nav-link active">首页</Link>
            <Link to="/categories" className="nav-link">分类</Link>
            <Link to="/create" className="nav-link">创作</Link>
            <Link to="/profile" className="nav-link">我的</Link>
          </nav>
          
          <div className="header-right">
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <Input
                  type="text"
                  placeholder="搜索菜谱..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Button type="submit" variant="primary" className="search-button">
                  搜索
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="home-main">
        {/* 欢迎横幅 */}
        <section className="welcome-banner">
          <div className="banner-content">
            <h2 className="banner-title">踏入邪修之道，解锁禁忌厨艺</h2>
            <p className="banner-subtitle">发现高效、低成本的创意料理秘籍</p>
            <div className="banner-actions">
              <Button variant="primary" size="large" className="explore-button">
                探索菜谱
              </Button>
              <Button 
                variant="secondary" 
                size="large" 
                className="create-button"
                onClick={() => navigate('/create')}
              >
                创建菜谱
              </Button>
            </div>
          </div>
        </section>

        {/* 流派分类导航 */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">流派分类</h2>
            <Link to="/categories" className="more-link">查看全部</Link>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Card 
                key={category.id} 
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
                role="button"
                tabIndex={0}
                aria-label={`${category.name} - ${category.description}`}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 热门菜谱排行榜 */}
        <section className="popular-section">
          <div className="section-header">
            <h2 className="section-title">热门菜谱排行榜</h2>
            <Link to="/popular" className="more-link">查看更多</Link>
          </div>
          <div className="popular-list">
            {popularRecipes.map((recipe, index) => (
              <div key={recipe.id} className="popular-item">
                <span className="rank-number">#{index + 1}</span>
                <div className="popular-content">
                  <h3 className="popular-title">{recipe.title}</h3>
                  <p className="popular-author">by {recipe.author?.username || recipe.author}</p>
                </div>
                <div className="popular-likes">
                  <span className="like-icon">❤️</span>
                  <span className="like-count">{recipe.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 推荐菜谱展示 */}
        <section className="recipes-section">
          <div className="section-header">
            <h2 className="section-title">推荐菜谱</h2>
            <Link to="/recipes" className="more-link">查看更多</Link>
          </div>
          <div className="recipes-grid">
            {loading ? (
              // 显示骨架屏
              Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            ) : error ? (
              <div className="error-container">
                <p className="error-message">菜谱加载失败: {error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  重新加载
                </Button>
              </div>
            ) : (
              recipes.map((recipe) => (
                <Card key={recipe.id} className="recipe-card">
                  <div className="recipe-image">
                    {recipe.coverImage ? (
                      <img 
                        src={recipe.coverImage} 
                        alt={`${recipe.title}封面图`}
                      />
                    ) : (
                      <div className="placeholder-image">
                        <span className="placeholder-text">{recipe.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-author">by {recipe.author?.username || recipe.author}</p>
                    <div className="recipe-meta">
                      <span className="cooking-time">⏱️ {recipe.metadata?.cookingTime || recipe.cookingTime}分钟</span>
                      <span className="difficulty">🔥 {recipe.metadata?.difficulty || recipe.difficulty}</span>
                    </div>
                    <div className="recipe-actions">
                      <Button variant="secondary" size="small" className="like-button">
                        ❤️ {recipe.likes}
                      </Button>
                      <Button 
                        variant="primary" 
                        size="small" 
                        className="view-button"
                        onClick={() => handleViewDetails(recipe.id)}
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;