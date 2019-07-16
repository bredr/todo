// package: todo
// file: todo.proto

var todo_pb = require("./todo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Todo = (function () {
  function Todo() {}
  Todo.serviceName = "todo.Todo";
  return Todo;
}());

Todo.UpsertItem = {
  methodName: "UpsertItem",
  service: Todo,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.Item,
  responseType: todo_pb.ID
};

Todo.GetItems = {
  methodName: "GetItems",
  service: Todo,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.Pagination,
  responseType: todo_pb.Items
};

Todo.GetItem = {
  methodName: "GetItem",
  service: Todo,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.ID,
  responseType: todo_pb.Item
};

Todo.RemoveItem = {
  methodName: "RemoveItem",
  service: Todo,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.ID,
  responseType: todo_pb.Empty
};

exports.Todo = Todo;

function TodoClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TodoClient.prototype.upsertItem = function upsertItem(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Todo.UpsertItem, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TodoClient.prototype.getItems = function getItems(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Todo.GetItems, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TodoClient.prototype.getItem = function getItem(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Todo.GetItem, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TodoClient.prototype.removeItem = function removeItem(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Todo.RemoveItem, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TodoClient = TodoClient;

