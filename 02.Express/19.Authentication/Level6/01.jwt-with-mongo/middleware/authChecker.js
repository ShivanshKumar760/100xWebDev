import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const requireAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    //this is async when used with call back
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

export {requireAuth};