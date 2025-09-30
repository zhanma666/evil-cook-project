import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerStart, registerFailure, registerSuccess } from '../store/authSlice';
import AV from '../services/leancloud';
import Input from '../components/Input';
import Button from '../components/Button';
import '../index.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    
    // 基本验证
    if (!username.trim()) {
      dispatch(registerFailure('请输入用户名'));
      return;
    }
    
    if (!email.trim()) {
      dispatch(registerFailure('请输入邮箱地址'));
      return;
    }
    
    if (!password) {
      dispatch(registerFailure('请输入密码'));
      return;
    }
    
    if (password.length < 6) {
      dispatch(registerFailure('密码长度至少为6位'));
      return;
    }
    
    if (password !== confirmPassword) {
      dispatch(registerFailure('两次输入的密码不一致'));
      return;
    }
    
    try {
      // 使用LeanCloud进行用户注册
      const user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.setEmail(email);
      
      await user.signUp();
      dispatch(registerSuccess());
      alert('注册成功！踏入邪修之道，解锁禁忌厨艺！');
      navigate('/login'); // 注册成功后切换到登录页面
    } catch (err) {
      let errorMessage = err.message || '注册失败，请稍后重试';
      // 根据不同错误类型提供更友好的提示
      if (errorMessage.includes('Username') && errorMessage.includes('taken')) {
        errorMessage = '用户名已被占用，请选择其他用户名';
      } else if (errorMessage.includes('Email') && errorMessage.includes('taken')) {
        errorMessage = '邮箱已被注册，请使用其他邮箱';
      }
      dispatch(registerFailure(errorMessage));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">邪修注册</h1>
          <p className="login-subtitle">踏入邪修之道，解锁禁忌厨艺</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="用户名"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error && !username && (error.includes('用户名') || error.includes('注册')) ? error : null}
            required
          />
          
          <Input
            label="邮箱"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error && !email && (error.includes('邮箱') || error.includes('注册')) ? error : null}
            required
          />
          
          <Input
            label="密码（至少6位）"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password && error.includes('密码') ? error : null}
            required
            minLength="6"
          />
          
          <Input
            label="确认密码"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error && password && !confirmPassword && error.includes('密码不一致') ? error : null}
            required
          />
          
          {error && !error.includes('用户名') && !error.includes('邮箱') && !error.includes('密码') && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                注册中...
              </>
            ) : (
              '快 速 注 册'
            )}
          </Button>
        </form>
        
        <div className="login-footer">
          <p>
            已有账号？ 
            <Link to="/login" className="switch-link">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;