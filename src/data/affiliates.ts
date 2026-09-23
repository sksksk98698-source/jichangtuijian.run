export interface AffiliateTarget {
  id: string;
  name: string;
  targetUrl: string;
  backupUrl?: string;
  couponCode?: string;
  isNofollow: boolean;
  active: boolean;
}

export const affiliatesMap: Record<string, AffiliateTarget> = {
  feimaoyun: {
    id: 'feimaoyun',
    name: '飞猫云 (FlyingCat)',
    targetUrl: 'https://jichangtuijian.run/out/feimaoyun?aff=jc2026',
    backupUrl: 'https://feimao-backup.net/aff.php?aff=jc2026',
    couponCode: 'FLY2026',
    isNofollow: true,
    active: true
  },
  yuzhouyun: {
    id: 'yuzhouyun',
    name: '宇宙云 (CosmoCloud)',
    targetUrl: 'https://jichangtuijian.run/out/yuzhouyun?aff=jc2026',
    backupUrl: 'https://cosmo-backup.io/aff.php?aff=jc2026',
    couponCode: 'COSMO88',
    isNofollow: true,
    active: true
  },
  suying666: {
    id: 'suying666',
    name: '速鹰666 (QuickHawk)',
    targetUrl: 'https://jichangtuijian.run/out/suying666?aff=jc2026',
    couponCode: 'HAWK2026',
    isNofollow: true,
    active: true
  },
  shandianmao: {
    id: 'shandianmao',
    name: '闪电猫 (FlashCat)',
    targetUrl: 'https://jichangtuijian.run/out/shandianmao?aff=jc2026',
    couponCode: 'FLASH9',
    isNofollow: true,
    active: true
  },
  mojie: {
    id: 'mojie',
    name: '魔戒 (Mojie)',
    targetUrl: 'https://jichangtuijian.run/out/mojie?aff=jc2026',
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
