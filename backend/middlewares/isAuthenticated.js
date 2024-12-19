import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : 'Not Authorized',
                success : false
            })
        };
        const decode = await jwt.verify(token, process.env.Secret_Key)
        if(!decode){
            return res.status(401).json({
                message : 'Invalid Token',
                success : false,
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        
    }
}