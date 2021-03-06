const knex =
  process.env.NODE_ENV === 'production'
    ? require('knex')(require('../knexfile').production)
    : require('knex')(require('../knexfile').development);
// const knex = require('knex')(require('../knexfile').development);

exports.getActivities = (_req, res) => {
    knex('activities')
        .then((data) => {
            // console.log(data)
            data.sort((a,b) => a.id - b.id)
            let prevActivityName = "";
            let activityArray = [];
            let activityArrayIndex = -1;
            
            for (let i = 0; i < data.length; i++) {
                let activity = data[i];
                let activityName = activity.activity;

                if (activityName === prevActivityName) {
                    activityArray[activityArrayIndex].option.push([activity.option, activity.id])
                    activityArray[activityArrayIndex].carbon.push(activity.carbon)
                } else {
                    let activityObject = {
                        "id": activity.id,
                        "activity": activity.activity,
                        "category": activity.category,
                        "qty": activity.qty,
                        "unit": activity.unit,
                        "option": [[activity.option, activity.id]],
                        "carbon": [activity.carbon],
                        "pollutants": activity.pollutants,
                        "land": activity.land,
                        "water": activity.water,
                        "yearly_figure": activity.yearly_figure,
                        "notes": activity.notes,
                        "created_at": activity.created_at
                    }
                    activityArray.push(activityObject)
                    activityArrayIndex += 1;
                    prevActivityName = activityName
                }
                // console.log(activityArray)
            }
            res.status(200).json(activityArray);
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving activities: ${err}`)
        );
};

exports.addNewActivity = (req, res) => {
    const newActivity = req.body;

    if (!newActivity) {
            return res.status(400).json({
            message: "add-activity requires activity"
        })
    }

    knex('activities')
        // .where({ username: usernameFromToken })
        .insert(newActivity)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) =>
            res.status(400).send(`Error adding entry: ${err}`)
        );
}