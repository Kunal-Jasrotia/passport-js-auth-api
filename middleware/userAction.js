
module.exports = {
    insertUser: async (_DATA) => {
        let db = dbconnection.mySqlCon
        console.log('call authentication.user_registerUser(?,?,?)', [_DATA.email, _DATA.password, _DATA.username]);
        let n = await db.query('call authentication.user_registerUser(?,?,?)', [_DATA.email, _DATA.password, _DATA.username])
        console.log(n)
        return n
    },
    getUserLogin: async (_Email, _Password) => {
        let db = dbconnection.mySqlCon
        console.log('call authentication.user_loginUser(?,?)', [_Email, _Password]);
        let n = await db.query('call authentication.user_loginUser(?,?)', [_Email, _Password])
        console.log(n)
        return n
    }
}