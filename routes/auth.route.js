import express from "express";
import {login, logout, signup, authCheck } from "../controllers/auth.controller.js";
import {protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

router.get('/logout', logout)

export default router;
