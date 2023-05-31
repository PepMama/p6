import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // récupérer le token
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
     next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ error });
    }
};