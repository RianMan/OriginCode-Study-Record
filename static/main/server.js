"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _ejs = _interopRequireDefault(require("ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  stat,
  readdir,
  readFile
} = _fs.default.promises;

const tplPath = _path.default.join(__dirname, '../index.ejs');

class HttpServer {
  constructor(config = {}) {
    this.port = config.port || 8888;
    this.server = _http.default.createServer(this.handleRequet.bind(this));
  }

  async handleRequet(req, res) {
    const {
      pathname
    } = _url.default.parse(req.url);

    const filePath = _path.default.join(process.cwd(), pathname);

    try {
      const fileObj = await stat(filePath);

      if (fileObj.isDirectory()) {
        let dirs = await readdir(filePath);
        dirs = dirs.map(d => pathname + d);

        try {
          let str = await _ejs.default.renderFile(tplPath, {
            dirs
          });
          res.end(str);
        } catch (error) {
          this.sendError(req, res);
        }
      } else {
        try {
          console.log(filePath, 'filePath');
          const data = await readFile(filePath, 'utf8');

          const name = _mime.default.getType(filePath);

          res.setHeader('Content-Type', name + ";charset=utf-8");
          res.end(data);
        } catch (error) {
          this.sendError(req, res);
        }
      }
    } catch (error) {
      console.log(error);
      this.sendError(req, res);
    }
  }

  readTemp(data) {}

  sendError(req, res) {
    res.statusCode = 404;
    res.end('not found');
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`服务已经启动在: http://localhost:${this.port}`);
    });
  }

}

var _default = HttpServer;
exports.default = _default;