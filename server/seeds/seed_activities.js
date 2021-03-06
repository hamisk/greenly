const fs = require('fs');
const activitiesJSON = JSON.parse(fs.readFileSync('./data/activity-carbon-a.json'));
const groceriesJSON = JSON.parse(fs.readFileSync('./data/food-footprints.json'));
// let endSlice = 10;
// const slicedActivitiesJSON = activitiesJSON.slice(0,endSlice)

let activities = activitiesJSON.map(activity => ({
    "activity": activity.activity,
    "category": activity.category,
    "qty": activity.qty,
    "unit": activity.unit,
    "option": activity.option,
    "carbon": activity.carbon,
    "yearly_figure": activity.yearly_figure
}))

let groceries = groceriesJSON.map(grocery => ({
    "activity": grocery.food,
    "category": 'groceries',
    "qty": 1,
    "unit": 'kg',
    "option": 'per kg',
    "carbon": grocery.carbon,
    'pollutants': grocery.pollutants,
    'land': grocery.land,
    'water': grocery.water,
    "yearly_figure": null
}))

Array.prototype.push.apply(activities, groceries); 

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('activities').del()
        .then(function () {
        // Inserts seed entries
        return knex('activities').insert(activities);
    });
};
