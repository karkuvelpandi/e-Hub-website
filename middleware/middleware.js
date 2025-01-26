import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

const configureMiddleware = (app) => {
  // Enable CORS
  app.use(cors());

  // HTTP logger
  app.use(morgan('tiny'));

  // Body Parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
};

export default configureMiddleware;