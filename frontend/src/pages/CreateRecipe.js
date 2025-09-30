import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 菜谱基本信息
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [cost, setCost] = useState('');
  
  // 封面图
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  
  // 成品图
  const [finalImage, setFinalImage] = useState(null);
  const [finalImagePreview, setFinalImagePreview] = useState(null);
  
  // 材料清单
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), name: '', amount: '', isEssential: false }
  ]);
  
  // 制作步骤
  const [steps, setSteps] = useState([
    { id: Date.now(), description: '', image: null, imagePreview: null }
  ]);
  
  // 安全提示
  const [safetyTips, setSafetyTips] = useState(['']);
  
  // 流派分类选项
  const categories = [
    { id: 1, name: "微波炉派" },
    { id: 2, name: "电饭煲党" },
    { id: 3, name: "饮料替代流" },
    { id: 4, name: "空气炸锅派" },
    { id: 5, name: "极简主义" }
  ];
  
  // 难度等级选项
  const difficultyLevels = [
    { value: 1, label: "简单" },
    { value: 2, label: "中等" },
    { value: 3, label: "困难" }
  ];
  
  // 成本等级选项
  const costLevels = [
    { value: "低成本", label: "低成本" },
    { value: "中等成本", label: "中等成本" },
    { value: "高成本", label: "高成本" }
  ];

  // 处理封面图上传
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('请选择图片文件');
        return;
      }
      
      setCoverImage(file);
      
      // 生成预览图
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理成品图上传
  const handleFinalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('请选择图片文件');
        return;
      }
      
      setFinalImage(file);
      
      // 生成预览图
      const reader = new FileReader();
      reader.onload = (e) => {
        setFinalImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 添加材料
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: '', amount: '', isEssential: false }
    ]);
  };

  // 更新材料
  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ingredient => 
      ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    ));
  };

  // 删除材料
  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    }
  };

  // 添加步骤
  const addStep = () => {
    setSteps([
      ...steps,
      { id: Date.now(), description: '', image: null, imagePreview: null }
    ]);
  };

  // 更新步骤
  const updateStep = (id, field, value) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  // 处理步骤图片上传
  const handleStepImageChange = (stepId, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('请选择图片文件');
        return;
      }
      
      updateStep(stepId, 'image', file);
      
      // 生成预览图
      const reader = new FileReader();
      reader.onload = (e) => {
        updateStep(stepId, 'imagePreview', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 删除步骤
  const removeStep = (id) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };

  // 添加安全提示
  const addSafetyTip = () => {
    setSafetyTips([...safetyTips, '']);
  };

  // 更新安全提示
  const updateSafetyTip = (index, value) => {
    const newTips = [...safetyTips];
    newTips[index] = value;
    setSafetyTips(newTips);
  };

  // 删除安全提示
  const removeSafetyTip = (index) => {
    if (safetyTips.length > 1) {
      const newTips = safetyTips.filter((_, i) => i !== index);
      setSafetyTips(newTips);
    }
  };

  // 表单验证
  const validateForm = () => {
    if (!title.trim()) {
      setError('请输入菜谱标题');
      return false;
    }
    
    if (!category) {
      setError('请选择流派分类');
      return false;
    }
    
    if (!cookingTime || cookingTime <= 0) {
      setError('请输入有效的制作时间');
      return false;
    }
    
    // 检查材料是否填写完整
    for (let ingredient of ingredients) {
      if (!ingredient.name.trim() || !ingredient.amount.trim()) {
        setError('请完整填写材料信息');
        return false;
      }
    }
    
    // 检查步骤是否填写完整
    for (let step of steps) {
      if (!step.description.trim()) {
        setError('请填写步骤说明');
        return false;
      }
    }
    
    return true;
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 模拟提交过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 实际项目中这里会调用API提交数据
      console.log('菜谱数据:', {
        title,
        description,
        category,
        cookingTime,
        difficulty,
        cost,
        coverImage,
        finalImage,
        ingredients,
        steps,
        safetyTips
      });
      
      alert('菜谱创建成功！');
      navigate('/home');
    } catch (err) {
      setError('菜谱创建失败，请稍后重试');
      console.error('创建菜谱出错:', err);
    } finally {
      setLoading(false);
    }
  };

  // 保存草稿
  const handleSaveDraft = () => {
    // 实际项目中这里会调用API保存草稿
    alert('草稿已保存');
  };

  return (
    <div className="create-recipe-container">
      <div className="create-recipe-header">
        <h1 className="page-title">创建菜谱</h1>
        <div className="header-actions">
          <Button variant="secondary" onClick={handleSaveDraft} disabled={loading}>
            保存草稿
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? '发布中...' : '发布菜谱'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-recipe-form">
        {/* 基本信息 */}
        <Card className="form-section">
          <h2 className="section-title">基本信息</h2>
          
          <div className="form-group">
            <label className="form-label">菜谱标题 *</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入菜谱标题"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">菜谱描述</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入菜谱描述"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">流派分类 *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">请选择流派分类</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">制作时间(分钟) *</label>
              <Input
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                placeholder="请输入制作时间"
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">难度等级</label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
              >
                {difficultyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">成本等级</label>
              <select
                className="form-select"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              >
                <option value="">请选择成本等级</option>
                {costLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* 封面图 */}
        <Card className="form-section">
          <h2 className="section-title">封面图</h2>
          
          <div className="image-upload-container">
            <input
              type="file"
              id="cover-image"
              className="image-input"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
            <label htmlFor="cover-image" className="image-upload-label">
              {coverImagePreview ? (
                <img 
                  src={coverImagePreview} 
                  alt="封面图预览" 
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-icon">📷</span>
                  <span className="placeholder-text">点击上传封面图</span>
                </div>
              )}
            </label>
            {coverImage && (
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => {
                  setCoverImage(null);
                  setCoverImagePreview(null);
                }}
              >
                删除图片
              </Button>
            )}
          </div>
        </Card>

        {/* 材料清单 */}
        <Card className="form-section">
          <div className="section-header">
            <h2 className="section-title">材料清单</h2>
            <Button variant="secondary" size="small" onClick={addIngredient}>
              添加材料
            </Button>
          </div>
          
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="ingredient-item">
              <div className="form-row">
                <div className="form-group">
                  <Input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    placeholder="材料名称"
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                    placeholder="用量"
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={ingredient.isEssential}
                      onChange={(e) => updateIngredient(ingredient.id, 'isEssential', e.target.checked)}
                    />
                    <span>必需</span>
                  </label>
                </div>
                
                {ingredients.length > 1 && (
                  <div className="form-group">
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => removeIngredient(ingredient.id)}
                    >
                      删除
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Card>

        {/* 制作步骤 */}
        <Card className="form-section">
          <div className="section-header">
            <h2 className="section-title">制作步骤</h2>
            <Button variant="secondary" size="small" onClick={addStep}>
              添加步骤
            </Button>
          </div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className="step-header">
                <h3 className="step-title">步骤 {index + 1}</h3>
                {steps.length > 1 && (
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => removeStep(step.id)}
                  >
                    删除步骤
                  </Button>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">步骤说明 *</label>
                <textarea
                  className="form-textarea"
                  value={step.description}
                  onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                  placeholder="请输入步骤说明"
                  rows="3"
                  required
                />
              </div>
              
              <div className="image-upload-container">
                <input
                  type="file"
                  id={`step-image-${step.id}`}
                  className="image-input"
                  accept="image/*"
                  onChange={(e) => handleStepImageChange(step.id, e)}
                />
                <label htmlFor={`step-image-${step.id}`} className="image-upload-label">
                  {step.imagePreview ? (
                    <img 
                      src={step.imagePreview} 
                      alt={`步骤${index + 1}图片预览`} 
                      className="image-preview"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span className="placeholder-icon">📷</span>
                      <span className="placeholder-text">点击上传步骤图</span>
                    </div>
                  )}
                </label>
                {step.image && (
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => {
                      updateStep(step.id, 'image', null);
                      updateStep(step.id, 'imagePreview', null);
                    }}
                  >
                    删除图片
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Card>

        {/* 成品图 */}
        <Card className="form-section">
          <h2 className="section-title">成品图</h2>
          
          <div className="image-upload-container">
            <input
              type="file"
              id="final-image"
              className="image-input"
              accept="image/*"
              onChange={handleFinalImageChange}
            />
            <label htmlFor="final-image" className="image-upload-label">
              {finalImagePreview ? (
                <img 
                  src={finalImagePreview} 
                  alt="成品图预览" 
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-icon">📷</span>
                  <span className="placeholder-text">点击上传成品图</span>
                </div>
              )}
            </label>
            {finalImage && (
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => {
                  setFinalImage(null);
                  setFinalImagePreview(null);
                }}
              >
                删除图片
              </Button>
            )}
          </div>
        </Card>

        {/* 安全提示 */}
        <Card className="form-section">
          <div className="section-header">
            <h2 className="section-title">安全提示</h2>
            <Button variant="secondary" size="small" onClick={addSafetyTip}>
              添加提示
            </Button>
          </div>
          
          {safetyTips.map((tip, index) => (
            <div key={index} className="safety-tip-item">
              <div className="form-row">
                <div className="form-group">
                  <Input
                    type="text"
                    value={tip}
                    onChange={(e) => updateSafetyTip(index, e.target.value)}
                    placeholder="请输入安全提示"
                  />
                </div>
                
                {safetyTips.length > 1 && (
                  <div className="form-group">
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => removeSafetyTip(index)}
                    >
                      删除
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Card>

        {/* 提交按钮 */}
        <div className="form-actions">
          <Button variant="secondary" onClick={handleSaveDraft} disabled={loading}>
            保存草稿
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading}
          >
            {loading ? '发布中...' : '发布菜谱'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;