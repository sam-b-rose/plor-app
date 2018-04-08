import Connection from './models'

export const connections = {
  async create (type, username, oauth) {
    const { accessToken, accessTokenSecret, verifier } = oauth
    let connection = await (new Connection({ type, username, accessToken, accessTokenSecret, verifier })).save()
    return ({ message: `Your Connection has been made! - ${connection.type}!`, connection })
  }
}
