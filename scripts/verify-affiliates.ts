import { airportsData } from '../src/data/airports.ts';
import { affiliatesMap } from '../src/data/affiliates.ts';

console.log('Checking all 19 airports and their affiliate links:');
for (const a of airportsData) {
  const aff = affiliatesMap[a.id];
  if (!aff) {
    console.error('MISSING AFFILIATE FOR:', a.id, a.name);
  } else {
    console.log(`${a.id} (${a.name}) -> ${aff.targetUrl} [Code: ${aff.couponCode || 'N/A'}]`);
  }
}
