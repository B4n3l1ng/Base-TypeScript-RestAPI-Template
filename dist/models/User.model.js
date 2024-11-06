"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is requires.'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required.'],
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dtiihknqe/image/upload/v1706280251/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV_han5ci.jpg',
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.model.js.map