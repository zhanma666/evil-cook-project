const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const Collect = require('../models/Collect');
const Like = require('../models/Like');
const User = require('../models/User');

// 获取所有菜谱（支持分页和季节筛选）
exports.getRecipes = async (req, res, next) => {
  try {
    const { season, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let where = {};
    
    // 如果有季节参数，则筛选对应季节的菜谱
    if (season) {
      where.season = season;
    }
    
    // 获取菜谱总数
    const totalCount = await Recipe.count({ where });
    
    // 获取菜谱数据
    const recipes = await Recipe.findAll({ 
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    // 计算总页数
    const totalPages = Math.ceil(totalCount / limit);
    
    res.status(200).json({
      success: true,
      data: {
        recipes: recipes || [],
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 根据ID获取菜谱
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// 创建菜谱
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    
    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// 更新菜谱
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    await recipe.update(req.body);
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// 删除菜谱
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    await recipe.destroy();
    
    res.status(200).json({
      success: true,
      message: '菜谱删除成功'
    });
  } catch (error) {
    next(error);
  }
};

// 获取菜谱评论
exports.getRecipeComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { recipeId: req.params.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// 添加菜谱评论
exports.addRecipeComment = async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const userId = req.user.id; // 从认证中间件获取用户ID
    
    // 获取用户信息
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('用户未找到');
      error.statusCode = 404;
      throw error;
    }
    
    // 创建评论
    const comment = await Comment.create({
      content,
      parentId: parentId || null,
      recipeId: req.params.id,
      'author.id': userId,
      'author.username': user.username,
      'author.level': user.level,
      'author.avatar': user.avatar
    });
    
    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    next(error);
  }
};

// 点赞菜谱
exports.likeRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recipeId = req.params.id;
    
    // 检查是否已经点赞
    const existingLike = await Like.findOne({
      where: { userId, recipeId }
    });
    
    if (existingLike) {
      // 如果已经点赞，则取消点赞
      await existingLike.destroy();
      
      // 减少菜谱的点赞数
      await Recipe.increment('likes', { by: -1, where: { id: recipeId } });
      
      res.status(200).json({
        success: true,
        message: '取消点赞成功'
      });
    } else {
      // 如果没有点赞，则添加点赞
      await Like.create({ userId, recipeId });
      
      // 增加菜谱的点赞数
      await Recipe.increment('likes', { by: 1, where: { id: recipeId } });
      
      res.status(200).json({
        success: true,
        message: '点赞成功'
      });
    }
  } catch (error) {
    next(error);
  }
};

// 收藏菜谱
exports.collectRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recipeId = req.params.id;
    
    // 检查是否已经收藏
    const existingCollect = await Collect.findOne({
      where: { userId, recipeId }
    });
    
    if (existingCollect) {
      // 如果已经收藏，则取消收藏
      await existingCollect.destroy();
      
      // 减少菜谱的收藏数
      await Recipe.increment('collects', { by: -1, where: { id: recipeId } });
      
      res.status(200).json({
        success: true,
        message: '取消收藏成功'
      });
    } else {
      // 如果没有收藏，则添加收藏
      await Collect.create({ userId, recipeId });
      
      // 增加菜谱的收藏数
      await Recipe.increment('collects', { by: 1, where: { id: recipeId } });
      
      res.status(200).json({
        success: true,
        message: '收藏成功'
      });
    }
  } catch (error) {
    next(error);
  }
};

// 为菜谱评分
exports.rateRecipe = async (req, res, next) => {
  try {
    const { rating } = req.body; // 评分值（1-5）
    const recipeId = req.params.id;
    
    // 验证评分值
    if (rating < 1 || rating > 5) {
      const error = new Error('评分值必须在1-5之间');
      error.statusCode = 400;
      throw error;
    }
    
    // 获取菜谱
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    // 计算新的平均评分
    const newRatingCount = recipe.ratingCount + 1;
    const newRating = (recipe.rating * recipe.ratingCount + rating) / newRatingCount;
    
    // 更新菜谱评分
    await recipe.update({
      rating: newRating,
      ratingCount: newRatingCount
    });
    
    res.status(200).json({
      success: true,
      message: '评分成功',
      data: {
        rating: newRating
      }
    });
  } catch (error) {
    next(error);
  }
};

// 上传菜谱封面图
exports.uploadRecipeCover = async (req, res, next) => {
  try {
    // 这里应该集成云存储服务SDK，例如阿里云OSS、七牛云等
    // 为了简化示例，我们假设图片已经上传并返回了URL
    const { imageUrl } = req.body;
    const recipeId = req.params.id;
    
    // 获取菜谱
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    // 更新菜谱封面图
    await recipe.update({ coverImage: imageUrl });
    
    res.status(200).json({
      success: true,
      message: '封面图上传成功',
      data: {
        imageUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// 上传菜谱步骤图
exports.uploadStepImage = async (req, res, next) => {
  try {
    // 这里应该集成云存储服务SDK，例如阿里云OSS、七牛云等
    // 为了简化示例，我们假设图片已经上传并返回了URL
    const { imageUrl, stepIndex } = req.body;
    const recipeId = req.params.id;
    
    // 获取菜谱
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      const error = new Error('菜谱未找到');
      error.statusCode = 404;
      throw error;
    }
    
    // 更新步骤图片
    const steps = recipe.steps || [];
    if (stepIndex >= 0 && stepIndex < steps.length) {
      steps[stepIndex].image = imageUrl;
      await recipe.update({ steps });
      
      res.status(200).json({
        success: true,
        message: '步骤图上传成功',
        data: {
          imageUrl
        }
      });
    } else {
      const error = new Error('无效的步骤索引');
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// 上传用户头像
exports.uploadUserAvatar = async (req, res, next) => {
  try {
    // 这里应该集成云存储服务SDK，例如阿里云OSS、七牛云等
    // 为了简化示例，我们假设图片已经上传并返回了URL
    const { imageUrl } = req.body;
    const userId = req.user.id;
    
    // 获取用户
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error('用户未找到');
      error.statusCode = 404;
      throw error;
    }
    
    // 更新用户头像
    await user.update({ avatar: imageUrl });
    
    res.status(200).json({
      success: true,
      message: '头像上传成功',
      data: {
        imageUrl
      }
    });
  } catch (error) {
    next(error);
  }
};