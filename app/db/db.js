'use strict';

module.exports = function (DATABASE_LOCATION) {
    let locationString;
    if (DATABASE_LOCATION === 'memory') {
        locationString = ':memory:';
    } else {
        locationString = 'organist.db';
    }

    let knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: locationString
        },
        useNullAsDefault: true
    });

    knex.initialize = function () {
        knex.schema.createTableIfNotExists('composers', function (table) {
            table.increments();
            table.string('firstName');
            table.string('lastName');
        }).then();

        knex.schema.createTableIfNotExists('pieces', function (table) {
                table.increments();
                table.string('name');
                table.integer('composerId').unsigned().references('id').inTable('composers');
        }).then();
    };

    return knex;
};
