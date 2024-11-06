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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_model_1 = require("../models/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const cloudinary_config_1 = require("../middlewares/cloudinary.config");
const router = express_1.default.Router();
router.post('/signup', cloudinary_config_1.uploader.single('imageUrl'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        res.status(400).json({ message: 'Please provide email and password.' });
        return;
    }
    try {
        const foundUser = yield User_model_1.User.findOne({ email });
        if (foundUser) {
            res.status(406).json({ message: 'That email already exists, please try a different one.' });
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(12);
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            const userToSave = { email, hashedPassword };
            if (req.file) {
                userToSave.image = req.file.path;
            }
            yield User_model_1.User.create(userToSave);
            res.status(201).json({ message: 'User created successfully' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const foundUser = yield User_model_1.User.findOne({ email });
        if (foundUser) {
            if (bcryptjs_1.default.compareSync(password, foundUser.hashedPassword)) {
                const authToken = jsonwebtoken_1.default.sign({ expiresIn: '6h', userId: foundUser._id }, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
                res.status(200).json(authToken);
            }
            else {
                res.status(401).json({ message: 'Incorrect password.' });
            }
        }
        else {
            res.status(404).json({ message: 'No user with that email was found.' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}));
router.get('/verify', isAuthenticated_1.isAuthenticated, (req, res, next) => {
    // You need to use the middleware there, if the request passes the middleware, it means your token is good
    res.status(200).json(req.payload);
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map