import {Realm} from "@realm/react";
export class Food extends Realm.Object {
  _id: Realm.BSON.ObjectId;
  foodName: string;
  imageUrl: string;
  imageName: string;
  expirationDate: Date;
  notificationId: string;

  static generate(name, expirationDate, imageUrl, imageName, notificationId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      foodName: name,
      expirationDate,
      imageName,
      imageUrl,
      notificationId
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
      imageName: "string",
      notificationId: "string",
    },
  };
}