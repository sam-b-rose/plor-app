import OAuth from 'oauth'
import { connections } from '../connections/services'

const oauthToken = 'UWQ2xMGVAUgLvjslljpjyrnaa'
const oauthTokenSecret = '8sfT2zKZJ0bAR24EMkBdMVGtP3MBp6IpnblPBqZ0hSK0OQCwvN'

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  oauthToken,
  oauthTokenSecret,
  '1.0A',
  'http://localhost:3000/api/connect/twitter/callback',
  'HMAC-SHA1'
)

export const twitter = {
  async get (req, res) {
    try {
      oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
        if (error) {
          console.log(error)
          res.send('Authentication Failed!')
        } else {
          req.session.oauth = {
            token: oauthToken,
            tokenSecret: oauthTokenSecret
          }
          res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauthToken)
        }
      })
    } catch (error) {
      res.handleServerError(error)
    }
  },

  async callback (req, res) {
    if (req.session.oauth && req.user.username) {
      req.session.oauth.verifier = req.query['oauth_verifier']
      const oauthData = req.session.oauth

      await oauth.getOAuthAccessToken(
        oauthData.token,
        oauthData.tokenSecret,
        oauthData.verifier,
        async (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
          if (error) {
            console.log(error)
            res.send('Authentication Failure!')
          } else {
            req.session.oauth.accessToken = oauthAccessToken
            req.session.oauth.accessTokenSecret = oauthAccessTokenSecret
            console.log(req.session.oauth)
            await connections.create('twitter', req.user.username, req.session.oauth)
            res.redirect('/manage')
          }
        }
      )
    } else {
      res.redirect('/users/auth/sign-in')
    }
  }
}
