import { Router } from "express";
import { createOrganization } from "controllers/organization";

const router = Router();

// router.get("/", async (req, res) => {
//   const users = await getUsers();
//   res.send(users);
// });

router.post("/", async (req, res, next) => {
  try {
    const event = await createOrganization(req);
    res.send(event);
  } catch (error) {
    next(error);
  }
});

export default Router().use("/organization", router);
