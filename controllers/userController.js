
import User from '../models/userModel.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Photo from '../models/photoModel.js';


const createUser = async (req, res) => {
 
  try {
    const user =await User.create(req.body);
    res.redirect("/login");
}catch (error){
    res.status(500).json({
        succeded:false,
        error,
    });
}
};
const loginUser = async (req, res) => {
 
    try {
     const {username,password} = req.body ;
      console.log("req.body",req.body)

     const user =await User.findOne({username}) ;
     let same = false ; 
     if (user){
        same = await bcrypt.compare(password,user.password);
        console.log("same",same);
    }else {
        return res.status(401).json({
            succeded:false,
            error:"böyle bir kullanıcı yok",
        });
    }
    
    if (same){
        const token=createToken(user._id);
        res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:1000 * 60 * 60 * 24,
        
        });
        res.redirect("/users/dashboard");
    }
        else {
            res.status(401).json({
                succeded:false,
                error:"şifre eşleşmedi",
            });
        }
  }catch (error){
      res.status(500).json({
          succeded:false,
          error,
      });
  }
  };
   const createToken = (userId) => {
      return jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d",
      });

      };
      const getdashboardPage = async (req, res) => {
        const photos = await Photo.find({user:res.locals.user._id})
        res.render('dashboard', {
          link: 'dashboard',
          photos
        });
      };
   



export { createUser,loginUser,getdashboardPage };