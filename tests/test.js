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
// const { searchTrip } = require('../service/UserService.js'); // Assuming DefaultService.js is at this path
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
  t.is(result[0].TypeOfVehicle, "Mercedes benz")
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
// test("Search for a trip returns the expected result", async (t) => {
//   // Call the actual API endpoint using got for
//   const responseSearchTrip = await t.context.got.post({
//     json: {
//       userid: 123,
//       start: "Ioannina",
//       destination: "Arta",
//       date: "08/08/23",
//     },
//     responseType: "json",
//     timeout: 10000,
//   })

//   // Extract the response data for searchTrip
//   const resultSearchTrip = responseSearchTrip.body

//   // Define the expected result for searchTrip
//   const expectedSearchTrip = {
//     StartDest: "Ioannina - Arta",
//     TripDate: "08/08/23",
//     NumberOfMates: 2,
//     TypeOfVehicle: "Toyota Yaris",
//     TotalCost: "20 euros",
//   }

//   // Assert that the result for searchTrip matches the expected output
//   t.deepEqual(resultSearchTrip, expectedSearchTrip)
// })
