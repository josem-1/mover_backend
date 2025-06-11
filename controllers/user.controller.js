
import { User } from '../models/user.model.js';

export async function getWatchlist(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('getwatchlisterror in user controller', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}


export async function addToWatchlist(req, res) {
  try {
    const { media } = req.body; 
    const user = await User.findById(req.user.id);
    user.watchlist.push(media);
    await user.save();
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('failed to add to watchlist', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeFromWatchlist(req, res) {
  console.log('item should be removed by media id found in user wathchlist', req.params.mediaId);
  try {
    const mediaIdNum = parseInt(req.params.mediaId, 10);
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(
      entry => entry.mediaId !== mediaIdNum
    ); 
    await user.save();
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('failed to removed from watchlist in user controller', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}


export async function getWatchHistory(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('a problem with wacht history fetching in user controller', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function addToWatchHistory(req, res) {
  try {
    const{media} = req.body;
    const user = await User.findById(req.user.id);
    user.watchHistory.push(media);
    await user.save();
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('failed to add to watchlist in user controller', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeFromWatchHistory(req, res) {
  try {
    const { mediaId } = req.params;
    const user = await User.findById(req.user.id);
    user.watchHistory = user.watchHistory.filter(entry => entry.mediaId !== mediaId);
    await user.save();
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('devious lick on the watchhistoyr, attemtpet, failed to removed item', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
