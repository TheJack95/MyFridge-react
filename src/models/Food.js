import {Realm} from "@realm/react";
export class Food extends Realm.Object {
  _id: Realm.BSON.ObjectId;
  foodName: string;
  imageUrl: string;
  expirationDate: Date;

  static generate(name, expirationDate, imageUrl) {
    return {
      _id: new Realm.BSON.ObjectId(),
      foodName: name,
      expirationDate,
      imageUrl,
    };
  }

  static schema = {
    name: "Food",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      foodName: "string",
      expirationDate: "date",
      imageUrl: "string",
    },
  };
}