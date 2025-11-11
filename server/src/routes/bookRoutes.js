 import express from 'express';
 import { body, param, validationResult } from 'express-validator';
 import Book from '../models/Book.js';
 import { asyncHandler } from '../middleware/asyncHandler.js';
 const router = express.Router();
 const sendValidationErrors = (req) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
 const err = new Error('Validation failed');
 err.statusCode = 422;
 err.errors = errors.array();
 throw err;
 }
 };
 // GET /api/books – list all
 4
router.get(
 '/',
 asyncHandler(async (req, res) => {
 const books = await Book.find().sort({ createdAt:-1 });
 res.json({ success: true, data: books });
 })
 );
 // GET /api/books/:id – get one
 router.get('/:id',
 param('id').isMongoId().withMessage('Invalid book id'),
 asyncHandler(async (req, res) =>
     {
 sendValidationErrors(req);
 const book = await Book.findById(req.params.id);
 if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
 res.json({ success: true, data: book });
 })
 );
 // POST /api/books – create
 router.post(
 '/',
 body('title').trim().isLength({ min: 2 }).withMessage('Title is required'),
 body('author').trim().notEmpty().withMessage('Author is required'),
 body('price').isFloat({ min:
 0 }).withMessage('Price must be a non‑negative number'),
 body('genre').optional().isString(),
 body('description').optional().isString(),
 body('publishedYear').optional().isInt({ min: 0, max: 3000 }),
 body('inStock').optional().isBoolean(),
 asyncHandler(async (req, res) => 
{
 sendValidationErrors(req);
 const book = await Book.create(req.body);
 res.status(201).json({ success: true, data: book, message: 'Book created' });
 })
 );
 // PUT /api/books/:id – update
 router.put(
 '/:id',
 param('id').isMongoId().withMessage('Invalid book id'),
 body('title').optional().isLength({ min:
 2 }).withMessage('Title must be at least 2 chars'),
 body('author').optional().notEmpty(),
 body('price').optional().isFloat({ min: 0 }),
 body('publishedYear').optional().isInt({ min: 0, max: 3000 }),
 body('inStock').optional().isBoolean(),
 asyncHandler(async (req, res) => {
 5
sendValidationErrors(req);
 const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
 new: true,
 runValidators: true,
 });
 if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
 res.json({ success: true, data: book, message: 'Book updated' });
 })
 );
 // DELETE /api/books/:id – remove
 router.delete(
 '/:id',
 param('id').isMongoId().withMessage('Invalid book id'),
 asyncHandler(async (req, res) => {
 sendValidationErrors(req);
 const book = await Book.findByIdAndDelete(req.params.id);
 if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
 res.json({ success: true, data: book, message: 'Book deleted' });
 })
 );
 export default router;