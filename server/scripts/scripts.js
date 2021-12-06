const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const footprintData = fs.readFileSync('../data/master/food-footprint-master.json');
const footprintJSON = JSON.parse(footprintData)
const supplyChainJSON = JSON.parse(fs.readFileSync('../data/master/supply-chain-master.json'));

const footprintWithId = footprintJSON.map(footprint => {
    const supplyChain = supplyChainJSON.find(food => food.food === footprint.Food)
    console.log(supplyChain)
    return (
        {
            "id": uuidv4(),
            "food": footprint.Food,
            "carbon": footprint.Carbon,
            "supplyChain": supplyChain,
            "pollutants": footprint.pollution,
            "land": footprint.land,
            "water": footprint.water,
            "waterScarcity": footprint["water-scarcity"]
        }
    )
})

// console.log(footprintWithId);
fs.writeFileSync("../data/food-footprints.json", JSON.stringify(footprintWithId));


// knex syntax:
function syntax() {
    // select one user from users table where age is greater than 18
    knex("users").where("age", ">", 18).first();

    // filter users by multiple where columns
    knex("users")
        .where({
            full_name: "Test User",
            is_boat: true,
        })
        .select("id");

    // select subquery
    const usersSubquery = knex("users")
        .where("age", ">", 18)
        .andWhere("is_deleted", false)
        .select("id");
    knex("programs").where("id", "in", usersSubquery);

    // pagination with offset and limit
    knex.select("*").from("orders").offset(0).limit(50);
}