export const checkRole = (roles) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const normalizedRoles = allowedRoles
        .map((role) => (role ? String(role).toLowerCase() : ""))
        .filter(Boolean);

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userRole = req.user.role ? String(req.user.role).toLowerCase() : "";
        if (!normalizedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        next();
    };
};
