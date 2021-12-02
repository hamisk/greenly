exports.up = function(knex) {
    return knex.schema
        // .createTable('users', (table) => {
        // table.increments('id'); //Primary key
        // table.string('name').notNullable();
        // table.string('email').notNullable();
        // table.timestamps();
        // })
        .createTable('activities', (table) => {
            table.increments('id'); //Primary key
            table.string('activity').notNullable();
            table.string('category').notNullable();
            table.string('qty').notNullable();
            table.string('unit').notNullable();
            table.string('option').notNullable();
            table.string('carbon');
            table.string('pollutants');
            table.string('land');
            table.string('water');
            table.integer('yearly_figure');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('groceries', (table) => {
            table.increments('id');
            table.string('food').notNullable();
            table.string('category').notNullable();
            table.string('qty').notNullable();
            table.string('unit').notNullable();
            table.string('carbon').notNullable();
            table.string('sc_land_use')
            table.string('sc_farm')
            table.string('sc_animal_feed')
            table.string('sc_processing')
            table.string('sc_transport')
            table.string('sc_retail')
            table.string('sc_packaging')
            table.string('pollutants')
            table.string('land')
            table.string('water')
            table.string('water_scarcity')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('activities')
        .dropTable('groceries')
};