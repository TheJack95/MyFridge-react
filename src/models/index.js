import { createRealmContext } from "@realm/react";
import { Food } from "./Food";

export const RealmContext = createRealmContext({
    schema: [Food],
    deleteRealmIfMigrationNeeded: true,
});
