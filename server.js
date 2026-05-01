const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

/* CREATE ORDER */
app.post("/order", (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    status: "Waiting",
    driver: null
  };

  orders.push(order);
  res.json(order);
});

/* GET ORDERS */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/* ACCEPT ORDER */
app.post("/accept/:id", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);

  if (order.driver) {
    return res.json({ error: "Already taken" });
  }

  order.driver = req.body.driver;
  order.status = "Out for Delivery";

  res.json(order);
});

app.listen(3000, () => console.log("Server running"));