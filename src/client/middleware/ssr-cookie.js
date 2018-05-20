import axios from '~/plugins/axios';

export default ({ req }) => {
  if (process.server) {
    axios.defaults.headers.common.cookie = req.headers.cookie;
  }
};
