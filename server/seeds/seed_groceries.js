const fs = require('fs');
const groceriesJSON = JSON.parse(fs.readFileSync('./data/food-footprints.json'));
// let endSlice = 35;
// const slicedGroceriesJSON = groceriesJSON.slice(0,endSlice)

// console.log(slicedGroceriesJSON[0].supplyChain.landUse)

let groceries = groceriesJSON.map(function(grocery) {
    if (grocery.supplyChain) {
        return ({
        'food': grocery.food,
        'category': 'groceries',
        'qty': 1,
        'unit': 'kg',
        'carbon': grocery.carbon,
        'sc_land_use': grocery.supplyChain.landUse,
        'sc_farm': grocery.supplyChain.farm,
        'sc_animal_feed': grocery.supplyChain.animalFeed,
        'sc_processing': grocery.supplyChain.processing,
        'sc_transport': grocery.supplyChain.transport,
        'sc_retail': grocery.supplyChain.retail,
        'sc_packaging': grocery.supplyChain.packaging,
        'pollutants': grocery.pollutants,
        'land': grocery.land,
        'water': grocery.water,
        'water_scarcity': grocery.waterScarcity,
        })
    } else {
        return ({
            'food': grocery.food,
            'category': 'groceries',
            'qty': 1,
            'unit': 'kg',
            'carbon': grocery.carbon,
            'pollutants': grocery.pollutants,
            'land': grocery.land,
            'water': grocery.water,
            'water_scarcity': grocery.waterScarcity
        })
    }
})

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('groceries').del()
        .then(function () {
        // Inserts seed entries
        return knex('groceries').insert(groceries);
        });
};
