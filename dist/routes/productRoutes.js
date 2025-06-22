"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = (0, multer_1.default)({ storage });
router.get('/', productController_1.getAll);
router.post('/', upload.array('images'), productController_1.create);
router.put('/:id', upload.array('images'), productController_1.update);
router.delete('/:id', productController_1.remove);
exports.default = router;
