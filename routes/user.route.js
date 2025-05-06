import express from 'express';
import {getWatchlist,addToWatchlist,  removeFromWatchlist,getWatchHistory,addToWatchHistory,removeFromWatchHistory,
} from '../controllers/user.controller.js';

const router = express.Router();

//get retrieves, post adds to list, delete deletes form list


router.get('/watchlist',getWatchlist);
router.post('/watchlist',addToWatchlist);
router.delete('/watchlist/:mediaId',removeFromWatchlist);  
//same get,post,del fro watchlist and wathchistory, i think, me thinks, myself thinks,,,,,im going crazy with this freaking project
router.get('/watchhistory',getWatchHistory);
router.post('/watchhistory',addToWatchHistory);
router.delete('/watchhistory/:mediaId',removeFromWatchHistory);

export default router;
