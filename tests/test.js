const http = require("http")
const test = require("ava")
const listen = require("test-listen")
const {
  bookseat,
  chatWithUser,
  createTrip,
  deleteTrip,
  editTrip,
  getNotification,
  searchTrip,
  personaldetails,
  rateUser,
  viewChatWithUser,
  viewTrip,
} = require("../service/UserService.js") // Import the functions from the UserService.js file
const got = require("got")
const app = require("../index.js")

test("Async", async (t) => { // Test case to ensure that the async function works properly
  const res = Promise.resolve("test")
  t.is(await res, "test")
})

test.before(async (t) => { 
  t.context.server = http.createServer(app) // Create an HTTP server instance for testing
  t.context.prefixUrl =
    "https://travelmate200-production.up.railway.app" // Define the base URL for API requests
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  })
})

test("successfully searching for a trip", async (t) => {  // Test case to ensure successful searching for a trip with specific details
  const result = await searchTrip() // Checks if the returned trip matches the expected values for start destination,
  t.is(result.StartDest, "Ioannina - Arta")// trip date, number of mates, type of vehicle, and total cost.
  t.is(result.TripDate, "08/08/23")
  t.is(result.NumberOfMates, 2)
  t.is(result.TypeOfVehicle, "Toyota Yaris")
  t.is(result.TotalCost, "20 euros")
})

test("successfully creating a trip", async (t) => { // Test case to ensure successful creation of a trip with specific details
  const result = await createTrip() // Checks if the created trip matches the expected values for start destination,
  t.is(result.length, 2) // trip date, number of mates, type of vehicle, and total cost.
  t.is(result[0].StartDest, "Kalamata - Peiraias")
  t.is(result[0].TripDate, "03/03/23")
  t.is(result[0].NumberOfMates, 4)
  t.is(result[0].TypeOfVehicle, "BMW 316i")
  t.is(result[0].TotalCost, "121.32 euros")
  t.is(result[1].StartDest, "Kalamata - Peiraias")
  t.is(result[1].TripDate, "03/03/23")
  t.is(result[1].NumberOfMates, 4)
  t.is(result[1].TypeOfVehicle, "BMW 316i")
  t.is(result[1].TotalCost, "121.32 euros")
})

test("successfully deleting a trip", async (t) => { // Test case to ensure successful deletion of a trip
  const result = await deleteTrip() 
  t.is(result.length, 2)
  t.is(result[0].error, "Successful delete. No trips found.")
  t.is(result[1].error, "Successful delete. No trips found.")
})

test("successfully editing a trip", async (t) => { // Test case to ensure successful editing of a trip with specific details
  const result = await editTrip() // Checks if the edited trip matches the expected values for start destination,
  t.is(result.length, 2) // trip date, number of mates, type of vehicle, and total cost.
  t.is(result[0].StartDest, "Athina - Thessaloniki")
  t.is(result[0].TripDate, "05/05/23")
  t.is(result[0].NumberOfMates, 3)
  t.is(result[0].TypeOfVehicle, "Toyota AYGO")
  t.is(result[0].TotalCost, "100 euros")
  t.is(result[1].StartDest, "Athina - Thessaloniki")
  t.is(result[1].TripDate, "05/05/23")
  t.is(result[1].NumberOfMates, 3)
  t.is(result[1].TypeOfVehicle, "Toyota AYGO")
  t.is(result[1].TotalCost, "100 euros")
})

test("successfully retrieving a notification", async (t) => { // Test case to ensure successful retrieval of a notification
  const result = await getNotification() // Checks if the retrieved notification matches the expected values for notification id and message.
  t.is(result.notification_id, 93203) 
  t.is(result.notification_msg, "You received a new message!")
})

test("successfully booking a seat", async (t) => { // Test case to ensure successful booking of a seat with specific details
  const result = await bookseat() // Checks if the booked seat matches the expected values for start destination,
  t.is(result.Start, "Lamia") // destination, date, availability, and id.
  t.is(result.Destination, "Mesologgi")
  t.is(result.Date, "03-04-23")
  t.is(result.Available, true)
  t.is(result.ID, 23456)

})

test("successfully chatting with a user", async (t) => { // Test case to ensure successful chatting with a user with specific details
  const result = await chatWithUser() // Checks if the chat matches the expected values for conversation and chat user id.
  t.is(result.conversation, "Hey. How are you?")
  t.is(result.chat_user_id, 394883)
})

test("successfully defining personal details", async (t) => { // Test case to ensure successful definition of personal details with specific details
  const result = await personaldetails() // Checks if the personal details match the expected values for email, password, first name,
  t.is(result.length, 2) // last name, phone, gender.
  t.is(result[0].email, "random@gmail.com")
  t.is(result[0].password, "dks23mc$")
  t.is(result[0].firstName, "George")
  t.is(result[0].lastName, "Hill")
  t.is(result[0].phone, 306948721232)
  t.is(result[0].gender, "Male")
  t.is(result[1].email, "random@gmail.com")
  t.is(result[1].password, "dks23mc$")
  t.is(result[1].firstName, "George")
  t.is(result[1].lastName, "Hill")
  t.is(result[1].phone, 306948721232)
  t.is(result[1].gender, "Male")


})

test("successfully rating a user", async (t) => { // Test case to ensure successful rating of a user with specific details
  const result = await rateUser() // Checks if the rating matches the expected values for rated id and rating.
  t.is(result.rated_id, 239229)
  t.is(result.rating , 4)

}
)

test("successfully viewing chat", async (t) => { // Test case to ensure successful viewing of chat with a user with specific details
  const result = await viewChatWithUser() // Checks if the chat matches the expected values for conversation and chat user id.
  t.is(result.conversation, "Hey. How are you?")
  t.is(result.chat_user_id, 394883)
})

test("successfully viewing a trip", async (t) => { // Test case to ensure successful viewing of a trip with specific details
  const result = await viewTrip() // Checks if the trip matches the expected values for start destination,
  t.is(result.length, 2) // trip date, number of mates, type of vehicle, and total cost.
  t.is(result[0].StartDest, "Patra - Athina")
  t.is(result[0].TripDate, "07/07/23")
  t.is(result[0].NumberOfMates, 4)
  t.is(result[0].TypeOfVehicle, "Mercedes Benz")
  t.is(result[0].TotalCost, "50 euros")
  t.is(result[1].StartDest, "Patra - Athina")
  t.is(result[1].TripDate, "07/07/23")
  t.is(result[1].NumberOfMates, 4)
  t.is(result[1].TypeOfVehicle, "Mercedes Benz")
  t.is(result[1].TotalCost, "50 euros")
})

test.after.always((t) => { // Close the server when the test is finished
  t.context.server.close()
})
test('View Trip details', async (t) => { 
  const userid = 123;  // Define user and trip identifiers
  const tripid = 456;  
  const url = `user/${userid}/trip/${tripid}`; // Construct the URL for fetching trip details

    const { body, statusCode } = await t.context.got(url); // Make an HTTP request to retrieve trip details
    console.log({ body, statusCode });  // Log the response body and status code
    t.is(body[0].StartDest, "Patra - Athina"); 
    t.is(body[0].TripDate, "07/07/23");
    t.is(body[0].NumberOfMates, 4);
    t.is(body[0].TypeOfVehicle, "Mercedes Benz");
    t.is(body[0].TotalCost, "50 euros"); // Validate the received trip details
    t.is(statusCode, 200);   // Ensure that the HTTP status code is 200 (OK)
  } 
);


test('Search for a Trip', async (t) => { 
  const userid = 123;  // Define user identifier
  const url = `user/${userid}/searchTrip`; // Construct the URL for searching a trip
  const { body, statusCode } = await t.context.got(url); // Make an HTTP request to search for a trip

  console.log({ body, statusCode });  // Log the response body and status code

  t.is(body.StartDest, "Ioannina - Arta"); 
  t.is(body.TripDate, "08/08/23");
  t.is(body.NumberOfMates, 2);
  t.is(body.TypeOfVehicle, "Toyota Yaris");
  t.is(body.TotalCost, "20 euros"); // Validate the received trip details
  t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
});

test('View chat with a user', async(t) => {
  const userid = 123; // Define user identifier
  const url = `user/${userid}/chat`; // Construct the URL for viewing chat with a user
  const {body, statusCode} = await t.context.got(url); // Make an HTTP request to view chat with a user

  console.log({ body, statusCode });  // Log the response body and status code

  t.is(body.conversation, "Hey. How are you?"); 
  t.is(body.chat_user_id, 394883); // Validate the received chat details
  t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
})
;

test('View notification', async(t) => {
  const userid = 123; // Define user identifier
  const url = `user/${userid}/notification`; // Construct the URL for viewing notification
  const {body, statusCode} = await t.context.got(url); // Make an HTTP request to view notification

  console.log({ body, statusCode });  // Log the response body and status code

  t.is(body.notification_id, 93203); 
  t.is(body.notification_msg, "You received a new message!"); // Validate the received notification details
  t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)

});
test('Book an available seat', async (t) => {
  const userid = 123; // Define user and trip identifiers
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}/book`; // Construct the URL for booking a seat

  const postData = { 
    Start: 'Lamia',
    Destination: 'Mesologgi',
    Date: '03-04-23',
    Available: true,
    ID: 23456,
    SeatNumber: 2,
  }; // Define the data to be sent in the HTTP request body
    const { body, statusCode } = await t.context.got.post(url, { 
      json: postData, 
    }); // Make an HTTP request to book a seat
    console.log({ body, statusCode }); // Log the response body and status code
    t.is(body.Start, "Lamia");
    t.is(body.Destination, "Mesologgi");
    t.is(body.Date, "03-04-23");
    t.is(body.Available, true);
    t.is(body.ID, 23456); // Validate the received seat details
    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
});

test('Add personal information', async (t) => { 
  const userid = 123; // Define user identifier
  const url = `user/${userid}/info`; // Construct the URL for adding personal information

  const postData = { 
    email: "random@gmail.com",
    password: "dks23mc$",
    firstName: "George",
    LastName: "Hill",
    phone: 306948721232,
    gender: "Male",
  }; // Define the data to be sent in the HTTP request body

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    }); // Make an HTTP request to add personal information

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) { 
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Rate a user', async (t) => {
  const userid = 123; // Define user identifier
  const url = `user/${userid}/rate`; // Construct the URL for rating a user

  const postData = { 
    rated_id: 239229,
    rating: 4
  }; // Define the data to be sent in the HTTP request body

  try {
    const { body, statusCode } = await t.context.got.post(url, { 
      json: postData,
    }); // Make an HTTP request to rate a user

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) { 
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Create a trip', async (t) => { 
  const userid = 123; // Define user identifier
  const url = `user/${userid}/trip`; // Construct the URL for creating a trip

  const postData = { 
    Start: "Kalamata",
    Destination: "Peiraias",
    TripDate: "03/03/23",
    NumberOfMates: 4,
    TypeOfVehicle: "BMW 316i",
    TotalCost: "121.32 euros",
  }; // Define the data to be sent in the HTTP request body

  try {
    const { body, statusCode } = await t.context.got.post(url, { 
      json: postData,
    }); // Make an HTTP POST request to create a trip

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Chat with a user', async (t) => {
  const userid = 123; // Define user identifier
  const url = `user/${userid}/chat`; // Construct the URL for chatting with a user

  const postData = {
    conversation: "Hey. How are you?",
    chat_user_id: 394883,
  }; // Define the data to be sent in the HTTP request body

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    }); // Make an HTTP POST request to chat with a user

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Edit a trip', async (t) => {
  const userid = 123; // Define user and trip identifiers
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}`; // Construct the URL for editing a trip

  const postData = {
    Start: "Athina",
    Destination: "Thessaloniki",
    TripDate: "05/05/23",
    NumberOfMates: 3,
    TypeOfVehicle: "Toyota AYGO",
    TotalCost: "100 euros",
  }; // Define the data to be sent in the HTTP request body

  try {
    const { body, statusCode } = await t.context.got.put(url, {
      json: postData,
    }); // Make an HTTP PUT request to edit a trip

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Delete a trip', async (t) => {
  const userid = 123; // Define user and trip identifiers
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}`; // Construct the URL for deleting a trip

  try {
    const { body, statusCode } = await t.context.got.delete(url); // Make an HTTP DELETE request to delete a trip

    console.log({ body, statusCode }); // Log the response body and status code

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    } // Check for unexpected status code and log details

    t.is(statusCode, 200); // Ensure that the HTTP status code is 200 (OK)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Error in adding personal information', async (t) => {
  const invalidUserId = 'hedcvf';   // Define an invalid user identifier
  const url = `user/${invalidUserId}/info`; // Construct the URL for adding personal information with an invalid user identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to add personal information with an invalid user identifier
    console.log({"Bad request, invalid userid": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in creating a trip', async (t) => {
  const invalidUserId = 'bejhr'; // Define an invalid user identifier
  const url = `user/${invalidUserId}/trip`; // Construct the URL for creating a trip with an invalid user identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to create a trip with an invalid user identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in viewing a trip with invalidUserId', async (t) => {
  const invalidUserId = 'bejhr'; // Define an invalid user identifier
  const tripId = 234; // Define a valid trip identifier
  const url = `user/${invalidUserId}/trip/${tripId}`; // Construct the URL for viewing a trip with an invalid user identifier and valid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to view a trip with an invalid user identifier and valid trip identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in viewing a trip with invalidUserId and invalidTripId', async (t) => {
  const invalidUserId = 'bejhr'; // Define an invalid user identifier
  const invalidTripId = 'sjssjs'; // Define an invalid trip identifier
  const url = `user/${invalidUserId}/trip/${invalidTripId}`; // Construct the URL for viewing a trip with an invalid user identifier and invalid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to view a trip with an invalid user identifier and invalid trip identifier
    console.log({"Bad request, invalid userid and tripid!": response.statusCode });// Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in viewing a trip with invalidTripId', async (t) => {
  const UserId = 123; // Define a valid user identifier
  const invalidTripId = 'sjssjs'; // Define an invalid trip identifier
  const url = `user/${UserId}/trip/${invalidTripId}`; // Construct the URL for viewing a trip with a valid user identifier and invalid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to view a trip with a valid user identifier and invalid trip identifier
    console.log({"Bad request, invalid tripid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in editing a trip', async(t) => {
  const invalidUserId = 'djdjdjk'; // Define an invalid user identifier
  const tripId = 123; // Define a valid trip identifier
  const url = `user/${invalidUserId}/trip/${tripId}`; // Construct the URL for editing a trip with an invalid user identifier and valid trip identifier
  
  
  const updateData = {
    Start: "Volos",
    Destination: "Patra",
    TripDate: "05/05/23",
    NumberOfMates: 3,
    TypeOfVehicle: "Toyota AYGO",
    TotalCost: "80 euros",
  }; // Define the data to be sent in the HTTP request body

  try {
    const response = await t.context.got.put(url, {
      json: updateData,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });

    console.log({"Bad request, invalid update data!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in booking a seat with invalidUserId', async (t) => {
  const invalidUserId = 'bejhr'; // Define an invalid user identifier
  const tripId = 234; // Define a valid trip identifier
  const url = `user/${invalidUserId}/trip/${tripId}/book`; // Construct the URL for booking a seat with an invalid user identifier and valid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to book a seat with an invalid user identifier and valid trip identifier
    console.log({"Bad request, invalid userid!": response.statusCode });
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in booking a seat with invalidTripId', async (t) => {
  const UserId = 123; // Define a valid user identifier
  const invalidTripId = 'sjssjs'; // Define an invalid trip identifier
  const url = `user/${UserId}/trip/${invalidTripId}/book`; // Construct the URL for booking a seat with a valid user identifier and invalid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to book a seat with a valid user identifier and invalid trip identifier
    console.log({"Bad request, invalid tripid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in booking a seat with invalidUserId and invalidTripId', async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const invalidTripId = 'snccse'; // Define an invalid trip identifier
  const url = `user/${invalidUserId}/trip/${invalidTripId}/book`; // Construct the URL for booking a seat with an invalid user identifier and invalid trip identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to book a seat with an invalid user identifier and invalid trip identifier
    console.log({"Bad request, invalid userid and tripid!": response.statusCode });  // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in chatting with other user', async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const url = `user/${invalidUserId}/chat`; // Construct the URL for chatting with a user with an invalid user identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to chat with a user with an invalid user identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in getting message from other user', async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const url = `user/${invalidUserId}/chat`; // Construct the URL for getting message from a user with an invalid user identifier

  try {
    const { statusCode } = await t.context.got(url, {
      throwHttpErrors: false,
    }); // Make an HTTP request to get message from a user with an invalid user identifier

    t.is(statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)

    console.log({"Bad request, invalid userid!": statusCode}); // Log the response status code
  } catch (error) {
    
    console.error('Error:', error);

    if (error.response && error.response.body) {
      console.log('Response body:', error.response.body);
    }
    throw error;
  } // Re-throw the error to mark the test as failed
});


test('Error in rating other user', async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const url = `user/${invalidUserId}/rate`; // Construct the URL for rating a user with an invalid user identifier
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    }); // Make an HTTP POST request to rate a user with an invalid user identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test("Error in getting notification", async (t) => {
const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
const url = `user/${invalidUserId}/notification`; // Construct the URL for getting notification with an invalid user identifier
try {
  const { statusCode } = await t.context.got(url, {
    throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
  }); // Make an HTTP request to get notification with an invalid user identifier

  t.is(statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)

  console.log({"Bad request, invalid userid!": statusCode}); // Log the response status code
} catch (error) {
  
  console.error('Error:', error);

  if (error.response && error.response.body) {
    console.log('Response body:', error.response.body);
  }
  throw error;
} // Re-throw the error to mark the test as failed
});

test('Error in deleting a trip with invalidUserId', async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const tripId = 234; // Define a valid trip identifier
  const url = `user/${invalidUserId}/trip/${tripId}`; // Construct the URL for deleting a trip with an invalid user identifier and valid trip identifier
   try {
    const response = await t.context.got.delete(url, {
      throwHttpErrors: false,
    }); // Make an HTTP DELETE request to delete a trip with an invalid user identifier and valid trip identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test('Error in deleting a trip with invalidTripId', async (t) => {
  const UserId = 123; // Define a valid user identifier
  const invalidTripId = 'sjssjs'; // Define an invalid trip identifier
  
  const url = `user/${UserId}/trip/${invalidTripId}`; // Construct the URL for deleting a trip with a valid user identifier and invalid trip identifier
   try {
    const response = await t.context.got.delete(url, {
      throwHttpErrors: false,
    }); // Make an HTTP DELETE request to delete a trip with a valid user identifier and invalid trip identifier
    console.log({"Bad request, invalid userid!": response.statusCode }); // Log the response status code
    t.is(response.statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } // Re-throw the error to mark the test as failed
});

test("Error in searching a Trip", async (t) => {
  const invalidUserId = 'fdbwf3vwjf'; // Define an invalid user identifier
  const url = `user/${invalidUserId}/searchTrip`; // Construct the URL for searching a trip with an invalid user identifier
  try {
    const { statusCode } = await t.context.got(url, {
      throwHttpErrors: false,
    }); // Make an HTTP request to search for a trip with an invalid user identifier
  
    t.is(statusCode, 400); // Ensure that the HTTP status code is 400 (Bad Request)
  
    console.log({"Bad request, invalid userid!": statusCode}); // Log the response status code
  } catch (error) {
    
    console.error('Error:', error); 
  
    if (error.response && error.response.body) {
      console.log('Response body:', error.response.body);
    }
    throw error; // Re-throw the error to mark the test as failed
  }
  });

