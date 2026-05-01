const bcrypt  = require('bcrypt');
//salt round
const salt_Rounds = 10;

async function hashPassword(plainPassword) {
    try {
        //memanggil bcrypt untuk membuat hash password
        const hash = await bcrypt.hash(plainPassword, salt_Rounds);
        //console.log('hash password yang disimpan', hash);
        return hash;
    } catch (error){
        throw new Error('Gagal melakukan hash password' + error.message)
    }

}

async function verifyPassword(plainPassword, hashedPassword){
    try {
        //memanggil bcrypt untuk memverifikasi password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if(isMatch){
            //login berhasil
            //console.log("Login berhasil", isMatch)
            return true;
        } else {
            //login gagal
            //console.log("Login gagal", isMatch)
            return false;
        }
    } catch (error){
        throw new Error('Gagal melakukan verifyPassword' + error.message)
    }



}

module.exports = {
    hashPassword,
    verifyPassword
}