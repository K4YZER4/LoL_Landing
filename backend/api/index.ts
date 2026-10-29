import type { NextFunction, Request, Response } from 'express';
import type { INestApplication } from '@nestjs/common';
import { createApp } from '../src/bootstrap.js';

type ExpressHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => unknown;

let applicationPromise: Promise<INestApplication> | undefined;

async function getApplication(): Promise<INestApplication> {
  applicationPromise ??= createApp().then(async (application) => {
    await application.init();
    return application;
  });

  return applicationPromise;
}

export default async function handler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<unknown> {
  const application = await getApplication();
  const expressHandler = application
    .getHttpAdapter()
    .getInstance() as ExpressHandler;

  return expressHandler(request, response, next);
}
