import MongodbMemoryServer from 'mongodb-memory-server';
import MongoClient from 'mongodb';

const mongoMem = async (res, reg) => {

    const mongod = new MongodbMemoryServer();


    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();


    console.log('Uri', uri, 'port', port, 'dbPath', dbPath, 'dbName', dbName);

    // you may stop mongod manuall
    res({ 'uri': uri, 'mongod': mongod, 'dbName': dbName });
    // or it will be stopped automatically when you exit from script
};

const connectDb = function (params) {

    console.log('Connectdb', params.uri);

    MongoClient.connect(params.uri, (err, db) => {

        if (err) {
            throw err;
        }

        console.log('Database Created');

        const dbo = db.db(params.dbName);

        dbo.createCollection("customers", (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Collection created!");

            db.close();
            params.mongod.stop();
        });

    });
};

new Promise(mongoMem).then(connectDb);
