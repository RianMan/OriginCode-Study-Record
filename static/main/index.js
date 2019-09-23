"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = _interopRequireDefault(require("commander"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.option('-p, --port [value]', '输入一个端口号').parse(process.argv);

const server = new _server.default(_commander.default);
server.start();
var _default = _commander.default;
exports.default = _default;