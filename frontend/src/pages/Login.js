import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import AV from '../services/leancloud';
import Button from '../components/Button';
import Input from '../components/Input';
import '../index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // 基本表单验证
    if (!username.trim()) {
      dispatch(loginFailure('请输入用户名或手机号'));
      return;
    }

    if (password.length < 6) {
      dispatch(loginFailure('密码长度至少为6位'));
      return;
    }

    try {
      // 使用LeanCloud进行用户登录
      const user = await AV.User.logIn(username.trim(), password);
      dispatch(loginSuccess({
        id: user.id,
        username: user.getUsername(),
        email: user.getEmail()
      }));
      
      // 设置认证状态
      localStorage.setItem('isAuthenticated', 'true');
      
      alert('踏入邪修之道，解锁禁忌厨艺！');
      navigate('/home');
    } catch (err) {
      let errorMessage = err.message || '登录失败，请检查用户名和密码';
      // 根据不同错误类型提供更友好的提示
      if (errorMessage.includes('network')) {
        errorMessage = '网络连接异常，请检查网络设置';
      } else if (errorMessage.includes('username')) {
        errorMessage = '用户名不存在';
      } else if (errorMessage.includes('password')) {
        errorMessage = '密码错误';
      }
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">邪修厨房</h1>
          <p className="login-subtitle">踏入邪修之道，解锁禁忌厨艺</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="手机号/用户名"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error && !username ? error : null}
            autoComplete="username"
          />
          
          <Input
            label="密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password && username ? error : null}
            autoComplete="current-password"
          />
          
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                登入中...
              </>
            ) : (
              '登 入 修 炼'
            )}
          </Button>
        </form>
        
        <div className="login-footer">
          <p>
            还没有账号？ 
            <Link to="/register" className="switch-link">
              快速注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;