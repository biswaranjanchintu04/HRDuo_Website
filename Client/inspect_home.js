const https = require('https');

https.get('https://www.attendancekart.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract nav links
    const navMatch = data.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch) {
      const links = navMatch[0].match(/<a[^>]*>([\s\S]*?)<\/a>/gi) || [];
      console.log('NAV LINKS:', links.map(l => l.replace(/<[^>]+>/g, '').trim()).filter(Boolean));
    }

    // Extract all section text summaries
    const sections = data.match(/<section[\s\S]*?<\/section>/gi) || [];
    console.log('NUMBER OF SECTIONS:', sections.length);
    sections.forEach((sec, idx) => {
      const heading = sec.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
      const text = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180);
      console.log(`SECTION ${idx + 1}: [${heading ? heading[1].replace(/<[^>]+>/g, '').trim() : 'No Heading'}] -> ${text}`);
    });
  });
}).on('error', err => console.error(err));
