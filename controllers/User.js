'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.bookseat = function bookseat (res, body, userid, tripid) {
  User.bookseat(body, userid, tripid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.chatWithUser = function chatWithUser (res,body, userid) {
  User.chatWithUser(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createTrip = function createTrip (res,body, userid) {
  User.createTrip(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTrip = function deleteTrip (res, userid, tripid, start, destination, date) {
  User.deleteTrip(userid, tripid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editTrip = function editTrip (res,userid, tripid, start, destination, date) {
  User.editTrip(userid, tripid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNotification = function getNotification (res,userid) {
  User.getNotification(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personaldetails = function personaldetails (res,body, userid) {
  User.personaldetails(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rateUser = function rateUser (res, body, userid) {
  User.rateUser(body, userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchTrip = function searchTrip (res, userid, start, destination, date) {
  User.searchTrip(userid, start, destination, date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewChatWithUser = function viewChatWithUser ( res, userid) {
  User.viewChatWithUser(userid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.viewTrip = function viewTrip (res, userid, tripid) {
  User.viewTrip(userid, tripid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
