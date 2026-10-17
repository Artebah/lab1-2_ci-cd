const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();
app.use(express.json());

let items = [
  { id: 1, name: "Item One", description: "Description for item one" },
  { id: 2, name: "Item Two", description: "Description for item two" },
];

app.get("/api/items", (req, res) => {
  res.status(200).json(items);
});

app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.status(200).json(item);
});

app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name,
    description: description || "",
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { name, description } = req.body;
  if (name) item.name = name;
  if (description !== undefined) item.description = description;

  res.status(200).json(item);
});

app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  const deletedItem = items.splice(index, 1);
  res.status(200).json(deletedItem[0]);
});

try {
  const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.log("Swagger file not found, skipping UI docs route.");
}

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
