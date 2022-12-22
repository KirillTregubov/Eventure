import { Router } from "express";
import userRoutes from "./user.routes";

const api = Router().use(userRoutes);

export default Router().use("/api/v1", api);
