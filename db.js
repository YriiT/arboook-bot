const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.DB_URL;
const database = process.env.DB_NAME;
function n(err, res) {
  if (err) {
    console.error(err);
  } else {
    console.info(res);
  }
}

module.exports = class DB {
  async insertOne(props) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    try {
      const clientDataBase = client.db(database);
      await clientDataBase.collection(props.collection).insertOne(props.data);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  async getOne(props) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    try {
      const clientDataBase = client.db(database);
      const result = await clientDataBase
        .collection(props.collection)
        .findOne(props.query, props.option);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }

  getMany(props, next) {
    throw new Error("method getMany is not ready yet");
    // MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    //   if (err) {
    //     next(err);
    //   } else {
    //     let dbo = db.db(database);
    //     if (!props.limit) {
    //       props.limit = 0;
    //     }
    //     let fields = {};
    //     if (props.params && props.params.fields) {
    //       for (let i = 0; i < props.params.fields.length; i++) {
    //         fields[props.params.fields[i]] = 1;
    //       }
    //     }
    //     dbo
    //       .collection(props.collection)
    //       .find(props.query, fields)
    //       .sort(props.sort)
    //       .limit(props.limit)
    //       .toArray((err, result) => {
    //         if (err) {
    //           next(err);
    //         } else {
    //           next(null, result);
    //           db.close();
    //         }
    //       });
    //   }
    // });
  }

  updateOne(props, next) {
    throw new Error("method updateOne is not ready yet");
    // MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    //   if (err) {
    //     next(err);
    //   } else {
    //     let dbo = db.db(database);
    //     let values = {};
    //     if (props.inc) {
    //       values = { $inc: props.inc };
    //     } else {
    //       values = { $set: props.values };
    //     }
    //     dbo
    //       .collection(props.collection)
    //       .updateOne(props.query, values, (err, res) => {
    //         if (err) {
    //           next(err);
    //         } else {
    //           next(null, res);
    //           db.close();
    //         }
    //       });
    //   }
    // });
  }

  deleteOne(props, next) {
    throw new Error("method deleteOne is not ready yet");

    // MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    //   if (err) {
    //     next(err);
    //   } else {
    //     let dbo = db.db(database);
    //     dbo.collection(props.collection).deleteOne(props.query, (err, obj) => {
    //       if (err) {
    //         next(err);
    //       } else {
    //         next(null, { status: "true" });
    //         db.close();
    //       }
    //     });
    //   }
    // });
  }

  deleteMany(props, next) {
    throw new Error("method deleteMany is not ready yet");

    //     MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    //       if (err) {
    //         next(err);
    //       } else {
    //         let dbo = db.db(database);
    //         dbo.collection(props.collection).deleteMany(props.query, (err, obj) => {
    //           if (err) {
    //             next(err);
    //           } else {
    //             next(null, { status: "true" });
    //             db.close();
    //           }
    //         });
    //       }
    //     });
  }
};
