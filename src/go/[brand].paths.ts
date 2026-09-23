import { affiliatesMap } from '../data/affiliates';

export default {
  paths() {
    return Object.keys(affiliatesMap).map((id) => {
      const aff = affiliatesMap[id];
      return {
        params: {
          brand: id,
          name: aff.name,
          targetUrl: aff.targetUrl,
          couponCode: aff.couponCode || '',
          active: String(aff.active)
        }
      };
    });
  }
};
