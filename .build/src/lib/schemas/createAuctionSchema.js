"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    properties: {
        body: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
            },
            required: ['title'],
        },
    },
    required: ['body'],
};
exports.default = schema;
//# sourceMappingURL=createAuctionSchema.js.map