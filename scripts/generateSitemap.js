const baseURL = 'https://jbergen.github.io/';

// Read Synchrously
const fs = require("fs");
const dataString = fs.readFileSync("src/cms/data.json");
const data = JSON.parse(dataString);

// get built asset manifest so we can use the actual urls that webpack will use
const assetManifest = fs.readFileSync("build/asset-manifest.json");
const manifestData = JSON.parse(assetManifest);

const sitemapArray = [];
sitemapArray.push('<?xml version="1.0" encoding="UTF-8"?>');
sitemapArray.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');

let nodeCount = 0;

const addImageMedia = (sitemap, mediaProvider) => {
    if (!mediaProvider.media) { return; } 
    mediaProvider.media.forEach(mediaId => {
        const media = data.media.find(m => mediaId === m.id);
        if (media) {
            let pathKey = `static/media/${media.filename}`;
            let assetPath = manifestData[pathKey];
            if (assetPath) {
                sitemap.push(`<image:image>`);
                sitemap.push(`<image:loc>${baseURL}${assetPath}</image:loc>`);
                if (media.title) {
                    sitemap.push(`<image:title>${media.title}</image:title>`);
                }
                sitemap.push(`</image:image>`);
                nodeCount++;
            }
        }
    });
};

// parse through each page
data.pages.forEach(page => {
    if (page.hide_in_nav) { return; }
    let pageName = page.name === 'home' ? '' : page.name;
    sitemapArray.push('<url>');
    sitemapArray.push(`<loc>${baseURL}${pageName}</loc>`);
    addImageMedia(sitemapArray, page);
    sitemapArray.push('</url>');
    nodeCount++;
});

// parse through each post
data.posts.forEach(post => {
    if (!post.visible) { return; } // skip if post is hidden
    if (!post.media) { return; } // skip if post has no media
    sitemapArray.push('<url>');
    sitemapArray.push(`<loc>${baseURL}work/${post.name}</loc>`);
    addImageMedia(sitemapArray, post);
    sitemapArray.push('</url>');
    nodeCount++;
});

sitemapArray.push('</urlset>');

fs.writeFile("public/sitemap.xml", sitemapArray.join(''), err => {
    if (err) {
        return console.log(err);
    }

    console.log(`Sitemap Created. Published ${nodeCount} nodes`);
}); 