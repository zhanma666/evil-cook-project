const { sequelize } = require('../config/database');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

async function initData() {
  try {
    // 创建示例用户
    const users = await User.bulkCreate([
      {
        username: '厨神小李',
        email: 'xiaoli@example.com',
        password: 'password123',
        level: '邪修大师',
        experience: 1250
      },
      {
        username: '美食家小王',
        email: 'xiaowang@example.com',
        password: 'password123',
        level: '邪修专家',
        experience: 800
      },
      {
        username: '厨房新手小张',
        email: 'xiaozhang@example.com',
        password: 'password123',
        level: '邪修学徒',
        experience: 50
      }
    ]);

    console.log('用户数据初始化完成');

    // 创建示例菜谱
    const recipes = await Recipe.bulkCreate([
      {
        title: '微波炉蒸蛋',
        'author.id': users[0].id,
        'author.username': users[0].username,
        'author.level': users[0].level,
        'author.avatar': null,
        coverImage: null,
        'metadata.cookingTime': 5,
        'metadata.difficulty': '简单',
        'metadata.costLevel': '低',
        'metadata.servings': '1人份',
        tags: ['微波炉', '早餐', '简单'],
        safetyLevel: '安全',
        materials: [
          { name: '鸡蛋', amount: '2个' },
          { name: '温水', amount: '100ml' },
          { name: '盐', amount: '适量' }
        ],
        steps: [
          { description: '将鸡蛋打入碗中，加入温水和盐，搅拌均匀', image: null },
          { description: '用保鲜膜封住碗口，用牙签扎几个小孔', image: null },
          { description: '放入微波炉中火加热2分钟，再高火加热1分钟', image: null },
          { description: '取出稍凉后即可食用', image: null }
        ],
        likes: 128,
        collects: 42,
        rating: 4.5,
        ratingCount: 20,
        season: 'spring'
      },
      {
        title: '电饭煲蛋糕',
        'author.id': users[1].id,
        'author.username': users[1].username,
        'author.level': users[1].level,
        'author.avatar': null,
        coverImage: null,
        'metadata.cookingTime': 60,
        'metadata.difficulty': '中等',
        'metadata.costLevel': '中',
        'metadata.servings': '4人份',
        tags: ['电饭煲', '甜品', '烘焙'],
        safetyLevel: '安全',
        materials: [
          { name: '鸡蛋', amount: '3个' },
          { name: '面粉', amount: '100g' },
          { name: '牛奶', amount: '100ml' },
          { name: '糖', amount: '50g' },
          { name: '油', amount: '30ml' }
        ],
        steps: [
          { description: '将蛋黄和蛋白分离', image: null },
          { description: '蛋黄中加入牛奶和油搅拌均匀', image: null },
          { description: '筛入面粉搅拌至无颗粒', image: null },
          { description: '蛋白打发至湿性发泡', image: null },
          { description: '将蛋白霜分三次加入蛋黄糊中拌匀', image: null },
          { description: '倒入电饭煲内胆，震出气泡', image: null },
          { description: '启动煮饭程序，跳闸后焖10分钟再焖10分钟', image: null }
        ],
        likes: 96,
        collects: 38,
        rating: 4.2,
        ratingCount: 15,
        season: 'summer'
      },
      {
        title: '芝士爆浆馒头',
        'author.id': users[2].id,
        'author.username': users[2].username,
        'author.level': users[2].level,
        'author.avatar': null,
        coverImage: null,
        'metadata.cookingTime': 25,
        'metadata.difficulty': '中等',
        'metadata.costLevel': '中',
        'metadata.servings': '2人份',
        tags: ['芝士', '馒头', '创新'],
        safetyLevel: '安全',
        materials: [
          { name: '馒头', amount: '2个' },
          { name: '芝士片', amount: '4片' },
          { name: '黄油', amount: '适量' }
        ],
        steps: [
          { description: '将馒头从中间切开但不要切断', image: null },
          { description: '在切口处放入芝士片', image: null },
          { description: '表面涂抹黄油', image: null },
          { description: '放入微波炉加热1分钟至芝士融化', image: null },
          { description: '小心取出，稍凉后即可食用', image: null }
        ],
        likes: 156,
        collects: 64,
        rating: 4.8,
        ratingCount: 25,
        season: 'autumn'
      }
    ]);

    console.log('菜谱数据初始化完成');
    console.log(`共创建了 ${users.length} 个用户和 ${recipes.length} 个菜谱`);
    
    process.exit(0);
  } catch (error) {
    console.error('数据初始化失败:', error);
    process.exit(1);
  }
}

// 运行初始化函数
initData();