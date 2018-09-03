const baseURL = 'http://jbergen.github.io/';

// Read Synchrously
const fs = require("fs");
const dataString = fs.readFileSync("src/cms/data.json");
const data = JSON.parse(dataString);

const sitemapArray = [];
sitemapArray.push('<?xml version="1.0" encoding="UTF-8"?>');
sitemapArray.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');

data.pages.forEach(page => {
    if (!page.hide_in_nav) {
        sitemapArray.push('  <url>');
        sitemapArray.push(`    <loc>${baseURL}${page.name}</loc>`)
        sitemapArray.push('  </url>');

        if (page.name === 'home') {
            page.media.forEach(mediaId => {
                const media = data.media.find(m => mediaId === m.id);
                if (media) {
                    sitemapArray.push('  <url>');
                    sitemapArray.push(`    <loc>${baseURL}media/${media.id}</loc>`)
                    sitemapArray.push(`    <image:image>`)
                    sitemapArray.push(`      <image:loc>${baseURL}static/media/${media.filename}</image:loc>`)
                    sitemapArray.push(`      <image:title>${media.title}</image:title>`)
                    sitemapArray.push(`    </image:image>`)
                    sitemapArray.push('  </url>');
                }
            });
        }
    }
});

data.posts.forEach(post => {
    if (!post.visible) {
        sitemapArray.push('  <url>');
        sitemapArray.push(`    <loc>${baseURL}work/${post.name}</loc>`)
        sitemapArray.push('  </url>');
    }
});

sitemapArray.push('</urlset>');



// console.log(data.pages);

// console.log("Output Content : \n"+ data);
// console.log("\n *EXIT* \n");


fs.writeFile("public/sitemap.xml", sitemapArray.join('\r\n'), err => {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 