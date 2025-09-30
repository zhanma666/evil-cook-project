# 邪修厨房后端API

邪修厨房项目的后端API服务，基于Node.js和Express框架构建。

## 技术栈

- Node.js
- Express
- MongoDB (通过Mongoose)
- JWT认证
- Bcrypt密码加密

## 功能特性

- 用户注册和登录
- 菜谱创建、读取、更新和删除
- 菜谱搜索和分类
- 用户个人资料管理

## 安装和运行

### 环境要求

- Node.js (v14或更高版本)
- MongoDB数据库

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建`.env`文件并配置以下变量：

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/evil-cook
JWT_SECRET=your_jwt_secret_key
```

### 开发模式运行

```bash
npm run dev
```

### 生产模式运行

```bash
npm start
```

## API接口

### 用户认证

- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户信息 (需要认证)

### 菜谱管理

- `GET /api/recipes` - 获取所有菜谱
- `GET /api/recipes/:id` - 根据ID获取菜谱
- `POST /api/recipes` - 创建菜谱 (需要认证)
- `PUT /api/recipes/:id` - 更新菜谱 (需要认证)
- `DELETE /api/recipes/:id` - 删除菜谱 (需要认证)

## 数据模型

### 用户(User)

- username: 用户名
- email: 邮箱
- password: 密码(加密存储)
- level: 等级
- experience: 经验值
- avatar: 头像URL

### 菜谱(Recipe)

- title: 标题
- author: 作者信息
- coverImage: 封面图URL
- metadata: 元数据(烹饪时间、难度、成本、份量)
- tags: 标签数组
- safetyLevel: 安全等级
- materials: 材料清单
- steps: 制作步骤
- likes: 点赞数
- collects: 收藏数

## 许可证

MIT