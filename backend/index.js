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

// const mysql = require("mysql2");
// const connection = mysql.createConnection(process.env.DATABASE_URL);
//Creating models below:
const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
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

    number: {
      type: DataTypes.STRING,
    },

    //add image pfp attribute here
  }
  // sequelize has auto plurization for table name, so it dosnt need to be declared
);

const Organization = sequelize.define("Organization", {
  organizationId: {
    type: DataTypes.INTEGER,
    //autoIncrement: true,
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
    //autoIncrement: true,
    primarykey: true,
  },

  organizationName: {
    type: DataTypes.STRING,
  },

  greeting: {
    type: DataTypes.TEXT,
  },

  platformType: {
    type: DataTypes.STRING,
  },

  maxAttendees: {
    type: DataTypes.STRING,
    defaultValue: 100,
  },

  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  category: {
    type: DataTypes.STRING,
  },

  allowUnregistered: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  startDate: {
    type: DataTypes.STRING,
  },

  endDate: {
    type: DataTypes.STRING,
  },

  discountPrecent: {
    type: DataTypes.FLOAT,
    defaultValue: 1,
  },

  discountPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  pointsEarned: {
    type: DataTypes.INTEGER,
  },

  // userId: {
  //   //orginization host/owner
  //   type: DataTypes.INTEGER,
  // },

  //add image pfp attribute here
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
  const Events = Event.findAll();

  //first retrive all events form the
  res.send({ data: Events });
  // res.send(points_earned);
  // res.send(people_amount);
  // res.send(people_amount);
});

application.post("/get-event", (req, res) => {
  const eventID = req.body.eventId;

  if (!eventID) {
    res.status(400).send("eventId is required");
    return;
  }

  const event = Event.findOne({
    where: {
      eventId: eventID,
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
  //creating an organization
  const userId = req.body.userId;
  const organizationName = req.body.organizationName;
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
  //creating an event

  //CAN WE MAKE THIS RETURN A QR CODE THAT GIVES EVENT INFO?
  // NO, YOU SEND A URL AND THE FRONTEND GENERATES THE QR CODE

  //event should have:
  //eventID, eventName, organizerID, platformType, desc, currAttendees, maxBookings, regPrice, unregUsers, startDate, startTime, duration

  // const eventID = res.body.eventID;
  const organizationName = res.body.organizationName;
  const desc = res.body.desc;
  const maxAttendees = res.body.maxAttendees;
  const platformType = res.body.platformType;
  const regPrice = res.body.regPrice;
  const category = res.body.category;
  const allowUnregistered = res.body.allowUnregistered; //should be default to false
  const startDate = res.body.startDate;
  const endDate = res.body.endDate;
  const duration = res.body.duration;
  const discountPercent = res.body.discountPercent;
  const discountPoints = res.body.discountPoints;
  const pointsEarned = res.body.pointsEarned;

  if (
    !organizationName ||
    !platformType ||
    !desc ||
    !maxAttendees ||
    !category ||
    !regPrice ||
    !startDate ||
    !startTime ||
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

// connection.end();

application.listen(port, () => console.log(`App listening on port ${port}!`)); // port 3000 in use
// };
