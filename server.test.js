const request = require("supertest");
const app = require("./server");

describe("REST API Tests", () => {
  it("GET /api/items should return list of items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("POST /api/items should create a new item", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ name: "Test Item", description: "Test Desc" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual("Test Item");
  });
});
