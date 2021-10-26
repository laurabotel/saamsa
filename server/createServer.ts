import express from 'express';
import userController from './controllers/userController';
import kafkaRouter from './routers/kafkaRouter';
import path from 'path';
// const cors = require('cors')
// const corsOptions ={
//   origin:'http://localhost:8080', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

function createServer(): express.Application {
  const app = express();

  // app.use(cors(corsOptions)) 

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.set('view engine','js');
  app.use(express.static(path.join(__dirname,'build/bundle.js')));
  

  // app.all('/', (req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //   next();
  // });

  //logging in
  app.post(
    '/login',
    userController.verifyUser,
    (req: express.Request, res: express.Response) => {
      res.status(200).json(res.locals.user);
    }
  );

  //signing up
  app.post(
    '/signup',
    userController.createUser,
    (req: express.Request, res: express.Response) => {
      res.status(200).send(res.locals.user);
    }
  );

  app.use('/kafka', kafkaRouter);
  
  app.use('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../../index.html'));
  })

  //type of error object
  type errorType = {
    log: string;
    status: number;
    message: { err: string };
  };
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
  app.use(
    (
      err: express.ErrorRequestHandler,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const defaultErr: errorType = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      const errorObj = { ...defaultErr, ...err };
      console.log(err);
      return res.status(errorObj.status).json(errorObj.message);
    }
  );
  return app;
}

export default createServer;
