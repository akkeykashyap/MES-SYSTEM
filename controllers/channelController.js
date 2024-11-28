const channel = require('../models/channel');
const User = require('../models/user');

// Show all channels the user has access to
exports.index = async (req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirected('/login');    
    };
    try {
        const user = await User.findById(req.user.id).populate('channelAccess');
        const channels = user.channelAccess;  // Only show channels the user can access
        res.render('channels/index', { channels });
      } catch (err) {
        res.status(500).send('Error fetching channels');
      }
};


// View a specific channel
exports.view = async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
  
    const channelId = req.params.channelId;
    try {
      const user = await User.findById(req.user.id).populate('channelAccess');
      const userHasAccess = user.channelAccess.some(channel => channel.id === channelId);
  
      if (!userHasAccess) {
        return res.status(403).send('Access denied to this channel.');
      }
  
      const channel = await Channel.findById(channelId).populate('items');
      res.render('channels/view', { channel });
    } catch (err) {
      res.status(500).send('Error fetching channel data');
    }
  };


