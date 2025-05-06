
import { User } from '../models/user.model.js';

export async function getWatchlist(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('this stupid funciton didnt work to get watchlst,,,,,,,i wanna drop out again', err);
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
    );//i hate this functino so much, why do i need so much crap to removed from a dango list. 
    await user.save();
    return res.json({ success: true, watchlist: user.watchlist });
  } catch (err) {
    console.error('attemepted devious lick on watchlist, but failed to removed', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}


export async function getWatchHistory(req, res) {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('a problem with wacht history fetching', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}//err, 'aaron earned an iron urn' hehehe,,,,,,i hate this project so much


export async function addToWatchHistory(req, res) {
  try {
    const{media} = req.body;
    const user = await User.findById(req.user.id);
    user.watchHistory.push(media);
    await user.save();
    return res.json({ success: true, watchHistory: user.watchHistory });
  } catch (err) {
    console.error('shouldve coulda woulda added to watchhistory, but failed', err);
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
