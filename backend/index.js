console.log("Server Started");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const application = express();
const port = 3000;

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.end();

const events = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
];

const users = [
  {
    id: 1,
    name: "User 1",
    prizes: {},
    organization: {},
  },
  {
    id: 2,
    name: "User 2",
    prizes: {},
    organization: {},
  },
];

const people_amount = [];
const points_earned = [];
const covid_alerts = [];
const limits = [];
const price = [];
const address = [];
const organizations_list = [];
const organizations_by_id = [];
const startDate = [];
const endDate = [];

application.use(cors());

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

application.post("/event", (req, res) => {
  // - check all params exist, return and provide error if not
  const eventId = req.body.eventId;
  if (!eventId) {
    res.status(400).send("eventId is required");
    return;
  }

  // - query data
  const event = events.find((event) => {
    return event.id == eventId;
  });
  // const event = events.find((event) => event.id == eventId);

  // - check if data is of expected shape and return, provide error and return otherwise
  if (!event) {
    res.send({
      message: "Event not found",
    });
    return;
  }

  res.send({ data: event });
  return;
});

application.post("/user", () => {
  // Check if user is authed
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).send("userId is required");
    return;
  }

  // - query data
  const user = users.find((user) => {
    return user.id == userId;
  });
  // const event = events.find((event) => event.id == eventId);

  // - check if data is of expected shape and return, provide error and return otherwise
  if (!user) {
    res.send({
      message: "User not found",
    });
    return;
  }

  res.send({ data: user });
  return;
});

application.get("/", (req, res) => {
  res.send("Hello World");
});

application.get("/events", (req, res) => {
  res.send({ data: events });
  // res.send(points_earned);
  // res.send(people_amount);
  // res.send(people_amount);
});

application.post("/create-event", (req, res) => {
  const limit = req.body.limit;
  const price = req.body.price;
  const address = req.body.address;

  if (!limit) {
    res.status(400).send("Limit is required");
    return;
  }

  if (!price) {
    res.status(400).send("Price is required");
    return;
  }

  if (!address) {
    res.status(400).send("Address is required");
    return;
  }

  return;
});

application.post("/organizations_list", (req, res) => {});

application.post("/organizations_by_id", (req, res) => {});

application.post("/startDate", (req, res) => {});

application.post("/endDate", (req, res) => {});

application.post("/organizations_of_user_given_user_id", (req, res) => {});

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
