const fs = require('fs');
const activitiesJSON = JSON.parse(fs.readFileSync('./data/activity-carbon-a.json'));
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

// let activities = [{
//   "activity": activitiesJSON[0].activity,
//   "category": activitiesJSON[0].category,
//   "qty": activitiesJSON[0].qty,
//   "unit": activitiesJSON[0].unit,
//   "option": activitiesJSON[0].option,
//   "carbon": activitiesJSON[0].carbon,
//   "yearly_figure": activitiesJSON[0].yearly_figure
// }]

// console.log(activities)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert(activities);
    });
};
