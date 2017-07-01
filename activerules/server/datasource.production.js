module.exports = {
  izzup: {
    connector: 'mongodb',
    hostname: process.env.IZZUP_HOST,
    port: process.env.IZZUP_PORT || 27017,
    user: process.env.IZZUP_USER,
    password: process.env.IZZUP_PASSWORD,
    database: 'izzup',
  }
}