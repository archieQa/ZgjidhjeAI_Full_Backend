const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Add a 404 route handler in `app.js` (if not already there):
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = { errorMiddleware };
