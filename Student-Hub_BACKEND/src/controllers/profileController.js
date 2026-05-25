const { validationResult, matchedData } = require('express-validator');
const prisma = require('../../prisma/prisma');
const { hashPassword } = require('../utils/hashHelper');
const { generateToken } = require('../utils/jwtHelper');
const { verifyPassword } = require('../utils/hashHelper'); 

async function getProfile(req, res){
    try {
        //akses nim dari token
        const userNim = req.user.nim;

        //akses nim dari database
        const user = await prisma.user.findUnique({
            where: { nim: userNim },
            select: {
                id : true,
                nim : true,
                nama : true,
                jurusan : true,
                alamat : true,
                jenis_kelamin : true,
                tanggal_lahir : true,
                created_at: true,
                updated_at: true
            },
        });
        if (!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: user
        });

    } catch (error){
        console.error("ERRORR di getProfile: ", error);
        return res.status(500).json({
            success : false,
            message: "Kesalahan validasi atau server"
        })
    };
}


async function updateProfile(req, res){
    try {
        //validasi input
        const errors = validationResult(req);

        //pengecekan hasil validasi
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "validasi gagal",
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                })),
            });
        }

        //pengambilan data yang sudah bersih
        const validData = matchedData(req);
        const { nama, jurusan, alamat, jenis_kelamin, tanggal_lahir } = validData;

        //update profile
        const updateUserProfile = await prisma.user.update({
            where: { nim: req.user.nim },
            data: {
                nama : nama,
                jurusan : jurusan,
                alamat : alamat,
                jenis_kelamin : jenis_kelamin,
                tanggal_lahir : new Date(tanggal_lahir)
            }
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })
    } catch (error){
        return res.status(500).json({
            success : false,
            message: "kesalahan validasi atau server"
        });
    };
};

module.exports = {
    getProfile,
    updateProfile
}