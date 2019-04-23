const User = require("../models/userModel");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

class UserController {
  static register(req, res) {
    
    let { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(createdUser => {
        res
          .status(200)
          .json({ message: "Successfully created a user!", createdUser });
      })
      .catch(err => {
        res.status(500).json({message: err.message});
      });
  }

  static signIn(req, res) {
    
    let { email, password } = req.body;
    User.findOne({
      email
    })
      .then(findOneUser => {
        if (!findOneUser)
          res.status(401).json({ message: "Email/Password is incorrect!" });
        else if (!compare(password, findOneUser.password))
          res.status(401).json({ message: "Email/Password is incorrect!" });
        else {
          const { id, name, email } = findOneUser;
          const payload = { id, name, email };
          const token = sign(payload);
          req.headers.token = token;
          res.status(200).json({
            message: "You have successfully logged in!",
            token,
            details: payload
          });
        }
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json(err);
      });
  }
}

module.exports = UserController
