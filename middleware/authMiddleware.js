

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  next();
}

export default requireAuth;