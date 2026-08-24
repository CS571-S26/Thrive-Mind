// Generic, non-leaking JSON error handler — never send stack traces or
// raw error messages (which can include DB details) to the client.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
}
