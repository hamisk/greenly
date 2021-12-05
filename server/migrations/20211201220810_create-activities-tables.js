exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id'); //Primary key
            table.string('name').notNullable();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.string('city');
            table.string('country');
            table.string('goal_carbon');
            table.string('goal_water');
            table.string('goal_land');
            table.string('goal_pollution');
            table.timestamps('', true);
        })
        .createTable('activities', (table) => {
            table.increments('id'); //Primary key
            table.string('activity').notNullable();
            table.string('category').notNullable();
            table.string('sub_category');
            table.string('qty').notNullable();
            table.string('unit').notNullable();
            table.string('option').notNullable();
            table.string('carbon');
            table.string('pollutants');
            table.string('land');
            table.string('water');
            table.integer('yearly_figure');
            table.string('notes');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('groceries', (table) => {
            table.increments('id');
            table.string('food').notNullable();
            table.string('category').notNullable();
            table.integer('qty').unsigned().notNullable();
            table.string('unit').notNullable();
            table.string('carbon').notNullable();
            table.string('sc_land_use');
            table.string('sc_farm');
            table.string('sc_animal_feed');
            table.string('sc_processing');
            table.string('sc_transport');
            table.string('sc_retail');
            table.string('sc_packaging');
            table.string('pollutants');
            table.string('land');
            table.string('water');
            table.string('water_scarcity');
            table.string('notes');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('user_logged_activities', (table) => {
            table.increments('id');
            table.integer("user_id").unsigned();
            table.integer("activity_id").unsigned();
            table.string('activity');
            table.string('option');
            table.string('carbon');
            table.string('week_commencing').notNullable();
            table.integer("grocery_id").unsigned();
            table.integer('qty').unsigned().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .foreign("user_id")
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("SET NULL")
            table
                .foreign("activity_id")
                .references("id")
                .inTable("activities")
                .onUpdate("CASCADE")
                .onDelete("SET NULL")
            table
                .foreign("grocery_id")
                .references("id")
                .inTable("groceries")
                .onUpdate("CASCADE")
                .onDelete("SET NULL")
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('user_logged_activities')
        .dropTable('users')
        .dropTable('activities')
        .dropTable('groceries')
};