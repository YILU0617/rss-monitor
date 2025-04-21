const express = require("express");
const app = express();

let currentTitle = "Hello RSS2";

app.get("/", (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>My RSS Feed</title>
        <link>https://yourdomain.com/</link>
        <description>A simple RSS feed</description>
        <item>
          <title>${currentTitle}</title>
          <link>https://yourdomain.com/article</link>
          <description>This is a test article</description>
          <pubDate>${new Date().toUTCString()}</pubDate>
        </item>
        
      </channel>
    </rss>
  `;
  res.set("Content-Type", "application/rss+xml");
  res.send(xml);
});

app.get("/update", (req, res) => {
  const newTitle = req.query.title;
  if (newTitle) {
    currentTitle = newTitle;
    res.send(`✅ Title updated to: ${newTitle}`);
  } else {
    res.send("⚠️ Use /update?title=xxx to change the RSS title");
  }
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`✅ Server is running at http://${host}:${port}`);
});

