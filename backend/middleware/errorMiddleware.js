export function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, next) {
  const statusCode = err?.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);

  const message = err?.message || 'Server Error';
  const errors = err?.errors
    ? Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }))
    : undefined;

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack,
  });
}

