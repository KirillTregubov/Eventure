import { Router } from "express";
import { createEvent } from "controllers/event";

const router = Router();

// router.get("/", async (req, res) => {
//   const users = await getUsers();
//   res.send(users);
// });

router.post("/", async (req, res, next) => {
  try {
    const event = await createEvent(req);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

export default Router().use("/event", router);
