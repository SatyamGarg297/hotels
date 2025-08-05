// sets up Passport with a local authentication strategy, using a Person model for user

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Adjust the path as needed

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  // authentication logic here
  try{
    // console.log('Received credentials:', USERNAME, password);
    const user = await Person.findOne({username: USERNAME});
    if(!user)
    return done(null, false, { message: 'Incorrect username.' });

    const isPasswordMatch = await user.comparePassword(password);                         // user.password === password ? true : false;
    if(isPasswordMatch){
      return done(null, user);
    }else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }catch (err){
    return done(err);
  }
}));

module.exports =  passport // Export configured passport