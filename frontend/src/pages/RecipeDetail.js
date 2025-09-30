import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 调用真实的后端API
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('菜谱加载失败');
        }
        
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="recipe-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-detail-container">
        <div className="error-container">
          <p className="error-message">错误: {error}</p>
          <button onClick={() => window.location.reload()}>重新加载</button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <div className="error-container">
          <p>菜谱未找到</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <div className="cover-image">
          {recipe.coverImage ? (
            <img src={recipe.coverImage} alt={recipe.title} />
          ) : (
            <div className="placeholder-image">
              <span className="placeholder-icon">?</span>
            </div>
          )}
        </div>
        <div className="recipe-info">
          <h1 className="recipe-title">{recipe.title}</h1>
          <div className="author-info">
            <div className="author-avatar">
              {recipe['author.avatar'] ? (
                <img src={recipe['author.avatar']} alt={recipe['author.username']} />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <div className="author-details">
              <p className="author-name">{recipe['author.username']}</p>
              <p className="author-level">{recipe['author.level']}</p>
            </div>
          </div>
          <div className="metadata">
            <p>烹饪时间: {recipe['metadata.cookingTime']}分钟</p>
            <p>难度: {recipe['metadata.difficulty']}</p>
            <p>成本: {recipe['metadata.costLevel']}</p>
            <p>份量: {recipe['metadata.servings']}人份</p>
          </div>
        </div>
      </div>

      <div className="materials-section">
        <h2>材料清单</h2>
        <ul>
          {recipe.materials && recipe.materials.map((material, index) => (
            <li key={index}>{material.name}: {material.amount}</li>
          ))}
        </ul>
      </div>

      <div className="steps-section">
        <h2>制作步骤</h2>
        <ol>
          {recipe.steps && recipe.steps.map((step, index) => (
            <li key={index} className="step-item">
              <p>{step.description}</p>
              {step.image && (
                <div className="step-image">
                  <img src={step.image} alt={`步骤${index + 1}`} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;