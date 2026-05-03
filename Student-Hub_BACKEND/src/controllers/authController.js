const { validationResult, matchedData } = require('express-validator');
const prisma = require('../../prisma/prisma');
const { hashPassword } = require('../utils/hashHelper');

async function register(req, res){
    try {
        const errors = validationResult(req);
    
    //pengecekan hasil validasi
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "validasi gagal",
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            })
        }
    
        //pengambilan data yang sudah bersih
        const validData = matchedData(req);
        const { nim, nama, password, jurusan, alamat, jenis_kelamin, tanggal_lahir} = validData;
    
        //check duplikat nim
        const existingUser = await prisma.user.findUnique({
            where: { nim: nim}
        });
    
        if(existingUser){
            return res.status(400).json({
                message: "Register gagal",
                errors: [{
                    field: 'nim',
                    message: 'NIM sudah terdaftar'
                }]
            });
        }
    
        const hashedPassword = await hashPassword(password)
    
        //simpan ke databases
        const newUser = await prisma.user.create({
            data: {
                nim,
                nama,
                password_hash: hashedPassword,
                jurusan,
                alamat,
                jenis_kelamin,
                tanggal_lahir: new Date(tanggal_lahir)
            }
        })
        res.status(201).json({
            message: "Registrasi berhasil!",
            user: {
                id: newUser.id,
                nim: newUser.nim,
                nama: newUser.nama
            }
        });
    } catch(error){
        console.error('Error saat register:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }
    
}

module.exports = { register}