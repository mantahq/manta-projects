export const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required fields'
        });
    }
    
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email format'
        });
    }
    
    next();
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};