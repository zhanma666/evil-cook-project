import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import './Categories.css';

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(id || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 流派分类
  const categories = [
    { id: 'all', name: '全部流派' },
    { id: 1, name: '微波炉派', icon: '🔥', description: '快速简单，无明火' },
    { id: 2, name: '电饭煲党', icon: '🍚', description: '一锅出，预约功能' },
    { id: 3, name: '饮料替代流', icon: '🥤', description: '创新低成本' },
    { id: 4, name: '空气炸锅派', icon: '💨', description: '无油健康' },
    { id: 5, name: '极简主义', icon: '⏱️', description: '步骤少，时间短' },
    { id: 6, name: '矿泉水瓶妙用', icon: '🧃', description: '面食制作神器' }
  ];

  const sortOptions = [
    { id: 'popular', name: '热门排序' },
    { id: 'time', name: '用时排序' },
    { id: 'difficulty', name: '难度排序' },
    { id: 'newest', name: '最新发布' }
  ];

  // 模拟API调用获取数据
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 根据选择的分类模拟数据
        let mockRecipes = [];
        
        if (selectedCategory === '6' || selectedCategory === 6) {
          // 矿泉水瓶妙用分类数据
          mockRecipes = [
            {
              id: 101,
              title: "矿泉水瓶精准量具法制作馒头",
              author: "面点大师",
              cookingTime: 90,
              difficulty: "中等",
              likes: 256,
              image: null
            },
            {
              id: 102,
              title: "恒温发酵法快速制作包子",
              author: "发酵专家",
              cookingTime: 60,
              difficulty: "简单",
              likes: 189,
              image: null
            },
            {
              id: 103,
              title: "摇面法制作松饼",
              author: "早餐达人",
              cookingTime: 30,
              difficulty: "简单",
              likes: 324,
              image: null
            },
            {
              id: 104,
              title: "南瓜馒头改良版",
              author: "健康饮食",
              cookingTime: 120,
              difficulty: "中等",
              likes: 142,
              image: null
            }
          ];
        } else {
          // 其他分类的模拟数据
          mockRecipes = [
            {
              id: 1,
              title: "微波炉蒸蛋",
              author: "厨神小李",
              cookingTime: 5,
              difficulty: "简单",
              likes: 128,
              image: null
            },
            {
              id: 2,
              title: "电饭煲蛋糕",
              author: "烘焙达人",
              cookingTime: 60,
              difficulty: "中等",
              likes: 96,
              image: null
            },
            {
              id: 3,
              title: "空气炸锅薯条",
              author: "健康饮食",
              cookingTime: 20,
              difficulty: "简单",
              likes: 215,
              image: null
            }
          ];
        }
        
        setRecipes(mockRecipes);
      } catch (err) {
        setError('获取菜谱失败，请稍后重试');
        console.error('获取菜谱出错:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // 搜索功能实现
    console.log('搜索:', searchTerm);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 6) {
      // 特殊处理矿泉水瓶妙用分类
      navigate('/mineral-water-noodles');
    }
  };

  const handleViewDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="categories-container">
      {/* 页面头部 */}
      <header className="categories-header">
        <div className="header-content">
          <h1 className="page-title">菜谱分类</h1>
          <p className="page-subtitle">探索不同流派的邪修厨艺</p>
        </div>
      </header>

      {/* 主要内容 */}
      <div className="categories-main">
        {/* 侧边栏 */}
        <aside className="categories-sidebar">
          <h2 className="sidebar-title">流派分类</h2>
          <Card className="categories-card">
            <div className="categories-list">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`category-item ${selectedCategory == category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* 主内容区域 */}
        <main className="categories-content">
          <div className="content-header">
            <div className="header-info">
              <h2 className="content-title">
                {categories.find(cat => cat.id == selectedCategory)?.name || '全部流派'}
              </h2>
              <p className="content-subtitle">
                {categories.find(cat => cat.id == selectedCategory)?.description || '所有菜谱'}
              </p>
            </div>
            
            <div className="content-controls">
              <div className="search-box">
                <form onSubmit={handleSearch}>
                  <Input
                    type="text"
                    placeholder="搜索菜谱..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <Button type="submit" variant="primary">搜索</Button>
                </form>
              </div>
              
              <div className="sort-box">
                <label htmlFor="sort-select">排序：</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 菜谱列表 */}
          <div className="recipes-list">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>加载中...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  重新加载
                </Button>
              </div>
            ) : recipes.length > 0 ? (
              <div className="recipes-grid">
                {recipes.map(recipe => (
                  <Card key={recipe.id} className="recipe-card">
                    <div className="recipe-image">
                      <img 
                        src={`https://placehold.co/300x200?text=${encodeURIComponent(recipe.title)}`} 
                        alt={recipe.title}
                      />
                    </div>
                    <div className="recipe-content">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-author">by {recipe.author}</p>
                      <div className="recipe-meta">
                        <span className="cooking-time">⏱️ {recipe.cookingTime}分钟</span>
                        <span className="difficulty">🔥 {recipe.difficulty}</span>
                      </div>
                      <div className="recipe-actions">
                        <Button variant="secondary" size="small">
                          ❤️ {recipe.likes}
                        </Button>
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => handleViewDetails(recipe.id)}
                        >
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="no-recipes">
                <p>暂无菜谱</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Categories;