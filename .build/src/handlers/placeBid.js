"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var aws_sdk_1 = require("aws-sdk");
var commonMiddleware_1 = require("../lib/commonMiddleware");
var http_errors_1 = require("http-errors");
var getAuction_1 = require("./getAuction");
var validator_1 = require("@middy/validator");
var placeBidSchema_1 = require("../lib/schemas/placeBidSchema");
var dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
function placeBid(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var id, amount, email, auction, params, updatedAuction, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = event.pathParameters.id;
                    amount = event.body.amount;
                    email = event.requestContext.authorizer.email;
                    return [4 /*yield*/, getAuction_1.getAuctionById(id)];
                case 1:
                    auction = _a.sent();
                    if (auction.status === 'CLOSED') {
                        throw new http_errors_1.default.Forbidden("Auction is closed!");
                    }
                    if (amount <= auction.highestBid.amount) {
                        throw new http_errors_1.default.Forbidden("Your bid must be higher than " + auction.highestBid.amount + "!");
                    }
                    params = {
                        TableName: process.env.AUCTIONS_TABLE_NAME,
                        Key: { id: id },
                        UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :bidder',
                        ExpressionAttributeValues: {
                            ':amount': amount,
                            ':bidder': email,
                        },
                        ReturnValues: 'ALL_NEW',
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, dynamodb.update(params).promise()];
                case 3:
                    result = _a.sent();
                    updatedAuction = result.Attributes;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    throw new http_errors_1.default.InternalServerError(error_1);
                case 5: return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify(updatedAuction),
                    }];
            }
        });
    });
}
exports.handler = commonMiddleware_1.default(placeBid).use(validator_1.default({ inputSchema: placeBidSchema_1.default }));
//# sourceMappingURL=placeBid.js.map