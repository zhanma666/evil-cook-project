const { sequelize, createDatabaseIfNotExists } = require('../config/database');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// 创建初始数据
const initDb = async () => {
  try {
    // 创建数据库
    await createDatabaseIfNotExists();
    
    // 同步数据库
    await sequelize.sync({ force: true });
    console.log('数据库同步完成');

    // 创建示例用户
    const users = await User.bulkCreate([
      {
        username: '厨神小李',
        email: 'xiaoli@example.com',
        password: '123456',
        level: '邪修大师',
        avatar: null
      },
      {
        username: '美食家小王',
        email: 'xiaowang@example.com',
        password: '123456',
        level: '邪修高手',
        avatar: null
      },
      {
        username: '厨房新手小张',
        email: 'xiaozhang@example.com',
        password: '123456',
        level: '邪修学徒',
        avatar: null
      }
    ]);
    
    console.log('创建示例用户:', users.map(u => u.username));

    // 创建示例菜谱
    const recipes = [
      {
        title: "微波炉蒸蛋",
        'author.id': users[0].id,
        'author.username': users[0].username,
        'author.level': users[0].level,
        'metadata.cookingTime': 5,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 1,
        tags: ["微波炉派", "快手菜"],
        safetyLevel: "low",
        materials: [
          { name: "鸡蛋", amount: "2个" },
          { name: "温水", amount: "100ml" },
          { name: "盐", amount: "适量" }
        ],
        steps: [
          { description: "将鸡蛋打入碗中，搅拌均匀" },
          { description: "加入温水和盐，继续搅拌" },
          { description: "用微波炉加热2-3分钟即可" }
        ],
        season: null
      },
      {
        title: "电饭煲蛋糕",
        'author.id': users[0].id,
        'author.username': users[0].username,
        'author.level': users[0].level,
        'metadata.cookingTime': 60,
        'metadata.difficulty': "中等",
        'metadata.costLevel': "中等成本",
        'metadata.servings': 4,
        tags: ["电饭煲党", "甜品"],
        safetyLevel: "low",
        materials: [
          { name: "鸡蛋", amount: "3个" },
          { name: "面粉", amount: "100g" },
          { name: "牛奶", amount: "100ml" },
          { name: "糖", amount: "50g" }
        ],
        steps: [
          { description: "将鸡蛋和糖打发至起泡" },
          { description: "加入面粉和牛奶，搅拌均匀" },
          { description: "倒入电饭煲内胆，启动煮饭模式" },
          { description: "跳闸后焖10分钟即可" }
        ],
        season: null
      },
      {
        title: "空气炸锅薯条",
        'author.id': users[1].id,
        'author.username': users[1].username,
        'author.level': users[1].level,
        'metadata.cookingTime': 20,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 2,
        tags: ["空气炸锅派", "健康"],
        safetyLevel: "low",
        materials: [
          { name: "土豆", amount: "2个" },
          { name: "橄榄油", amount: "适量" },
          { name: "盐", amount: "适量" }
        ],
        steps: [
          { description: "土豆切条，用清水冲洗掉淀粉" },
          { description: "沥干水分，加入橄榄油和盐拌匀" },
          { description: "放入空气炸锅，200度烤15分钟" }
        ],
        season: null
      },
      {
        title: "电饭煲港式叉烧",
        'author.id': users[1].id,
        'author.username': users[1].username,
        'author.level': users[1].level,
        'metadata.cookingTime': 45,
        'metadata.difficulty': "中等",
        'metadata.costLevel': "中等成本",
        'metadata.servings': 3,
        tags: ["电饭煲党", "肉类"],
        safetyLevel: "medium",
        materials: [
          { name: "梅花肉", amount: "300g" },
          { name: "养乐多", amount: "1瓶" },
          { name: "生抽", amount: "1瓶" },
          { name: "老抽", amount: "适量" }
        ],
        steps: [
          { description: "梅花肉切块备用" },
          { description: "将所有材料放入电饭煲" },
          { description: "按下煮饭键，煮好后焖10分钟" },
          { description: "取出切片即可食用" }
        ],
        season: null
      },
      {
        title: "微波炉葱油拌面",
        'author.id': users[1].id,
        'author.username': users[1].username,
        'author.level': users[1].level,
        'metadata.cookingTime': 10,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 1,
        tags: ["微波炉派", "主食"],
        safetyLevel: "low",
        materials: [
          { name: "挂面", amount: "100g" },
          { name: "小葱", amount: "2根" },
          { name: "食用油", amount: "2勺" },
          { name: "酱油", amount: "1勺" },
          { name: "蚝油", amount: "1勺" }
        ],
        steps: [
          { description: "将挂面放入微波炉专用碗中，加水烫软" },
          { description: "葱段加油，微波加热1分钟至葱焦黄" },
          { description: "加入酱油和蚝油搅拌均匀" },
          { description: "将葱油浇在面上拌匀即可" }
        ],
        season: null
      },
      {
        title: "空气炸锅黄金薯角",
        'author.id': users[2].id,
        'author.username': users[2].username,
        'author.level': users[2].level,
        'metadata.cookingTime': 25,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 2,
        tags: ["空气炸锅派", "素食"],
        safetyLevel: "low",
        materials: [
          { name: "土豆", amount: "2个" },
          { name: "橄榄油", amount: "1勺" },
          { name: "黑胡椒", amount: "适量" },
          { name: "盐", amount: "适量" },
          { name: "辣椒粉", amount: "适量" }
        ],
        steps: [
          { description: "土豆洗净切角块，不削皮" },
          { description: "加入油、盐、黑胡椒和辣椒粉拌匀" },
          { description: "放入空气炸锅200度烤20分钟" },
          { description: "中途翻面一次，烤至表面金黄即可" }
        ],
        season: "autumn"
      },
      {
        title: "电饭煲糖醋排骨",
        'author.id': users[2].id,
        'author.username': users[2].username,
        'author.level': users[2].level,
        'metadata.cookingTime': 50,
        'metadata.difficulty': "中等",
        'metadata.costLevel': "中等成本",
        'metadata.servings': 3,
        tags: ["电饭煲党", "肉类"],
        safetyLevel: "medium",
        materials: [
          { name: "小排骨", amount: "500g" },
          { name: "生抽", amount: "2勺" },
          { name: "老抽", amount: "1勺" },
          { name: "蚝油", amount: "1勺" },
          { name: "白糖", amount: "2勺" },
          { name: "陈醋", amount: "1.5勺" },
          { name: "可乐", amount: "1瓶" },
          { name: "香叶", amount: "2片" },
          { name: "桂皮", amount: "1小块" }
        ],
        steps: [
          { description: "小排骨焯水后放入电饭煲" },
          { description: "加入所有调料和可乐" },
          { description: "按下煮饭键，煮好后再加半勺陈醋" },
          { description: "继续焖煮2分钟，撒上葱花和芝麻即可" }
        ],
        season: "winter"
      },
      {
        title: "微波炉焦糖布丁",
        'author.id': users[2].id,
        'author.username': users[2].username,
        'author.level': users[2].level,
        'metadata.cookingTime': 15,
        'metadata.difficulty': "中等",
        'metadata.costLevel': "低成本",
        'metadata.servings': 4,
        tags: ["微波炉派", "甜品"],
        safetyLevel: "low",
        materials: [
          { name: "鸡蛋", amount: "2个" },
          { name: "牛奶", amount: "200ml" },
          { name: "糖", amount: "50g" },
          { name: "香草精", amount: "几滴" }
        ],
        steps: [
          { description: "将糖放入微波炉专用容器中加热1分钟至焦糖色" },
          { description: "鸡蛋打散，加入牛奶和香草精拌匀" },
          { description: "将蛋液过筛倒入焦糖中" },
          { description: "微波炉加热5分钟，冷却后冷藏口感更佳" }
        ],
        season: "summer"
      },
      {
        title: "春季养生蔬菜汤",
        'author.id': users[0].id,
        'author.username': users[0].username,
        'author.level': users[0].level,
        'metadata.cookingTime': 30,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 4,
        tags: ["电饭煲党", "素食", "养生"],
        safetyLevel: "low",
        materials: [
          { name: "胡萝卜", amount: "1根" },
          { name: "白萝卜", amount: "半根" },
          { name: "玉米", amount: "1根" },
          { name: "香菇", amount: "5朵" },
          { name: "豆腐", amount: "200g" },
          { name: "盐", amount: "适量" }
        ],
        steps: [
          { description: "所有蔬菜切块，豆腐切丁" },
          { description: "将所有材料放入电饭煲" },
          { description: "加入适量水，按下煮饭键" },
          { description: "煮好后加盐调味即可" }
        ],
        season: "spring"
      },
      {
        title: "夏日清凉绿豆汤",
        'author.id': users[1].id,
        'author.username': users[1].username,
        'author.level': users[1].level,
        'metadata.cookingTime': 60,
        'metadata.difficulty': "简单",
        'metadata.costLevel': "低成本",
        'metadata.servings': 4,
        tags: ["微波炉派", "甜品", "解暑"],
        safetyLevel: "low",
        materials: [
          { name: "绿豆", amount: "200g" },
          { name: "冰糖", amount: "适量" },
          { name: "水", amount: "1.5L" }
        ],
        steps: [
          { description: "绿豆洗净，放入微波炉专用容器" },
          { description: "加入水，微波炉加热20分钟" },
          { description: "加入冰糖搅拌至融化" },
          { description: "冷却后放入冰箱冷藏口感更佳" }
        ],
        season: "summer"
      }
    ];

    for (const recipeData of recipes) {
      const recipe = await Recipe.create(recipeData);
      console.log('创建示例菜谱:', recipe.title);
    }

    console.log('数据库初始化完成');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
};

initDb();