'use strict';


/**
 * Book a seat in available trip
 * A registered user must be able to book a seat in available trip.
 *
 * body BookingRequest  (optional)
 * userid Long ID of user who books an available seat.
 * tripid Long ID of specific available trip.
 * returns SeatStatus
 **/
exports.bookseat = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Start" : "Lamia",
  "Destination" : "Mesologgi",
  "Date" : "03-04-23",
  "Available" : true,
  "ID" : 23456
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User sends message to other user
 * A registered user must be able to chat with other user
 *
 * body Chat  (optional)
 * userid Integer ID of user who wants to chat with other user
 * returns Chat
 **/
exports.chatWithUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "conversation" : "Hey. How are you?",
  "chat_user_id" : 394883
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create Trip
 * FR4. A registered user must be able to create a trip.
 *
 * body CreatedTrip  (optional)
 * userid Integer Specific and unique id for each user.
 * returns List
 **/
exports.createTrip = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "StartDest" : "Kalamata - Ioannina",
  "TripDate" : "03/12/23",
  "NumberOfMates" : 5,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "190.32 euros"
}, {
  "StartDest" : "Kalamata - Peiraias",
  "TripDate" : "03/03/23",
  "NumberOfMates" : 4,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "121.32 euros"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User deletes trip.
 * FR5. A registered user must be able to delete his/her own trip.
 *
 * userid Integer Specific and unique id for each user.
 * tripid Integer Specific and unique id for each user.
 * start String Start destination which user searches (optional)
 * destination String End destination which user searches (optional)
 * date String Date when user searches for available trip (optional)
 * returns List
 **/
exports.deleteTrip = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "error" : "Successful delete. No trips found."
}, {
  "error" : "Successful delete. No trips found."
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User edits trip
 * FR5. A registered user must be able to edit the details of his/her own trip.
 *
 * userid Integer Specific and unique id for each user.
 * tripid Integer Specific and unique id for each trip.
 * start String Start destination which user searches (optional)
 * destination String End destination which user searches (optional)
 * date String Date when user searches for available trip (optional)
 * returns List
 **/
exports.editTrip = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "StartDest" : "Kalamata - Peiraias",
  "TripDate" : "03/03/23",
  "NumberOfMates" : 4,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "121.32 euros"
}, {
  "StartDest" : "Kalamata - Thessaloniki",
  "TripDate" : "01/06/23",
  "NumberOfMates" : 2,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "180.32 euros"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User gets notifications from system
 * System must be able to send notification to user
 *
 * userid Integer ID of user who receives notification
 * returns Notification
 **/
exports.getNotification = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "notification_id" : 93203,
  "notification_msg" : "You received a new message!"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Personal Info
 * FR2.A registered user must be able to add his/her personal information.
 *
 * body User  (optional)
 * userid Integer Specific and unique id for each user.
 * returns List
 **/
exports.personaldetails = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "email" : "randomface@gmail.com",
  "password" : "dks23mc$",
  "firstName" : "Gus",
  "lastName" : "Hill",
  "phone" : 306948721232,
  "gender" : "Male"
}, {
  "email" : "random@gmail.com",
  "password" : "dks23mc$",
  "firstName" : "George",
  "lastName" : "Brandon",
  "phone" : 306948721232,
  "gender" : "Male"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User rates other user
 * A registered user must be able to rate other users.
 *
 * body RatingRequest  (optional)
 * userid Integer ID of user who rates other user.
 * returns RatingRequest
 **/
exports.rateUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "rated_id" : 239229,
  "rating" : 4
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Search for a trip
 * A registered user must be able to search for available trips
 *
 * userid Long Userid for user who searches for available trips
 * start String Start destination which user searches (optional)
 * destination String End destination which user searches (optional)
 * date String Date when user searches for available trip (optional)
 * returns CreatedTrip
 **/
exports.searchTrip = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "StartDest" : "Kalamata - Athens",
  "TripDate" : "05/04/23",
  "NumberOfMates" : 3,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "110.50 euros"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User chats with other user
 * A registered user must be able to view chat with other user
 *
 * userid Integer ID of user who wants to see private chat
 * returns Chat
 **/
exports.viewChatWithUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "conversation" : "Hey. How are you?",
  "chat_user_id" : 394883
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User view trip details
 * A user must be able to view trip details
 *
 * userid Integer Specific and unique id for each user.
 * tripid Integer Specific and unique id for each trip.
 * returns List
 **/
exports.viewTrip = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "StartDest" : "Kalamata - Larisa",
  "TripDate" : "02/01/23",
  "NumberOfMates" : 1,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "80.00 euros"
}, {
  "StartDest" : "Kalamata - Peiraias",
  "TripDate" : "03/03/23",
  "NumberOfMates" : 4,
  "TypeOfVehicle" : "BMW 316i",
  "TotalCost" : "121.32 euros"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

