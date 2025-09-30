import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

// 懒加载页面组件
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Home = React.lazy(() => import('./pages/Home'));
const RecipeDetail = React.lazy(() => import('./pages/RecipeDetail'));
const Search = React.lazy(() => import('./pages/Search'));
const Profile = React.lazy(() => import('./pages/Profile'));
const CreateRecipe = React.lazy(() => import('./pages/CreateRecipe'));
const Categories = React.lazy(() => import('./pages/Categories'));
const MineralWaterNoodles = React.lazy(() => import('./pages/MineralWaterNoodles'));

// 加载指示器组件
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>加载中...</p>
  </div>
);

// 简单的权限控制组件
const ProtectedRoute = ({ children }) => {
  // 在实际应用中，这里应该检查真实的认证状态
  // 目前我们使用一个简单的localStorage标志来模拟
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // 用户未认证，重定向到登录页面
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 未认证用户访问的路由（如果已认证则重定向到首页）
const PublicRoute = ({ children }) => {
  // 在实际应用中，这里应该检查真实的认证状态
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    // 用户已认证，重定向到首页
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="background-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
            <div className="floating-element element-4"></div>
            <div className="floating-element element-5"></div>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recipe/:id" 
                element={
                  <ProtectedRoute>
                    <RecipeDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateRecipe />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories/:id" 
                element={
                  <ProtectedRoute>
                    <MineralWaterNoodles />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;