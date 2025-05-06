import express from 'express';
import {getPersonMedia } from '../controllers/person.controller.js';
//this gets the person for the media
const router = express.Router();
router.get('/:id/media', getPersonMedia);

export default router;
