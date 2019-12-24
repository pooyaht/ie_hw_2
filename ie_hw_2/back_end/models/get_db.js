let mongoose = require('mongoose')

const server_address = '127.0.0.1:27017'
const database_name = 'ie_hw2'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server_address}/${database_name}`, 
        { useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log('Database connection made.')
            })
            .catch(err => {
                console.error('Database connection refused.')
            })
    }
}

module.exports = new Database()