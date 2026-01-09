import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/*
  Endpoint:
  /search?keyword=hat&category=Accessories&cursor=
*/
app.get("/search", async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const cursor = req.query.cursor || "";
    const category = req.query.category || "All";

    // Mapear categorias para IDs do catálogo Roblox
    const categoryMap = {
      All: null,
      Accessories: 11,
      ClassicClothes: 3,
      Bundles: 13
    };

    const categoryId = categoryMap[category];

    let url =
      `https://catalog.roblox.com/v1/search/items/details?` +
      `Keyword=${encodeURIComponent(keyword)}` +
      `&Limit=30` +
      (categoryId ? `&Category=${categoryId}` : "") +
      (cursor ? `&Cursor=${cursor}` : "");

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Catalog fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log("Catalog server running on port", PORT);
});
