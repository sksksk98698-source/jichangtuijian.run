import fs from 'node:fs';

console.log('=== Checking Homepage (index.html) ===');
const homeHtml = fs.readFileSync('src/.vitepress/dist/index.html', 'utf8');
const homeCan = homeHtml.match(/<link rel="canonical"[^>]+>/);
console.log('Homepage Canonical:', homeCan ? homeCan[0] : 'None');

const homeLdMatches = [...homeHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('Homepage Schemas count:', homeLdMatches.length);
homeLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Schema ${idx + 1} Type:`, parsed['@type']);
  } catch (e) {
    console.log(`Schema ${idx + 1} Parse Error`);
  }
});

console.log('\n=== Checking Review Page (reviews/guangsucloud.html) ===');
const reviewHtml = fs.readFileSync('src/.vitepress/dist/reviews/guangsucloud.html', 'utf8');
const reviewCan = reviewHtml.match(/<link rel="canonical"[^>]+>/);
console.log('Review Canonical:', reviewCan ? reviewCan[0] : 'None');

const reviewLdMatches = [...reviewHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('Review Schemas count:', reviewLdMatches.length);
reviewLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Schema ${idx + 1} Type:`, parsed['@type']);
  } catch (e) {
    console.log(`Schema ${idx + 1} Parse Error`);
  }
});

console.log('\n=== Checking Category Page (recommend/index.html) ===');
const catHtml = fs.readFileSync('src/.vitepress/dist/recommend/index.html', 'utf8');
const catCan = catHtml.match(/<link rel="canonical"[^>]+>/);
console.log('Category Canonical:', catCan ? catCan[0] : 'None');

const catLdMatches = [...catHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('Category Schemas count:', catLdMatches.length);
catLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Schema ${idx + 1} Type:`, parsed['@type']);
  } catch (e) {
    console.log(`Schema ${idx + 1} Parse Error`);
  }
});

console.log('\n=== Checking Compare Page (compare/guangsu-vs-feimao.html) ===');
const cmpHtml = fs.readFileSync('src/.vitepress/dist/compare/guangsu-vs-feimao.html', 'utf8');
const cmpCan = cmpHtml.match(/<link rel="canonical"[^>]+>/);
console.log('Compare Canonical:', cmpCan ? cmpCan[0] : 'None');

const cmpLdMatches = [...cmpHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log('Compare Schemas count:', cmpLdMatches.length);
cmpLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Schema ${idx + 1} Type:`, parsed['@type']);
  } catch (e) {
    console.log(`Schema ${idx + 1} Parse Error`);
  }
});
