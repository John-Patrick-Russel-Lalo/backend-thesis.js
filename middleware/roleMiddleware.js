export function requireRole(role) {
  return (req, res, next) => {
    console.log("Checking user role:", req.user ? req.user.role : "No user");
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires ${role} role`,
      });
    }

    next();
  };
}

export default requireRole;