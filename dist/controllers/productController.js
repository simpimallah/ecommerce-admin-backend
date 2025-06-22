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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = void 0;
const ormconfig_1 = require("../ormconfig");
const Product_1 = require("../entities/Product");
const repo = ormconfig_1.AppDataSource.getRepository(Product_1.Product);
// GET all products
const getAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield repo.find();
    res.json(products);
});
exports.getAll = getAll;
// CREATE a new product
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sku, name, price } = req.body;
    const images = (req.files || []).map(file => file.filename);
    const product = repo.create({ sku, name, price, images });
    const result = yield repo.save(product);
    res.status(201).json(result);
});
exports.create = create;
// UPDATE product by ID
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { sku, name, price } = req.body;
    const images = (req.files || []).map(file => file.filename);
    yield repo.update(id, { sku, name, price, images });
    res.json({ message: 'Updated' });
});
exports.update = update;
// DELETE product by ID
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield repo.delete(id);
    res.json({ message: 'Deleted' });
});
exports.remove = remove;
// ✅ Ensure this file is a module
exports.default = {};
