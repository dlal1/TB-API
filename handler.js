'use strict';
const database = require('./database/database.js');
const helper = require('./helper/helper');

/**
 * This function takes phone number from event and query database,
 * on the basis of which response is given. To achive this, function follows below steps:
 * 1 get customer data
 * 2 create database connection
 * 3 make a query 
 * 4 formate data
 * 5 close connection.
 */
module.exports.getCustomer = async (event) => {

  console.log("get customer lambda invoked with event", event)
  try {

    let phoneNumber = event.pathParameters.phoneNumber;
    console.log("event.pathParameters.id..", phoneNumber);

    let connection = await database.createConnection();

    var data = await database.getCustomerData(phoneNumber, connection);
    console.log("got data from db", data[0]);

    let responseData = await helper.prepareData(phoneNumber, data[0]);
    console.log("responseData..", responseData);
    return responseData;

  } catch (error) {
    console.log("error while getting data from RDS");
  } finally {
    await database.closeConncetion();

  }

};
