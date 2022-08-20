console.log("Server Started");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const application = express();
const port = 3000;

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

//creating the users table:
const User = sequelize.define("User", {});

const events = [
  {
    eventId: 1,
    name: "Event 1",
    startDate: {},
    endDate: {},
  },
  {
    eventId: 2,
    name: "Event 2",
    startDate: {},
    endDate: {},
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
const organizations_list = [
  {
    name: {},
  },
];
const startDate = [];
const endDate = [];

application.use(cors());

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

//what is post request doing? pls comment ffs lmao

// application.post("/event", (req, res) => {
//   const eventId = req.body.eventId;
//   if (!eventId) {
//     res.status(400).send("eventId is required");
//     return;
//   }

//   const event = events.find((event) => event.id == eventId);

//   if (!event) {
//     res.send({
//       message: "Event not found",
//     });
//     return;
//   }

//   res.send({ data: event });
//   return;
// });

application.post("/user", () => {
  // Check if user is authed
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).send("userId is required");
    return;
  }

  const user = users.find((user) => user.userId == userId);

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
  //retrieves event specific info

  //first retrive all events form the
  res.send({ data: events });
  // res.send(points_earned);
  // res.send(people_amount);
  // res.send(people_amount);
});

application.get("/get-event", (req, res) => {
  // Returning _____ based on userId and eventId
  const userId = res.body.userId;
  const eventId = res.body.eventId;

  if (!userId || !eventId) {
    res.status(400).send("enter all the required fields");
    return;
  }

  const user = users.find((user) => user.id == userId);
  const event = events.find((event) => event.id == eventId);

  const sendBack = [{}];

  res.send({ data: events });
});

application.post("/create-event", (req, res) => {
  //creating an event

  //CAN WE MAKE THIS RETURN A QR CODE THAT GIVES EVENT INFO?
  // NO, YOU SEND A URL AND THE FRONTEND GENERATES THE QR CODE

  //event should have:
  //eventID, eventName, organizerID, platformType, desc, currAttendees, maxBookings, regPrice, unregUsers, startDate, startTime, duration

  const eventID = res.body.eventID;
  const organizerID = res.body.organizerID;
  const platformType = res.body.platformType;
  const desc = res.body.desc;
  const currAttendees = res.body.currAttendees;
  const maxBookings = res.body.maxBookings;
  const regPrice = res.body.regPrice;
  const unregUsers = res.body.unregUsers; //should be default to false
  const startDate = res.body.startDate;
  const startTime = res.body.startTime;
  const duration = res.body.duration;

  if (
    !eventID ||
    !organizerID ||
    !platformType ||
    !desc ||
    !currAttendees ||
    !maxBookings ||
    !regPrice ||
    !startDate ||
    !startTime ||
    !duration
  ) {
    return res.status(400).json({
      error: "enter all the required fields",
    });
  }
  // const limit = req.body.limit;
  // const price = req.body.price;
  // const address = req.body.address;

  // if (!limit) {
  //   res.status(400).send("Limit is required");
  //   return;
  // }

  // if (!price) {
  //   res.status(400).send("Price is required");
  //   return;
  // }

  // if (!address) {
  //   res.status(400).send("Address is required");
  //   return;
  // }

  //put it into the database here:

  res.status(200).send({
    message: "event created",
    data: "event_data", //replace this with data about the event
  });

  return;
});

application.post("/organizations", (req, res) => {
  const userId = req.body.userId;

  res.status(200).send({
    data: organizations,
  });

  const organization = organizations.find(
    (organization) => organization.id == userId
  );
});

connection.end();

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
