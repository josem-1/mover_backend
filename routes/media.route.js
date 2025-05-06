import express from 'express';
import {getDetails, getSimilarContent, getProviders } from '../controllers/media.controller.js';
const router = express.Router();


//gotta make sure I use the '/:' at the begining bcuz of the api functions
router.get('/:type/:id', getDetails);
router.get('/:type/:id/providers', getProviders);
router.get('/:type/:id/similar', getSimilarContent);

export default router;