import { Router } from "express";
import userRoutes from "./user";
import eventRoutes from "./event";
import organizationRoutes from "./organization";

const api = Router().use(userRoutes).use(eventRoutes).use(organizationRoutes);

export default Router().use("/api/v1", api);
