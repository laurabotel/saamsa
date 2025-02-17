import Session from '../models/sessionModel';
import MiddlewareFunction from '../types';

const sessionController: Record<string, MiddlewareFunction> = {};

// start session -- add user from cookie to sessions database to persist user information
sessionController.startSession = async (req, res, next) => {
  try {
    const session = await Session.findOne({ username: res.locals.user });

    if (!session) {
      const newSession = {
        username: res.locals.user,
      };

      await Session.create(newSession);
    }
    next();
  } catch (err) {
    const Error = {
      log: 'Error handler caught an error at sessionController.startSession',
      status: 500,
      message: { err: `An error occurred at the sessionController.startSession middleware: ${err}` },
    };
    return next(Error);
  }
};

// end session -- delete user from sessions database to delete user information
sessionController.endSession = async (req, res, next) => {
    try {
      const user = req.body;
      console.log(user);
      await Session.remove({});
      res.locals.user = user;
      next();
    } catch (err) {
      const Error = {
        log: 'Error handler caught an error at sessionController.endSession',
        status: 500,
        message: { err: `An error occurred at the sessionController.endSession middleware: ${err}` },
      };
      return next(Error);
    }
  };


// check if user is logged in -- if user in cookie matches an existing document in database
sessionController.isLoggedIn = async (req, res, next) => {
    try {
        const session = await Session.find();
        if (session) {
          res.locals.user = session;
          console.log(session);
          return next();
        } throw Error('User session does not exist in DB');
      }
      catch (err) {
      const defaultErr = {
        log: 'Error handler caught an error at sessionController.isLoggedIn',
        status: 500,
        message: { err: `An error occurred at the sessionController.isLoggedIn middleware : ${err}` },
      };
      return next(defaultErr);
    }
  };



export default sessionController; 