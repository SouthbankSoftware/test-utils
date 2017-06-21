const shelljs = require('shelljs');
const os = require('os');
const TMP_DIR = os.platform() !== 'win32' ? 'data' : '/tmp/data';

const MLAUNCH = os.platform() !== 'win32' ? 'mlaunch' : 'bash -c "mlaunch ';
const MGENERATE = os.platform() !== 'win32' ? 'mgenerate' : 'bash -c "mgenerate ';

/**
 * generate random port number between 6000 and 7000
 * @returns {number}
 */
const getRandomPort = () => {
  return Math.floor(Math.random() * 7000) + 6000;
};

/**
 * launch mongodb instance
 *
 * @param  type [description]
 */
const launchMongoInstance = (type, port, parameters) => {
  let command = MLAUNCH +
    ' init ' +
    type +
    ' --dir ' +
    TMP_DIR +
    '/' +
    port +
    ' --port ' +
    port +
    ' ' + '  --hostname localhost ' +
    parameters;
  if (os.platform() === 'win32') {
    command += '"';
  }
  console.log('launch command ', command);
  shelljs.exec(command);
};

/**
 * launch a single mongodb instance
 *
 */
const launchSingleInstance = (port, parameters = '') => {
  launchMongoInstance('--single', port, parameters);
};

/**
 * launch replica set
 *
 */
const launchReplicaSet = (port, nodenumber, parameters) => {
  console.log('launch replica set ', port);
  launchMongoInstance('--replicaset', port, '--nodes ' + nodenumber + ' ' + parameters);
};

/**
 * launch a mongos clusters
 * @param port
 * @param nodenumber
 * @param parameters
 */
const launchMongos = (port, nodenumber, parameters) => {
  launchMongoInstance('--mongos ' + nodenumber, port, parameters);
};


const templateJson = '{ "_id" : ObjectId("5949c7671b9ea95bdd6c46ef"), "user" : { "name" : { "last" : "King", "first" : "Ellie" }, "gender" : "female", "created_at" : ISODate("2010-03-04T04:50:20Z"), "is_active" : false, "address" : { "city" : "Brooklyn", "house_no" : 80, "street" : "oaVrcaeKVg", "zip_code" : 56602 }, "age" : 85 }, "tags" : [ { "id" : ObjectId("5949c7671b9ea95bdd6c46ea"), "subtags" : [ "iG5IKXQQfv", "LnR3xNKPaT", "eLHVdXOg2D", "PijR0Cdqwg", "kV8WNxQ8vX" ], "label" : "Joly4EuAlg" }, { "id" : ObjectId("5949c7671b9ea95bdd6c46eb"), "label" : "CG64zqpq8y" }, { "id" : ObjectId("5949c7671b9ea95bdd6c46ec"), "label" : "ucVTpyecuS" }, { "id" : ObjectId("5949c7671b9ea95bdd6c46ed"), "label" : "6ksf1rq5tm" }, { "id" : ObjectId("5949c7671b9ea95bdd6c46ee"), "label" : "ZR8pwsXQlS" } ] }';
/**
 * generate mongo dump data on the collection
 *
 * @param port
 * @param dbName
 * @param colName
 * @param parameters
 */
const generateMongoData = (port, dbName = 'test', colName = 'test', parameters = '') => {
  let command = MGENERATE + ' ' + templateJson + ' --num 1 --port ' +
    port +
    ' --database ' +
    dbName +
    ' --collection ' +
    colName +
    ' ' +
    parameters;
  if (os.platform() === 'win32') {
    command += '"';
  }
  shelljs.exec(command);
  console.log('finish generating data:' + command);
};

/**
 * shutdown mongo instance based on port number
 *
 * @param port
 */
const killMongoInstance = (port) => {
  const command = MLAUNCH + ' kill --dir ' + TMP_DIR + '/' + port;
  shelljs.exec(command);
  os.platform() !== 'win32' ? shelljs.exec('rm -fr ' + TMP_DIR + '/' + port) : shelljs.exec('bash -c "rm -fr ' + TMP_DIR + '/' + port + '"');
};

module.exports = {
  launchSingleInstance,
  killMongoInstance,
  launchMongoInstance,
  launchReplicaSet,
  launchMongos,
  getRandomPort,
  generateMongoData,
};
