// Define the ResponsePayload class
class ResponsePayload {
  // Constructor with default values for code and payload
  constructor(code = 200, payload = {}) {
    this.code = code;
    this.payload = payload;
  }
}

// Function to create a ResponsePayload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Function to write JSON response
exports.writeJson = function(response, arg1, arg2) {
  // Determine code and payload values
  let code = arg1 instanceof ResponsePayload ? arg1.code : arg1 || 200;
  let payload = arg1 instanceof ResponsePayload ? arg1.payload : arg2 || arg1 || {};

  // Convert payload to JSON if it's an object
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write the response with appropriate headers
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};
