const assert = require('assert');
const dbUtils = require('../app/db/dbUtils');
const db = require('../app/db/db')('memory');

describe('Database', function () {
    describe('insertComposer', function () {
        it('should add a single composer', function () {
            dbUtils.insertComposer('Johann Sebastian', 'Bach', db).then(function (id) {
                assert.equals(id, 1);
            });
        });
    });
});

after(function() {
    dbUtils.finish(db);
});
