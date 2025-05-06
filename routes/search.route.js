import express from 'express';

//make sure to use search.controller and not searchcontroller
import {search } from '../controllers/search.controller.js';
const router = express.Router();
router.get('/', search);
export default router;