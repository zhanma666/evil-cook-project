# 后端MVP开发报告

## 1. 概述

本文档记录了邪修厨房项目后端MVP（最小可行产品）的开发过程和实现内容。该MVP旨在提供一个基础但功能完整的后端服务，用于替换前端项目中的模拟数据，为应用提供真实的API支持。

## 2. 技术栈

- Node.js
- Express.js
- MongoDB (通过Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js

## 3. 已实现功能

### 3.1 用户管理
- 用户注册
- 用户登录
- 用户信息获取
- 密码加密存储
- JWT令牌认证

### 3.2 菜谱管理
- 获取所有菜谱列表
- 根据ID获取特定菜谱
- 创建新菜谱（需认证）
- 更新菜谱（需认证）
- 删除菜谱（需认证）

### 3.3 数据模型

#### 用户模型 (User)
- username: 用户名
- email: 邮箱
- password: 加密密码
- level: 用户等级
- experience: 经验值
- avatar: 头像URL

#### 菜谱模型 (Recipe)
- title: 菜谱标题
- author: 作者信息（关联用户）
- coverImage: 封面图URL
- metadata: 元数据（烹饪时间、难度、成本、份量）
- tags: 标签数组
- safetyLevel: 安全等级
- materials: 材料清单
- steps: 制作步骤
- likes: 点赞数
- collects: 收藏数

### 3.4 API接口

#### 用户认证
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户信息（需认证）

#### 菜谱管理
- `GET /api/recipes` - 获取所有菜谱
- `GET /api/recipes/:id` - 根据ID获取菜谱
- `POST /api/recipes` - 创建菜谱（需认证）
- `PUT /api/recipes/:id` - 更新菜谱（需认证）
- `DELETE /api/recipes/:id` - 删除菜谱（需认证）

## 4. 项目结构

```
backend/
├── src/
│   ├── controllers/
│   │   ├── recipeController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── routes/
│   │   ├── recipes.js
│   │   └── users.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## 5. 环境配置

项目使用`.env`文件管理环境变量：

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/evil-cook
JWT_SECRET=evil-cook-secret-key
```

## 6. 前端集成

前端项目已更新以使用真实的后端API：

1. 菜谱详情页面([RecipeDetail.js](file://a:/s/sai/er/j/evil-cook-project/frontend/src/pages/RecipeDetail.js))现在从`http://localhost:5000/api/recipes/:id`获取数据
2. 首页([Home.js](file://a:/s/sai/er/j/evil-cook-project/frontend/src/pages/Home.js))从`http://localhost:5000/api/recipes`获取推荐菜谱
3. 添加了错误处理和加载状态显示
4. 保留了模拟数据作为后备方案，以防后端服务不可用

## 7. 运行说明

### 启动后端服务

```bash
cd evil-cook-project/backend
npm install
npm run dev
```

### 启动前端应用

```bash
cd evil-cook-project/frontend
npm install
npm start
```

## 8. 后续改进建议

1. 添加数据验证和错误处理
2. 实现分页和搜索功能
3. 添加菜谱点赞和收藏功能
4. 实现图片上传功能
5. 添加评论系统
6. 实现更完善的权限控制
7. 添加API文档（如Swagger）
8. 编写单元测试和集成测试

## 9. 总结

该后端MVP为邪修厨房项目提供了基础但完整的后端服务，实现了用户管理和菜谱管理的核心功能。通过JWT认证和Bcrypt密码加密，确保了用户数据的安全性。前端项目已成功集成该API，替换了原有的模拟数据，使应用更加真实可用。