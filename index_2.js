const express = require("express");
const app = express();


let items = [
  {
    title: "Hello RSS1",
    link: "https://yourdomain.com/article",
    description: "This is a test article",
    pubDate: new Date().toUTCString()
  }
];


app.get("/", (req, res) => {
  const rssItems = items.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>
  `).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>My RSS Feed</title>
    <link>https://yourdomain.com/</link>
    <description>A simple RSS feed</description>
    ${rssItems}
  </channel>
</rss>`;

  res.set("Content-Type", "application/rss+xml");
  res.send(xml);
});

// 用 /add?title=xxx&link=xxx&description=xxx 添加新内容
app.get("/add", (req, res) => {
  const { title, link, description } = req.query;

  if (title && link) {
    items.unshift({
      title,
      link,
      description: description || "No description.",
      pubDate: new Date().toUTCString()
    });
    res.send(`✅ Item added: ${title}`);
  } else {
    res.send("⚠️ Please provide both 'title' and 'link' parameters.");
  }
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`✅ Server is running at http://${host}:${port}`);
});
