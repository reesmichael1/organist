const assert = require('assert');
const dbUtils = require('../app/db/dbUtils');

// Initialize with let instead of const so we can reset
let db;

before(function () {
    db = require('../app/db/db')('memory');
});

describe('dbUtils', function () {

    describe('insertComposer', function () {
        it('should add a single composer', function () {
            return dbUtils.insertComposer('J.S.', 'Bach', db)
                .then(function (id) {
                    assert.equal(id, 1);
                });
        });

        it('should not add a composer twice', function () {
            return dbUtils.insertComposer('J.S.', 'Bach', db).
                then(function (id) { 
                    assert.equal(id, 1); 
                });
        });

        it('can add another composer', function () {
            return dbUtils.insertComposer('Dieterich', 'Buxtehude', db).
                then(function (id) {
                    assert.equal(id, 2);
                });
        });

        it('should not re-add the first composer', function () {
            return dbUtils.insertComposer('J.S.', 'Bach', db).
                then(function (id) {
                    assert.equal(id, 1);
                });
        });
    });

    describe('getIdForRow', function () {
        it('can access added composers', function () {
            return dbUtils.getIdForRow('composers', {
                firstName: 'Dieterich', 
                lastName: 'Buxtehude'
            }, db).then(function (id) {
                assert.equal(id, 2);
            });
        });

        it ('can add new composers', function() {
            return dbUtils.getIdForRow('composers', {
                firstName: 'Alexandre',
                lastName: 'Guilmant'
            }, db).then(function (id) {
                assert.equal(id, 3);
            });
        });
    });
});

after(function() {
    dbUtils.finish(db);
});
