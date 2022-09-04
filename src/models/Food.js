import {createRealmContext, Realm} from "@realm/react";
export class Food extends Realm.Object {
  _id: Realm.BSON.ObjectId;
  name: string;
  expirationDate: Date;
  imageUrl: string;


  static generate(name, expirationDate,imageUrl) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      expirationDate,
      imageUrl,
    };
  }

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      expirationDate: "date",
      imageUrl: "string",
    },
  };
}

const config  = {
  schema: [Food],
};
export default createRealmContext(config);