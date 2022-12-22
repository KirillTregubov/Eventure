import { Router } from "express";
import { createUser, getUsers } from "controllers/user";

const router = Router();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await createUser();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

export default Router().use("/user", router);
