class ResponsePayload {
  constructor(code = 200, payload = {}) {
    this.code = code;
    this.payload = payload;
  }
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

exports.writeJson = function(response, arg1, arg2) {
  let code = arg1 instanceof ResponsePayload ? arg1.code : arg1 || 200;
  let payload = arg1 instanceof ResponsePayload ? arg1.payload : arg2 || arg1 || {};

  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};