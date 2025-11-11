 import mongoose from 'mongoose';
 const bookSchema = new mongoose.Schema(
 {
 title: {
 type: String,
 required: [true, 'Title is required'],
 trim: true,
 minlength: [2, 'Title must be at least 2 characters'],
 maxlength: [200, 'Title must be <= 200 characters'],
 },
 author: {
 type: String,
 required: [true, 'Author is required'],
 trim: true,
 maxlength: [120, 'Author must be <= 120 characters'],
 },
 genre: {
 type: String,
 trim: true,

maxlength: 60,
 },
 price: {
 type: Number,
 required: [true, 'Price is required'],
 min: [0, 'Price cannot be negative'],
 validate: {
 validator: (v) => Number.isFinite(v),
 message: 'Price must be a valid number',
 },
 },
 description: {
 type: String,
 maxlength: [2000, 'Description too long'],
 },
 publishedYear: {
 type: Number,
 min: [0, 'Year cannot be negative'],
 max: [3000, 'Year seems too far in the future'],
 },
 inStock: {
 type: Boolean,
 default: true,
 },
 },
 { timestamps: true }
 );
 export default mongoose.model('Book', bookSchema);