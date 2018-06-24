const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const config = require('./config');

const dbName = 'trello_copy_db';
let dbClient, usersCollection;

mongodb.connect(config.dbConnUrl, {
    auth: {
        user: config.dbUser,
        password: config.dbPass
    }
}, (err, client) => {
    if (err) {
        // console.error(err);
        throw err;
    }

    let db = client.db(dbName);
    usersCollection = db.collection('users');
    tablesCollection = db.collection('tables');

});

module.exports = {
    users: {
        create: (user) => {
            return usersCollection.insertOne(user);
        },
        update: () => {

        },
        delete: () => {

        },
        findById: (id) => {
            return usersCollection.findOne({
                _id: id
            });
        },
        findByUsername: (username) => {
            return usersCollection.findOne({
                username: username
            });
        }
    },
    tables: {
        create: (tables) => {
            return tablesCollection.insertOne(tables);
        }
    }
};