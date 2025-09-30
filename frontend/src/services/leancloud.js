import AV from 'leancloud-storage';

// LeanCloud配置
const APP_ID = 'IXJ2nt9pJ8oUQa45w7TWsb10-gzGzoHsz';
const APP_KEY = 'OuvknVSduR3nvpSilOvx2fiL';

// 初始化LeanCloud
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL: 'https://ixj2nt9p.lc-cn-n1-shared.com'
});

export default AV;