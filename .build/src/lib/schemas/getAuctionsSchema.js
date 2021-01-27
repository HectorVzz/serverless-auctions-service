"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    properties: {
        queryStringParameters: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: ['OPEN', 'CLOSED'],
                    default: 'OPEN',
                },
            },
        },
    },
    required: [
        'queryStringParameters',
    ],
};
exports.default = schema;
//# sourceMappingURL=getAuctionsSchema.js.map