import React, {useCallback, useMemo} from 'react'
import {RealmContext} from "../models";
import {Food} from "../models/Food";
import {ProductsList} from "./ProductsList";

const {useQuery, useRealm} = RealmContext;

export default function FoodManager({route}) {
    const realm = useRealm();
    const result = useQuery(Food);

    const items = useMemo(() => result.sorted("expirationDate"), [result]);

    const handleToggleAddToMyFridge = useCallback(
        (food: Food, date: Date) => {
            realm.write(() => {
                food.expirationDate = date
                food.inFridge = !food.inFridge;
            });
        },
        [realm],
    );

    const handleDeleteFood = useCallback(
        (food: Food) => {
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey('Food', food._id));
            });
        },
        [realm],
    );


    return <ProductsList
        items={items}
        route={route}
        onToggleAddToMyFridge={handleToggleAddToMyFridge}
        onDeleteFood={handleDeleteFood}
    />
}



