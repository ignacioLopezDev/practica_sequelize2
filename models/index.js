const Users = require ('./Users')
const Pages = require ('./Pages')


Pages.belongsTo(Users, {as : 'author'})

module.exports = {Users, Pages}