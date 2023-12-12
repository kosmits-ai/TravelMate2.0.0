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
} = require("../service/UserService.js") // Assuming DefaultService.js is at this path
const got = require("got")
const app = require("../index.js")

test("Async", async (t) => {
  const res = Promise.resolve("test")
  t.is(await res, "test")
})

test.before(async (t) => {
  t.context.server = http.createServer(app)
  t.context.prefixUrl =
    "https://travelmate200-production.up.railway.app"
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  })
})

test("successfully search for a trip", async (t) => {
  const result = await searchTrip()
  t.is(result.StartDest, "Ioannina - Arta")
  t.is(result.TripDate, "08/08/23")
  t.is(result.NumberOfMates, 2)
  t.is(result.TypeOfVehicle, "Toyota Yaris")
  t.is(result.TotalCost, "20 euros")
})

test("successfully create a trip", async (t) => {
  const result = await createTrip()
  t.is(result.length, 2)
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

test("successfully delete a trip", async (t) => {
  const result = await deleteTrip()
  t.is(result.length, 2)
  t.is(result[0].error, "Successful delete. No trips found.")
  t.is(result[1].error, "Successful delete. No trips found.")
})

test("successfully edit a trip", async (t) => {
  const result = await editTrip()
  t.is(result.length, 2)
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

test("successfully retrieve a notification", async (t) => {
  const result = await getNotification()
  t.is(result.notification_id, 93203)
  t.is(result.notification_msg, "You received a new message!")
})
// test("")
test("successfully book a seat", async (t) => {
  const result = await bookseat()
  t.is(result.Start, "Lamia")
  t.is(result.Destination, "Mesologgi")
  t.is(result.Date, "03-04-23")
  t.is(result.Available, true)
  t.is(result.ID, 23456)

})

test("successfully chatting with a user", async (t) => {
  const result = await chatWithUser()
  t.is(result.conversation, "Hey. How are you?")
  t.is(result.chat_user_id, 394883)
})

test("successfully defined personal details", async (t) => {
  const result = await personaldetails()
  t.is(result.length, 2)
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

test("successfully rating a user", async (t) => {
  const result = await rateUser()
  t.is(result.rated_id, 239229)
  t.is(result.rating , 4)

}
)

test("successfully view chat", async (t) => {
  const result = await viewChatWithUser()
  t.is(result.conversation, "Hey. How are you?")
  t.is(result.chat_user_id, 394883)
})

test("successfully view a trip", async (t) => {
  const result = await viewTrip()
  t.is(result.length, 2)
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

test.after.always((t) => {
  t.context.server.close()
})
test('View Trip details', async (t) => {
  const userid = 123;  
  const tripid = 456;  
  const url = `user/${userid}/trip/${tripid}`;

    const { body, statusCode } = await t.context.got(url);
    console.log({ body, statusCode });  
    t.is(body[0].StartDest, "Patra - Athina");
    t.is(body[0].TripDate, "07/07/23");
    t.is(body[0].NumberOfMates, 4);
    t.is(body[0].TypeOfVehicle, "Mercedes Benz");
    t.is(body[0].TotalCost, "50 euros");
    t.is(statusCode, 200);
  } 
);


test('Search for a Trip', async (t) => {
  const userid = 123; 
  const url = `user/${userid}/searchTrip`;
  const { body, statusCode } = await t.context.got(url);

  console.log({ body, statusCode });  

  t.is(body.StartDest, "Ioannina - Arta");
  t.is(body.TripDate, "08/08/23");
  t.is(body.NumberOfMates, 2);
  t.is(body.TypeOfVehicle, "Toyota Yaris");
  t.is(body.TotalCost, "20 euros");
  t.is(statusCode, 200);
});

test('View chat with a user', async(t) => {
  const userid = 123;
  const url = `user/${userid}/chat`;
  const {body, statusCode} = await t.context.got(url);

  console.log({ body, statusCode });  

  t.is(body.conversation, "Hey. How are you?");
  t.is(body.chat_user_id, 394883);

})
;

test('View notification', async(t) => {
  const userid = 123;
  const url = `user/${userid}/notification`;
  const {body, statusCode} = await t.context.got(url);

  console.log({ body, statusCode });  

  t.is(body.notification_id, 93203);
  t.is(body.notification_msg, "You received a new message!");

});
test('Book an available seat', async (t) => {
  const userid = 123;
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}/book`;

  const postData = {
    Start: 'Lamia',
    Destination: 'Mesologgi',
    Date: '03-04-23',
    Available: true,
    ID: 23456,
    SeatNumber: 2,
  };
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData, 
    });
    console.log({ body, statusCode });
    t.is(body.Start, "Lamia");
    t.is(body.Destination, "Mesologgi");
    t.is(body.Date, "03-04-23");
    t.is(body.Available, true);
    t.is(body.ID, 23456);
    t.is(statusCode, 200);
});

test('Add personal information', async (t) => {
  const userid = 123;
  const url = `user/${userid}/info`;

  const postData = {
    email: "random@gmail.com",
    password: "dks23mc$",
    firstName: "George",
    LastName: "Hill",
    phone: 306948721232,
    gender: "Male",
  };

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    });

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Rate a user', async (t) => {
  const userid = 123;
  const url = `user/${userid}/rate`;

  const postData = {
    rated_id: 239229,
    rating: 4
  };

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    });

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Create a trip', async (t) => {
  const userid = 123;
  const url = `user/${userid}/trip`;

  const postData = {
    Start: "Kalamata",
    Destination: "Peiraias",
    TripDate: "03/03/23",
    NumberOfMates: 4,
    TypeOfVehicle: "BMW 316i",
    TotalCost: "121.32 euros",
  };

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    });

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Chat with a user', async (t) => {
  const userid = 123;
  const url = `user/${userid}/chat`;

  const postData = {
    conversation: "Hey. How are you?",
    chat_user_id: 394883,
  };

  try {
    const { body, statusCode } = await t.context.got.post(url, {
      json: postData,
    });

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Edit a trip', async (t) => {
  const userid = 123;
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}`;

  const postData = {
    Start: "Athina",
    Destination: "Thessaloniki",
    TripDate: "05/05/23",
    NumberOfMates: 3,
    TypeOfVehicle: "Toyota AYGO",
    TotalCost: "100 euros",
  };

  try {
    const { body, statusCode } = await t.context.got.put(url, {
      json: postData,
    });

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Delete a trip', async (t) => {
  const userid = 123;
  const tripid = 456;
  const url = `user/${userid}/trip/${tripid}`;

  try {
    const { body, statusCode } = await t.context.got.delete(url);

    console.log({ body, statusCode });

    if (statusCode !== 200) {
      console.error('Unexpected status code:', statusCode);
      console.error('Response body:', body);
    }

    t.is(statusCode, 200);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error; // Re-throw the error to mark the test as failed
  }
});

test('Error in adding personal information', async (t) => {
  const invalidUserId = 'hedcvf';
  const url = `user/${invalidUserId}/info`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in creating a trip', async (t) => {
  const invalidUserId = 'bejhr';
  const url = `user/${invalidUserId}/trip`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in viewing a trip', async (t) => {
  const invalidUserId = 'bejhr';
  const tripId = 234;
  const url = `user/${invalidUserId}/trip/${tripId}`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in viewing a trip 2', async (t) => {
  const invalidUserId = 'bejhr';
  const invalidTripId = 'sjssjs';
  const url = `user/${invalidUserId}/trip/${invalidTripId}`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid and tripid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in viewing a trip 3', async (t) => {
  const UserId = 123;
  const invalidTripId = 'sjssjs';
  const url = `user/${UserId}/trip/${invalidTripId}`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid tripid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in booking a seat', async (t) => {
  const invalidUserId = 'bejhr';
  const tripId = 234;
  const url = `user/${invalidUserId}/trip/${tripId}/book`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in booking a seat 2', async (t) => {
  const UserId = 123;
  const invalidTripId = 'sjssjs';
  const url = `user/${UserId}/trip/${invalidTripId}/book`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid tripid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});

test('Error in booking a seat 3', async (t) => {
  const invalidUserId = 'fdbwf3vwjf';
  const invalidtripId = 'snccse';
  const url = `user/${invalidUserId}/trip/${invalidtripId}/book`;
   try {
    const response = await t.context.got.post(url, {
      json: true,
      responseType: 'json',
      throwHttpErrors: false, // Don't throw errors on 4xx/5xx status codes
    });
    console.log({"Bad request, invalid userid and tripid!": response.statusCode });
    t.is(response.statusCode, 400);
  } catch (error) {
    console.error('Error:', error.response ? error.response.body : error.message);
    throw error;
  }
});