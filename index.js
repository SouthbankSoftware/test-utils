/**
 * Created by joey on 15/6/17.
 */

var {launchMongoInstance, launchSingleInstance, killMongoInstance, launchReplicaSet, launchMongos, getRandomPort, generateMongoData} = require('src/mlaunch_utils');

module.exports = {
  launchSingleInstance,
  killMongoInstance,
  launchMongoInstance,
  launchReplicaSet,
  launchMongos,
  getRandomPort,
  generateMongoData,
};