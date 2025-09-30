import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 流派分类
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'microwave', name: '微波炉派' },
    { id: 'ricecooker', name: '电饭煲党' },
    { id: 'airfryer', name: '空气炸锅派' },
    { id: 'beverage', name: '饮料替代流' },
    { id: 'minimalist', name: '极简主义' }
  ];

  const sortOptions = [
    { id: 'relevant', name: '相关度' },
    { id: 'popular', name: '热门' },
    { id: 'time', name: '用时' },
    { id: 'difficulty', name: '难度' }
  ];

  // 模拟API调用
  const performSearch = async (term, category, sort) => {
    setLoading(true);
    setError(null);
    
    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟搜索结果数据
      const mockResults = [
        {
          id: 1,
          title: "微波炉芝士爆浆玉米",
          author: "芝士控",
          cookingTime: 10,
          difficulty: "简单",
          likes: 542,
          image: null
        },
        {
          id: 2,
          title: "电饭煲芝士蛋糕",
          author: "烘焙达人",
          cookingTime: 60,
          difficulty: "中等",
          likes: 296,
          image: null
        },
        {
          id: 3,
          title: "芝士爆浆馒头",
          author: "创意料理",
          cookingTime: 25,
          difficulty: "中等",
          likes: 156,
          image: null
        },
        {
          id: 4,
          title: "微波炉芝士土豆",
          author: "快手料理",
          cookingTime: 8,
          difficulty: "简单",
          likes: 87,
          image: null
        },
        {
          id: 5,
          title: "电饭煲红烧肉",
          author: "家常菜大师",
          cookingTime: 90,
          difficulty: "中等",
          likes: 215,
          image: null
        },
        {
          id: 6,
          title: "空气炸锅鸡翅",
          author: "健康饮食",
          cookingTime: 25,
          difficulty: "简单",
          likes: 187,
          image: null
        }
      ];
      
      // 根据搜索词过滤结果
      const filteredResults = term 
        ? mockResults.filter(recipe => 
            recipe.title.includes(term) || 
            recipe.author.includes(term)
          )
        : mockResults;
      
      // 根据分类过滤结果
      const categoryFilteredResults = category !== 'all' 
        ? filteredResults.filter(recipe => {
            // 简化分类过滤逻辑
            if (category === 'microwave') return recipe.title.includes('微波炉');
            if (category === 'ricecooker') return recipe.title.includes('电饭煲');
            if (category === 'airfryer') return recipe.title.includes('炸锅');
            return true;
          })
        : filteredResults;
      
      // 设置搜索结果
      setSearchResults(categoryFilteredResults);
    } catch (err) {
      setError('搜索失败，请稍后重试');
      console.error('搜索出错:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 执行搜索
    performSearch(searchTerm, selectedCategory, sortBy);
    
    // 添加到搜索历史
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory.slice(0, 4)]);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const removeHistoryItem = (item) => {
    setSearchHistory(searchHistory.filter(historyItem => historyItem !== item));
  };

  // 组件加载时从本地存储获取搜索历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('解析搜索历史失败:', e);
      }
    }
  }, []);

  // 保存搜索历史到本地存储
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className="search-container">
      <div className="search-header">
        <h1 className="page-title">搜索菜谱</h1>
        
        {/* 搜索表单 */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <Input
              type="text"
              placeholder="输入菜谱名称、食材或关键词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Button type="submit" variant="primary" className="search-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  搜索中...
                </>
              ) : (
                '🔍 搜索'
              )}
            </Button>
          </div>
        </form>
        
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <h3 className="history-title">搜索历史</h3>
              <Button variant="secondary" size="small" onClick={clearHistory}>
                清空历史
              </Button>
            </div>
            <div className="history-tags">
              {searchHistory.map((item, index) => (
                <div key={index} className="history-tag">
                  <span 
                    className="history-text" 
                    onClick={() => setSearchTerm(item)}
                  >
                    {item}
                  </span>
                  <span 
                    className="remove-history" 
                    onClick={() => removeHistoryItem(item)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="search-main">
        {/* 筛选栏 */}
        <div className="filters-bar">
          <div className="filter-group">
            <h4 className="filter-title">流派分类</h4>
            <div className="filter-options">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setSelectedCategory(category.id)}
                  className="filter-button"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <h4 className="filter-title">排序方式</h4>
            <div className="filter-options">
              {sortOptions.map(option => (
                <Button
                  key={option.id}
                  variant={sortBy === option.id ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setSortBy(option.id)}
                  className="filter-button"
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 搜索结果 */}
        <div className="search-results">
          <div className="results-header">
            <h3 className="results-title">
              {loading ? '搜索中...' : error ? error : `找到 ${searchResults.length} 个相关菜谱`}
            </h3>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="results-grid">
              {searchResults.map(recipe => (
                <Card key={recipe.id} className="recipe-card">
                  <div className="recipe-image">
                    {recipe.image ? (
                      <img src={recipe.image} alt={recipe.title} />
                    ) : (
                      <div className="placeholder-image">
                        <span className="placeholder-icon">🍳</span>
                      </div>
                    )}
                  </div>
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-author">by {recipe.author}</p>
                    <div className="recipe-meta">
                      <span className="cooking-time">⏱️ {recipe.cookingTime}分钟</span>
                      <span className="difficulty">🔥 {recipe.difficulty}</span>
                    </div>
                    <div className="recipe-actions">
                      <Button variant="secondary" size="small" className="like-button">
                        ❤️ {recipe.likes}
                      </Button>
                      <Button variant="primary" size="small" className="view-button">
                        查看详情
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;