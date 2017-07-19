'use strict';

let globalPath = __dirname + '/../../storage/organist.db';

module.exports = function (DATABASE_LOCATION) {
    let locationString;
    if (DATABASE_LOCATION === 'memory') {
        locationString = ':memory:';
    } else if (DATABASE_LOCATION === 'global') {
        locationString = globalPath;
    } else {
        throw new Error('Unknown database storage location '
            + DATABASE_LOCATION);
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
                table.integer('composerId').unsigned()
                    .references('id').inTable('composers');
        }).then();
    };

    return knex;
};
