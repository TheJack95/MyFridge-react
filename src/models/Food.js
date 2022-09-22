import {Realm} from "@realm/react";
export class Food extends Realm.Object {
  _id: Realm.BSON.ObjectId;
  name: string;
  imageUrl: string;
  expirationDate: Date;

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