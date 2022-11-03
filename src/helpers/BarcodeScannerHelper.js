import React from 'react';

export default function getProductByBarcode(barcode) {
    return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return {
                status: responseJson["status"],
                name: responseJson["product"]["product_name_it"],
                imgUrl: responseJson["product"]["image_thumb_url"]
            };
        })
        .catch((error) => {
            console.error("Error scanning barcode:", error);
        });
}
