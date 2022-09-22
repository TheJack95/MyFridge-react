import { createRealmContext } from "@realm/react";
import { Food } from "./Food";

export const RealmContext = createRealmContext({
    schemaVersion: 1,
    schema: [Food],
});
