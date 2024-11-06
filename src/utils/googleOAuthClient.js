import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { env } from './env.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.resolve(process.cwd(), 'google-oauth.json');
const oauthJSON = await readFile(PATH_JSON, 'utf-8');
const oauthConfig = JSON.parse(oauthJSON);

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_ID'),
  redirectUri: oauthConfig.web.redirect_uris[0],
});
export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const res = await googleOAuthClient.getToken(code);
  const token = res.tokens.token_id;
  if (!token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({ idToken: token });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
