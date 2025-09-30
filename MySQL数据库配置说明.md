# MySQL数据库配置说明

## 数据库配置信息

根据提供的配置信息，项目将使用以下MySQL数据库配置：

- 端口: 3306
- 数据库名: evil_cook
- 用户名: root
- 密码: 26210
- 主机: localhost

## 配置文件

### .env文件
```
PORT=5000
DB_NAME=evil_cook
DB_USER=root
DB_PASSWORD=26210
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=evil-cook-secret-key
```

### config/database.js
```javascript
const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize('evil_cook', 'root', '26210', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false, // 设置为true可以看到SQL日志
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
```

## 数据表结构

### 用户表 (users)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INTEGER (主键) | 用户ID |
| username | STRING | 用户名 |
| email | STRING | 邮箱 |
| password | STRING | 密码(加密存储) |
| level | STRING | 用户等级 |
| experience | INTEGER | 经验值 |
| avatar | STRING | 头像URL |
| createdAt | DATETIME | 创建时间 |
| updatedAt | DATETIME | 更新时间 |

### 菜谱表 (recipes)
| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | INTEGER (主键) | 菜谱ID |
| title | STRING | 菜谱标题 |
| author_id | INTEGER | 作者ID |
| author_username | STRING | 作者用户名 |
| author_level | STRING | 作者等级 |
| author_avatar | STRING | 作者头像 |
| cover_image | STRING | 封面图URL |
| cooking_time | INTEGER | 烹饪时间 |
| difficulty | STRING | 难度等级 |
| cost_level | STRING | 成本等级 |
| servings | INTEGER | 份量 |
| tags | JSON | 标签数组 |
| safety_level | ENUM('low', 'medium', 'high') | 安全等级 |
| materials | JSON | 材料清单 |
| steps | JSON | 制作步骤 |
| likes | INTEGER | 点赞数 |
| collects | INTEGER | 收藏数 |
| createdAt | DATETIME | 创建时间 |
| updatedAt | DATETIME | 更新时间 |

## 初始化数据

项目包含一个初始化脚本，用于创建示例数据：
- 1个示例用户
- 3个示例菜谱（微波炉蒸蛋、电饭煲蛋糕、空气炸锅薯条）

## 使用方法

1. 确保MySQL服务正在运行
2. 创建数据库:
   ```sql
   CREATE DATABASE evil_cook;
   ```
3. 安装依赖:
   ```bash
   npm install
   ```
4. 初始化数据库:
   ```bash
   npm run init-db
   ```
5. 启动开发服务器:
   ```bash
   npm run dev
   ```

## 注意事项

1. 请确保MySQL服务正在运行且可访问
2. 确保提供的数据库用户具有创建表和插入数据的权限
3. 如果需要修改数据库配置，请更新`.env`文件中的相应字段