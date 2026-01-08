import express from "express";
import fetch from "node-fetch";

const app = express(); // ← ISSO ESTAVA FALTANDO
const PORT = process.env.PORT || 3000;

app.get("/search", async (req, res) => {
    try {
        const q = req.query.q || "";
        const cursor = req.query.cursor || "";

        const url =
          `https://catalog.roblox.com/v1/search/items/details` +
          `?Keyword=${encodeURIComponent(q)}` +
          `&Limit=30` +
          `&Cursor=${cursor}`;

        const r = await fetch(url);
        const data = await r.json();

        res.json({
            items: data.data.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                creator: item.creatorName,
                description: item.description,
                thumbnail:
                  `https://www.roblox.com/asset-thumbnail/image?assetId=${item.id}&width=420&height=420&format=png`
            })),
            nextCursor: data.nextPageCursor
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Backend error" });
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
