const shelljs = require('shelljs');
const os = require('os');
const TMP_DIR = os.platform() !== 'win32' ? 'data': '/tmp/data';

const MLAUNCH = os.platform() !== 'win32' ? 'mlaunch':'bash -c "mlaunch ';
const MGENERATE = os.platform() !== 'win32'? 'mgenerate':'bash -c "mgenerate ';

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
  if(os.platform() === 'win32'){
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

/**
 * generate mongo dump data on the collection
 *
 * @param port
 * @param dbName
 * @param colName
 * @param parameters
 */
const generateMongoData = (port, dbName = 'test', colName = 'test', templateFile, parameters = '') => {
  let command = MGENERATE + ' ' + templateFile + ' --num 1 --port ' +
    port +
    ' --database ' +
    dbName +
    ' --collection ' +
    colName +
    ' ' +
    parameters;
  if(os.platform() === 'win32'){
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
  os.platform() !== 'win32' ? shelljs.exec('rm -fr ' + TMP_DIR + '/' + port): shelljs.exec('bash -c "rm -fr ' + TMP_DIR + '/' + port + '"');
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
