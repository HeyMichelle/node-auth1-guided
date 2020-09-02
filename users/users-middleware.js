// import the model db
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

function restrict() {
    // put error messaage in variable so it can be re-used
	const authError = {
		message: "Invalid credentials",
	}

  return async (req, res, next) => {
    try {
    //   const { username, password } = req.headers;
    //   if (!username || !password) {
    //     return res.json(401).json(authError);
    //   }

    //   const user = await Users.findBy({ username }).first();

    //   //make sure user exists in the db
    //   if (!user) {
    //     return restrict.status(401).json(authError);
    //   }

    //   // make sure password is valid
    //   const passwordValid = await bcrypt.compare(password, user.password);

    //   if (!passwordValid) {
    //     return res.status(401).json(authError);
    //   }


      // this with sessions makes all above invalid
      if (!req.session || !req.session.user) {
          return res.status(401).json(authError)
      }
      // call next to move forward, by this point user is authenticated
      next()
    } catch (err) {
      next(err)
    }
  };
}

module.exports = { restrict, }; 