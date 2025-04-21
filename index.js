const express = require("express");
const app = express();


let items = [
  {
    title: "Welcome to My RSS Feed",
    link: "https://yourdomain.com/welcome",
    description: "This is the first item.",
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
    <title>My Dynamic RSS Feed</title>
    <link>https://rss-monitor-1nxs.onrender.com</link>
    <description>This feed is updated in real-time via /add endpoint.</description>
    ${rssItems}
  </channel>
</rss>`;

  res.set("Content-Type", "application/rss+xml");
  res.send(xml);
});


app.get("/add", (req, res) => {
  const { title, link, description } = req.query;

  if (title && link) {
    items.unshift({
      title,
      link,
      description: description || "No description provided.",
      pubDate: new Date().toUTCString()
    });
    res.send(`✅ Item added: ${title}`);
  } else {
    res.send("⚠️ Please provide both 'title' and 'link' query parameters.");
  }
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`✅ Server is running at http://${host}:${port}`);
});
