import 'dotenv/config'

module.exports = ({ config }) => {
  return {
    ...config,
    expo: {
      extra: {
        API_URL: `http://${process.env.IP}:3000`
      }
    }
  }
}
