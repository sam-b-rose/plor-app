import dotenv from 'dotenv';
import OAuth from 'oauth';
import Connection from '../models/Connection';
import axios from 'axios';

const BASE_URL = 'https://api.twitter.com/1.1/';
const _axios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000
});

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env'
});

// Plor Twitter info
const oauthToken = process.env.TWITTER_API_KEY;
const oauthTokenSecret = process.env.TWITTER_API_SECRET;

// Configure oauth
const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  oauthToken,
  oauthTokenSecret,
  '1.0A',
  'http://localhost:3000/api/connections/twitter/callback',
  'HMAC-SHA1'
);

const getOAuthAccessToken = (token, tokenSecret, verifier) => {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(
      token,
      tokenSecret,
      verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) return reject(error);
        resolve({ oauthAccessToken, oauthAccessTokenSecret, results });
      }
    );
  });
};

function buildAuthHeader(params) {
  const auth = ['OAuth '];
  Object.keys(params).forEach(key => {
    auth.push();
  });
}

export const twitter = {
  async get(req, res) {
    try {
      oauth.getOAuthRequestToken(
        (error, oauthToken, oauthTokenSecret, results) => {
          if (error) {
            console.log(error);
            res.send('Authentication Failed!');
          } else {
            req.session.oauth = {
              token: oauthToken,
              tokenSecret: oauthTokenSecret
            };
            res.redirect(
              'https://twitter.com/oauth/authenticate?oauth_token=' + oauthToken
            );
          }
        }
      );
    } catch (error) {
      res.handleServerError(error);
    }
  },

  async callback(req, res) {
    if (req.session.oauth && req.user.email) {
      req.session.oauth.verifier = req.query['oauth_verifier'];

      const { token, tokenSecret, verifier } = req.session.oauth;
      try {
        const {
          oauthAccessToken,
          oauthAccessTokenSecret,
          results
        } = await getOAuthAccessToken(token, tokenSecret, verifier);

        req.session.oauth.accessToken = oauthAccessToken;
        req.session.oauth.accessTokenSecret = oauthAccessTokenSecret;

        const user = req.user._id;
        const newConnection = new Connection({
          user,
          type: 'twitter',
          account: results,
          oauth: req.session.oauth
        });
        const connection = await newConnection.save();
        res.redirect('/manage');
      } catch (error) {
        console.log(error);
        res.end('Authentication Failure!', JSON.stringify(error));
      }
    } else {
      res.redirect('/auth/login');
    }
  }
};
