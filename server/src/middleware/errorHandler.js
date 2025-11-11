 export const notFound = (req, res, next) => {
 res.status(404).json({ success: false, message: 'Route not found' });
 };
 export const errorHandler = (err, req, res, next) => {
 console.error(err);
 const status = err.statusCode || 500;
 const payload = {
 success: false,
 message: err.message || 'Internal Server Error',
 };
 if (err.errors) payload.errors = err.errors; // express-validator or custom
 res.status(status).json(payload);
 };