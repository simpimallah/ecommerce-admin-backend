import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Product } from '../entities/Product';

const repo = AppDataSource.getRepository(Product);

// GET all products
export const getAll = async (_req: Request, res: Response) => {
  const products = await repo.find();
  res.json(products);
};

// CREATE a new product
export const create = async (req: Request, res: Response) => {
  const { sku, name, price } = req.body;
  const images = (req.files as Express.Multer.File[] || []).map(file => file.filename);
  const product = repo.create({ sku, name, price, images });
  const result = await repo.save(product);
  res.status(201).json(result);
};

// UPDATE product by ID
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sku, name, price } = req.body;
  const images = (req.files as Express.Multer.File[] || []).map(file => file.filename);

  await repo.update(id, { sku, name, price, images });
  res.json({ message: 'Updated' });
};

// DELETE product by ID
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await repo.delete(id);
  res.json({ message: 'Deleted' });
};

// ✅ Ensure this file is a module
export default {};
