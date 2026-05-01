const jwt = require('jsonwebtoken');

//fungsi generate dan verfikasi token JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

//fungsi untuk generate token JWT
function generateToken(payload){
    //payload berisi { id, nim}
    const token = jwt.sign(payload, JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    return token;
}

//fungsi untuk verifikasi toke JWT
function verifyToken(token){
    try {
        const tokenData = jwt.verify(token, JWT_SECRET);
        console.log('Token valid', tokenData);
        return tokenData;
    } catch (error){
        console.error('Token tidak valid', error);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}