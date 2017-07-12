'use strict';

const globalDB = require('./db')();
const Promise = require('bluebird');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'dbUtils'});

let getIdForRow = function (tableName, rowJson, db = globalDB) {
    let nameJson = {name: 'getIdForRow'};
    return new Promise(function (resolve, reject) {
        db.initialize();

        db.select('id').from(tableName).where(rowJson).then(function (row) {
            if (row.length === 0) {
                log.info(nameJson,
                    'Inserting new element %j into %s', rowJson, tableName);
                db.insert(rowJson).into(tableName).then(function (id) {
                    log.info(nameJson,
                        'Inserted element %j into %s with id %d',
                        rowJson, tableName, id);
                    resolve(id[0]);
                });
            } else {
                if (row.length > 1) {
                    log.warn(nameJson, 'Duplicate entry for %j in %s',
                        row, tableName);
                }
                let id = row[0].id;
                log.info(nameJson,
                    'Found existing entry for %j in %s with id %d',
                    rowJson, tableName, id);
                resolve(id);
            }
        }).catch(function (error) {
            log.error('Failure in getIdForRow');
            reject(error);
        });
    });
};


let insertComposer = function (first, last, db = globalDB) {
    return new Promise(function (resolve, reject) {
        db.initialize();

        getIdForRow('composers', {
            firstName: first,
            lastName: last
        }, db).then(function (id) {
            log.info('%s %s has id %d', first, last, id);
        }).catch(function (error) {
            log.error('Failure in dbUtils.insertComposer');
            reject(error);
        });
    });
};

let insertPiece = function (pieceName, compId, db = globalDB) {
    return new Promise(function (resolve, reject) {
        db.initialize();

        getIdForRow('pieces', {
            name: pieceName,
            composerId: compId
        }).then(function (id) {
            log.info('%s has id %d', pieceName, id);
        }).catch(function (error) {
            log.error('Failure in dbUtils.insertPiece');
            reject(error);
        });
    });
};

let finish = function (db = globalDB) {
    db.destroy();
};

module.exports = {
    insertPiece: insertPiece,
    insertComposer: insertComposer,
    getIdForRow: getIdForRow,
    finish: finish
};
