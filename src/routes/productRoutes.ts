import express from 'express';
import multer from 'multer';
import { getAll, create, update, remove } from '../controllers/productController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.get('/', getAll);
router.post('/', upload.array('images'), create);
router.put('/:id', upload.array('images'), update);
router.delete('/:id', remove);

export default router;
