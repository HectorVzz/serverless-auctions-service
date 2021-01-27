"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    properties: {
        body: {
            type: 'object',
            properties: {
                amount: {
                    type: 'number',
                },
            },
            required: ['amount'],
        },
    },
    required: ['body'],
};
exports.default = schema;
//# sourceMappingURL=placeBidSchema.js.map