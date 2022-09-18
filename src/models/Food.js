import {createRealmContext, Realm} from "@realm/react";
export class Food extends Realm.Object {
  static generate(name, expirationDate, imageUrl) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      expirationDate,
      imageUrl,
    };
  }

  static schema = {
    name: "Food",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      expirationDate: "date",
      imageUrl: "string",
    },
  };
}