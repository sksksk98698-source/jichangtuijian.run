export interface AffiliateTarget {
  id: string;
  name: string;
  targetUrl: string;
  backupUrl?: string;
  couponCode?: string;
  couponDiscount?: string;
  isNofollow: boolean;
  active: boolean;
}

export const affiliatesMap: Record<string, AffiliateTarget> = {
  guangsucloud: {
    id: 'guangsucloud',
    name: '光速云',
    targetUrl: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    couponCode: 'AMM',
    couponDiscount: '新人注册限时 8 折',
    isNofollow: true,
    active: true
  },
  feimaoyun: {
    id: 'feimaoyun',
    name: '飞猫云',
    targetUrl: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    couponCode: 'flycat888',
    couponDiscount: '季付及以上 8 折',
    isNofollow: true,
    active: true
  },
  breezenet: {
    id: 'breezenet',
    name: '微风网络',
    targetUrl: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
    couponCode: 'flat888',
    couponDiscount: '季付及以上 9 折',
    isNofollow: true,
    active: true
  },
  xingdaomeng: {
    id: 'xingdaomeng',
    name: '星岛梦',
    targetUrl: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    couponCode: 'nmw888',
    couponDiscount: '新人注册 9 折',
    isNofollow: true,
    active: true
  },
  worryfree: {
    id: 'worryfree',
    name: '无忧链接',
    targetUrl: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
    couponCode: 'wuyou666',
    couponDiscount: '新人专属优惠',
    isNofollow: true,
    active: true
  },
  twilight: {
    id: 'twilight',
    name: '暮光加速',
    targetUrl: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3',
    couponCode: 'muguang5555',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  ermaocloud: {
    id: 'ermaocloud',
    name: '二猫云',
    targetUrl: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW',
    couponCode: 'ermao5555',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  civetnet: {
    id: 'civetnet',
    name: '灵猫网络',
    targetUrl: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
    couponCode: 'lmao888',
    couponDiscount: '新人注册 9 折',
    isNofollow: true,
    active: true
  },
  jiliancloud: {
    id: 'jiliancloud',
    name: '极连云',
    targetUrl: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
    couponCode: 'ji8888',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  yuzhouyun: {
    id: 'yuzhouyun',
    name: '宇宙云',
    targetUrl: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1',
    couponCode: 'YUZHOU553',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  yuzhoucloud: {
    id: 'yuzhoucloud',
    name: '宇宙云',
    targetUrl: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1',
    couponCode: 'YUZHOU553',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  v2yun: {
    id: 'v2yun',
    name: '唯兔云',
    targetUrl: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
    couponCode: 'weitu666',
    couponDiscount: '新用户 9 折',
    isNofollow: true,
    active: true
  },
  u1s1: {
    id: 'u1s1',
    name: 'U1S1',
    targetUrl: 'https://guangs.vipaff.cc/#/?code=xhX5X22f',
    couponCode: 'akaka',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  gnt: {
    id: 'gnt',
    name: '光年梯',
    targetUrl: 'https://guangs.gntaff.com/#/?code=X1FoxjGE',
    couponCode: 'gnt6666',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  '1flyun': {
    id: '1flyun',
    name: '一翻云',
    targetUrl: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r',
    couponCode: 'yfy6666',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  sogoyun: {
    id: 'sogoyun',
    name: 'SOGO云',
    targetUrl: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7',
    couponCode: 'sss777',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  kosing: {
    id: 'kosing',
    name: '可信云',
    targetUrl: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY',
    couponCode: 'kkk333',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  speedworld: {
    id: 'speedworld',
    name: '速界',
    targetUrl: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB',
    couponCode: 'sss1111',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  flashleap: {
    id: 'flashleap',
    name: '闪跃',
    targetUrl: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm',
    couponCode: 'shanyue',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  globalcloud: {
    id: 'globalcloud',
    name: '全球云',
    targetUrl: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C',
    couponCode: 'qqy7777',
    couponDiscount: '专属优惠码',
    isNofollow: true,
    active: true
  },
  'star-warning-demo': {
    id: 'star-warning-demo',
    name: '星光云 (已预警)',
    targetUrl: '#risk-blocked',
    isNofollow: true,
    active: false
  }
};

export function getAffiliate(id: string): AffiliateTarget | undefined {
  return affiliatesMap[id];
}
