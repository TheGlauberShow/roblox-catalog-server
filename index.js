app.get("/search", async (req, res) => {
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
              `https://www.roblox.com/asset-thumbnail/image?assetId=${item.id}&width=420&height=420`
        })),
        nextCursor: data.nextPageCursor
    });
});
