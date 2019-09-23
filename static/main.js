"use strict";

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = _commander.default.option('-c, --cheese [type]', 'Add cheese with optional type').parse(process.argv);

console.log(config);
