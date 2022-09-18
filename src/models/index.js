import { createRealmContext } from "@realm/react";
import { Food } from "./Food";

export const TaskRealmContext = createRealmContext({
    schema: [Food],
});
