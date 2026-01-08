import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/search", async (req, res) => {
    const q = req.query.q || "";

    const url =
      `https://catalog.roblox.com/v1/search/items/details` +
      `?Keyword=${encodeURIComponent(q)}&Limit=30`;

    const r = await fetch(url);
    const data = await r.json();

    res.json(data.data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        creator: item.creatorName,
        description: item.description,
        thumbnail:
          `https://www.roblox.com/asset-thumbnail/image?assetId=${item.id}&width=420&height=420`
    })));
});

app.listen(PORT, () => {
    console.log("Servidor online na porta", PORT);
});
