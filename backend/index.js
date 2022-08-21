console.log("Server Started");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Sequelize } = require("sequelize");
import { DataTypes } from "@sequelize/core";
const mysql = require("mysql2/promise");
const config = require("config.json");

module.exports = db = {};

initializeDB();

async function initializeDB() {
  const { host, port, user, password, database } = config.database;

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "mysql",
  });
}

const application = express();
const port = 3000;

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

//Creating models below:
const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primarykey: true,
    },

    username: {
      type: DataTypes.STRING,
    },

    firstname: {
      type: DataTypes.STRING,
    },

    lastname: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },

    //add image pfp attribute here
  }
  // sequelize has auto plurization for table name, so it dosnt need to be declared
);

const Organization = sequelize.define("Organization", {
  organizationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primarykey: true,
  },

  organizationName: {
    type: DataTypes.STRING,
  },

  // userId: {
  //   //orginization host/owner
  //   type: DataTypes.INTEGER,
  // },

  //add image pfp attribute here
});

const Event = sequelize.define("Event", {
  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primarykey: true,
  },

  organizationName: {
    type: DataTypes.STRING,
  },

  greeting: {
    type: DataTypes.STRING,
  },

  maxAttendees: {
    type: DataTypes.STRING,
  },

  price: {
    type: DataTypes.FLOAT,
  },

  allowUnregistered: {
    type: DataTypes.BOOLEAN,
  },

  startDate: {
    type: DataTypes.DATE,
  },

  endDate: {
    type: DataTypes.DATE,
  },

  discountPrecent: {
    type: DataTypes.FLOAT,
  },

  discountPoints: {
    type: DataTypes.INTEGER,
  },

  // userId: {
  //   //orginization host/owner
  //   type: DataTypes.INTEGER,
  // },

  //add image pfp attribute here
});
const Attendance = sequelize.define("Attendance", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: "eventId",
    },
  },
  attended: {
    type: DataTypes.BOOLEAN,
  },
});

User.belongsToMany(Event, { through: Attendance });
Event.belongsToMany(User, { through: Attendance });

const PointCount = sequelize.define("PointCount", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Organization,
      key: "organizationId",
    },
  },
  points: {
    type: DataTypes.INTEGER,
  },
});

User.belongsToMany(Organization, { through: PointCount });
Organization.belongsToMany(User, { through: PointCount });

User.hasMany(Organization, { foreignKey: "organizationId" });
Organization.belongsTo(User, { foreignKey: "userId" });

Event.belongsTo(Organization, { foreignKey: "organizationId" });
Organization.hasMany(Event, { foreignKey: "eventId" });

const events = [
  {
    eventId: 1,
    name: "Event 1",
    startDate: {},
    endDate: {},
    pointsEarned: {},
    address: {},
    details: [
      {
        name: {},
        type: {},
        content: {},
      },
    ],
  },
  {
    eventId: 2,
    name: "Event 2",
    startDate: {},
    endDate: {},
    pointsEarned: {},
    address: {},
    details: [
      {
        name: {},
        type: {},
        content: {},
      },
    ],
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

application.get("/get-event-by-user", (req, res) => {
  // Returning _____ based on userId and eventId
  const userId = res.body.userId;
  const eventId = res.body.eventId;

  if (!userId || !eventId) {
    res.status(400).send("enter all the required fields");
    return;
  }

  const user = users.find((user) => user.id == userId);
  const event = events.find((event) => event.id == eventId);
  // fetch user points

  res.status(200).send({ data: event });

  // res.send({ data: events });
});

application.post("/create-organization", (req, res) => {
  //creating an organization
  const userId = req.body.userId;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const image = req.body.image;

  if (!userId || !username || !firstName || !lastName || !email || !image) {
    return res.status(400).json({
      error: "enter all the required fields",
    });
  }

  const organizationId = 1;

  res.status(200).send({
    message: "organization created",
    data: organizationId, //replace this with organization ID
  });

  return;
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

  const eventId = 1;

  res.status(200).send({
    message: "event created",
    data: eventId, //replace this with event ID
  });

  return;
});

connection.end();

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
