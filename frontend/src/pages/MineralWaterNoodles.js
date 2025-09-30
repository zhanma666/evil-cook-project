import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import './MineralWaterNoodles.css';

const MineralWaterNoodles = () => {
  // 面食做法数据
  const practices = [
    {
      id: 1,
      title: "精准量具应用",
      description: "550ml矿泉水瓶代替厨房秤的妙用",
      icon: "⚖️",
      tips: [
        "4格的面粉就是100g（累计5瓶4格面粉就可以得到500g面粉）",
        "1瓶盖酵母粉就是5g",
        "6格的温水就是250g（从瓶底开始计数）"
      ]
    },
    {
      id: 2,
      title: "发酵辅助工具",
      description: "利用矿泉水瓶提升发酵效率",
      icon: "酦",
      tips: [
        "恒温发酵法：将40度的温水装入500ml的矿泉水瓶，将其埋入面团中央，创造35度的恒温环境，发酵时间缩短至45分钟（常温情况下需要1.5个小时）",
        "摇面发酵法：将面粉，酵母，温水装入瓶中摇30秒成团，倒出来后直接发酵，可以轻松省去揉面的步骤"
      ]
    },
    {
      id: 3,
      title: "摇面糊容器",
      description: "矿泉水瓶制作各类面食",
      icon: "🥤",
      tips: [
        "制作松饼：鸡蛋1个➕面粉100g➕牛奶150ml➕糖10g，将这些装入瓶中，摇晃1分钟后醒发20分钟，瓶口挤出来的面糊自然成圆形",
        "南瓜馒头改良：将南瓜泥与面粉按照1:2的比例装瓶摇匀，加入半瓶盖酵母粉后二次摇晃"
      ]
    }
  ];

  return (
    <div className="mineral-water-noodles-container">
      {/* 页面头部 */}
      <header className="page-header">
        <div className="header-content">
          <Link to="/home" className="back-link">← 返回首页</Link>
          <h1 className="page-title">矿泉水瓶面食妙用</h1>
          <p className="page-subtitle">三大不得不提的应用场景</p>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="page-main">
        <section className="introduction-section">
          <Card className="intro-card">
            <div className="intro-content">
              <h2>为什么选择矿泉水瓶？</h2>
              <p>在面食制作中，一个普通的矿泉水瓶可以发挥巨大作用。它不仅环保，而且精确，是每个家庭厨房的好帮手。</p>
              <ul>
                <li>✅ 精准量具替代厨房秤</li>
                <li>✅ 发酵辅助工具提升效率</li>
                <li>✅ 摇面糊容器简化操作</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* 做法展示区域 */}
        <section className="practices-section">
          <h2 className="section-title">三大应用场景</h2>
          <div className="practices-grid">
            {practices.map((practice) => (
              <Card key={practice.id} className="practice-card">
                <div className="practice-header">
                  <div className="practice-icon">{practice.icon}</div>
                  <h3 className="practice-title">{practice.title}</h3>
                </div>
                <p className="practice-description">{practice.description}</p>
                <div className="practice-tips">
                  <h4>具体做法：</h4>
                  <ul>
                    {practice.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 使用建议 */}
        <section className="tips-section">
          <Card className="tips-card">
            <h3>使用小贴士</h3>
            <ul>
              <li>使用前请确保矿泉水瓶清洁干净</li>
              <li>标记刻度线可以帮助更精确测量</li>
              <li>不同品牌矿泉水瓶容量可能略有差异，首次使用建议先校准</li>
              <li>摇晃时请盖紧瓶盖，避免溢出</li>
            </ul>
          </Card>
        </section>

        {/* 行动按钮 */}
        <div className="actions-section">
          <Button 
            variant="primary" 
            size="large" 
            onClick={() => alert('创建菜谱功能待实现')}
          >
            创建相关菜谱
          </Button>
          <Button 
            variant="secondary" 
            size="large" 
            onClick={() => window.history.back()}
          >
            返回上一页
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MineralWaterNoodles;