const User = require("../models/userModel");

const cron = require("node-cron");
const schedule = cron.schedule("0 * * * *", async () => {
  try {
    let user = [];
    await User.find().then(data => {
      data.forEach(el => {
        let dateFirst = new Date(el.login);
        let dateSecond = new Date();
        let timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays > 30) {
          user.push(el._id);
        }
      });
    });
    
    let deleted = await User.deleteMany({ _id: { $in: user }})
    console.log(deleted);
  } catch (error) {
      console.log(error);
      
  }
});

module.exports = schedule
