'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

// This function is responsible for handling the booking of a seat.
module.exports.bookseat = function bookseat (req, res, next, body, userid, tripid) {
  User.bookseat(body, userid, tripid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling chat with a user.
module.exports.chatWithUser = function chatWithUser (req, res, next, body, userid) {
  User.chatWithUser(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the creation of a new trip.
module.exports.createTrip = function createTrip (req, res, next, body, userid) {
  User.createTrip(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the deletion of a trip.
module.exports.deleteTrip = function deleteTrip (req, res, next, userid, tripid, start, destination, date) {
  User.deleteTrip(userid, tripid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the editing of a trip.
module.exports.editTrip = function editTrip (req, res, next, userid, tripid, start, destination, date) {
  User.editTrip(userid, tripid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the notifications of a user.
module.exports.getNotification = function getNotification (req, res, next, userid) {
  User.getNotification(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the addition of personal details of a user.
module.exports.personaldetails = function personaldetails (req, res, next, body, userid) {
  User.personaldetails(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the rating of a user.
module.exports.rateUser = function rateUser (req, res, next, body, userid) {
  User.rateUser(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the search of a trip.
module.exports.searchTrip = function searchTrip (req, res, next, userid, start, destination, date) {
  User.searchTrip(userid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for handling the viewing of a chat with a user.
module.exports.viewChatWithUser = function viewChatWithUser (req, res, next, userid) {
  User.viewChatWithUser(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
// This function is responsible for viewing a created trip.
module.exports.viewTrip = function viewTrip (req, res, next, userid, tripid) {
  User.viewTrip(userid, tripid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
