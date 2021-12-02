exports.up = function(knex) {
    return knex.schema
        // .createTable("users", (table) => {
        // table.increments("id"); //Primary key
        // table.string("name").notNullable();
        // table.string("email").notNullable();
        // table.timestamps();
        // })
        .createTable("activities", (table) => {
        table.increments("id"); //Primary key
        table.string("activity").notNullable();
        table.string("category").notNullable();
        table.string("qty").notNullable();
        table.string("unit").notNullable();
        table.string("option").notNullable();
        table.string("carbon");
        table.integer("yearly_figure");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("activities")
};