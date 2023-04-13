console.log("Server Started");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

// const { DataTypes } = require("@sequelize/core");
// const config = require("./config/config.json");

// async () => {
// module.exports = db = {};

// const { host, dbPort, user, password, database } = config.database;

// const connection = await mysql.createConnection({
//   host,
//   dbPort,
//   user,
//   password,
// });

require("dotenv").config();
const application = express();
const port = 3000;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgresql",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Creating models below
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primarykey: true,
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
  },

  firstName: {
    type: DataTypes.STRING,
  },

  lastName: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  // TODO: add image pfp attribute here
});

const Organization = sequelize.define("Organization", {
  organizationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primarykey: true,
  },

  organizationName: {
    type: DataTypes.STRING,
    unique: true,
  },

  // TODO: add image organization logo attribute here
});

const Event = sequelize.define("Event", {
  eventId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primarykey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  greeting: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  platformType: {
    type: DataTypes.ENUM("In-Person", "Online", "Hybrid"),
    allowNull: false,
  },

  maxAttendees: {
    type: DataTypes.INTEGER,
  },

  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  // TODO: Add event categories
  // category: {
  //   type: DataTypes.ENUM(),
  // },

  startDate: {
    type: DataTypes.DATEONLY,
  },

  endDate: {
    type: DataTypes.DATEONLY,
  },

  startTime: {
    type: DataTypes.TIME,
  },

  endTime: {
    type: DataTypes.TIME,
  },

  pointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  allowUnregistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  // TODO: discount system
  // discountPrecent: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0.1,
  // },

  // discountPoints: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  // },

  addressLatitude: {
    type: DataTypes.FLOAT,
  },

  addressLongitude: {
    type: DataTypes.FLOAT,
  },

  // userId: {
  //   //orginization host/owner
  //   type: DataTypes.INTEGER,
  // },

  // TODO: add image pfp attribute here
});

const Attendance = sequelize.define("Attendance", {
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: User,
  //     key: "userId",
  //   },
  // },
  // eventId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Event,
  //     key: "eventId",
  //   },
  // },
  attended: {
    type: DataTypes.BOOLEAN,
  },
});

const PointCount = sequelize.define("PointCount", {
  // userId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: User,
  //     key: "userId",
  //   },
  // },
  // organizerId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Organization,
  //     key: "organizerId",
  //   },
  // },
  points: {
    type: DataTypes.INTEGER,
  },
});

const EventDetail = sequelize.define("EventDetail", {
  detailId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primarykey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("text", "link"),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.belongsToMany(Organization, { through: PointCount });
Organization.belongsToMany(User, { through: PointCount });

User.belongsToMany(Event, { through: Attendance });
Event.belongsToMany(User, { through: Attendance });

User.hasMany(Organization);
// , { foreignKey: "userId" }
Organization.belongsTo(User);
// , { foreignKey: "organizationId" }

Event.belongsTo(Organization);
// , { foreignKey: "eventId" }
Organization.hasMany(Event);
// , { foreignKey: "organizationId" }

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

/* TEMP DATA */

// const events = [
//   {
//     eventId: 1,
//     name: "Event 1",
//     startDate: {},
//     endDate: {},
//     pointsEarned: {},
//     address: {},
//     details: [
//       {
//         name: {},
//         type: {},
//         content: {},
//       },
//     ],
//   },
//   {
//     eventId: 2,
//     name: "Event 2",
//     startDate: {},
//     endDate: {},
//     pointsEarned: {},
//     address: {},
//     details: [
//       {
//         name: {},
//         type: {},
//         content: {},
//       },
//     ],
//   },
// ];

// const users = [
//   {
//     id: 1,
//     name: "User 1",
//     prizes: {},
//     organization: {},
//   },
//   {
//     id: 2,
//     name: "User 2",
//     prizes: {},
//     organization: {},
//   },
// ];

// const people_amount = [];
// const points_earned = [];
// const covid_alerts = [];
// const limits = [];
// const price = [];
// const address = [];
// const organizations_list = [
//   {
//     name: {},
//   },
// ];
// const startDate = [];
// const endDate = [];

application.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

application.use(cors());
application.use(express.json());

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

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

application.get("/events", async (req, res) => {
  //WORKS

  //retrieves event specific info
  const Events = await Event.findAll();

  //first retrive all events form the
  res.send({ data: Events });
  // res.send(points_earned);
  // res.send(people_amount);
  // res.send(people_amount);
});

application.post("/get-event", async (req, res) => {
  const eventID = req.body.eventId;

  if (!eventID) {
    res.status(400).send("eventId is required");
    return;
  }

  const event = await Event.findOne({
    where: {
      id: eventID,
    },
  });

  if (!event || Object.keys(event).length === 0) {
    res.send({
      message: "Event not found",
    });
    return;
  }

  res.status(200).send({ data: event });
});

application.post("/create-organization", async (req, res) => {
  //WORKS
  // const userId = req.body.userId;
  // const organizationName = req.body.organizationName;

  const { userId, organizationName } = req.body;
  // const image = req.body.image;

  if (!userId || !organizationName) {
    return res.status(400).json({
      error: "enter all the required fields",
    });
  }

  // Create Organization in DB organizationName userId

  //const organizationId = 1;

  const org = await Organization.create({
    organizationName: organizationName,
  });

  res.status(200).send({
    message: "organization created",
    data: org, //replace this with organization ID
  });

  return;
});

application.post("/create-event", async (req, res) => {
  //WORKS
  //creating an event

  //CAN WE MAKE THIS RETURN A QR CODE THAT GIVES EVENT INFO?
  // NO, YOU SEND A URL AND THE FRONTEND GENERATES THE QR CODE

  //event should have:
  //eventID, eventName, organizerID, platformType, desc, currAttendees, maxBookings, regPrice, unregUsers, startDate, startTime, duration

  // const eventID = res.body.eventID;

  const organizationName = req.body.organizationName;
  const desc = req.body.desc;
  const maxAttendees = req.body.maxAttendees;
  const platformType = req.body.platformType;
  const regPrice = req.body.regPrice;
  const category = req.body.category;
  const allowUnregistered = req.body.allowUnregistered; //should be default to false
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const duration = req.body.duration;
  const discountPercent = req.body.discountPercent;
  const discountPoints = req.body.discountPoints;
  const pointsEarned = req.body.pointsEarned;

  if (
    !organizationName ||
    !platformType ||
    !desc ||
    !maxAttendees ||
    !category ||
    !regPrice ||
    !startDate ||
    !pointsEarned
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

  const event = await Event.create({
    organizationName: organizationName,
    greeting: desc,
    maxAttendees: maxAttendees,
    platformType: platformType,
    price: regPrice,
    category: category,
    allowUnregistered: allowUnregistered,
    startDate: startDate,
    endDate: endDate,
    discountPercent: discountPercent, //float from 0 to 1
    discountPoints: discountPoints, // number of points req to get discount
    pointsEarned: pointsEarned, // points earned for the spec org from this event
  });

  res.status(200).send({
    message: "event created",
    data: event, //replace this with event ID
  });

  return;
});

application.post("/delete-organization", async (req, res) => {
  const organizationId = req.body.organizationId;
  const organization = Organization.findOne({
    where: {
      organizationId: organizationId,
    },
  });
  await organization.destroy();
});

// application.post("/test-post-req", async (req, res) => {
//   console.log(req)
// })

// connection.end();

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
// };
