"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@middy/core");
var http_json_body_parser_1 = require("@middy/http-json-body-parser");
var http_event_normalizer_1 = require("@middy/http-event-normalizer");
var http_error_handler_1 = require("@middy/http-error-handler");
exports.default = (function (handler) { return core_1.default(handler)
    .use([
    http_json_body_parser_1.default(),
    http_event_normalizer_1.default(),
    http_error_handler_1.default()
]); });
//# sourceMappingURL=commonMiddleware.js.map