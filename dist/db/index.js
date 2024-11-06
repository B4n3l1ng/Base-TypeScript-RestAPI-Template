"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const parentDir = path_1.default.basename(path_1.default.dirname(path_1.default.dirname(path_1.default.dirname(__filename))));
// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app
const MONGO_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${parentDir}`;
mongoose_1.default
    .connect(MONGO_URI)
    .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
})
    .catch((err) => {
    console.error('Error connecting to mongo: ', err);
});
//# sourceMappingURL=index.js.map