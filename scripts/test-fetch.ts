async function test() {
  try {
    const res = await fetch('http://localhost:5173/go/guangsucloud');
    console.log('Status for /go/guangsucloud:', res.status);
    const text = await res.text();
    console.log('Contains redirect target:', text.includes('gsyvipaff.com'));
    console.log('Contains 404:', text.includes('404'));
    console.log('HTML snippet around max-w-xl:');
    const idx = text.indexOf('max-w-xl');
    if (idx !== -1) {
      console.log(text.slice(idx - 20, idx + 400));
    } else {
      console.log(text.slice(0, 500));
    }

    const res2 = await fetch('http://localhost:5173/go/yuzhouyun');
    console.log('\nStatus for /go/yuzhouyun:', res2.status);
    const text2 = await res2.text();
    console.log('Contains 404 for yuzhouyun:', text2.includes('404') || res2.status === 404);
  } catch (e) {
    console.error(e);
  }
}
test();
