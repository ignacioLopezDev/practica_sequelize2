const S = require ('sequelize')
const db = require ('../db')

class Users extends S.Model{}

Users.init(
    {
        name:{
            type: S.STRING,
            allowNull:false
        },
        email:{
            type: S.STRING,
            validate: {
                isEmail: true
            },
            allowNull:false
        }
    },
    {
        timestamps:false, sequelize: db, modelName: "users"
    }
)



module.exports = Users