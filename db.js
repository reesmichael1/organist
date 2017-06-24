var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ":memory:"
    }
});

knex.schema.createTable('books', function(table) {
    table.increments('id');
    table.string('title');
})

.then(function() {
    return knex('books').insert({title: 'Slaughterhouse Five'});
})
