const { validationResult, matchedData } = require('express-validator');
const prisma = require('../../prisma/prisma');
const { hashPassword } = require('../utils/hashHelper');
const { generateToken } = require('../utils/jwtHelper');
const { verifyPassword } = require('../utils/hashHelper');

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
                })),
            });
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
    
        const hashedPassword = await hashPassword(password);
    
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

async function login(req, res){
    try {
        //validasi input login
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { nim, password } = matchedData(req);

        //mencari user berdasarkan nim
        const user = await prisma.user.findUnique({
            where: { nim }
        });

        if(!user){
            return res.status(401).json({
                message: 'NIM atau Password salah'
            });
        }

        //verifikasi password
        const isPasswordValid = await verifyPassword(password, user.password_hash);
        if(!isPasswordValid){
            return res.status(401).json({
                message: 'NIM atau Password salah'
            });
        }

        //generate JWT
        const token = generateToken({
            id: user.id,
            nim: user.nim
        })

        res.status(200).json({
            message: 'Login berhasil',
            token,
            user:{
                id: user.id,
                nim: user.nim,
                nama: user.nama,
            }
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
}

async function changePassword(req, res){
    try {
        //validasi input changePassword
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        const { oldPassword, newPassword} = matchedData(req);

        //mencari user berdasarkan nim
        const user = await prisma.user.findUnique({
            where: {nim: req.user.nim }
        });
        
        if(!user){
            return res.status(404).json({
                message: "NIM Tidak dikenali"
            });
        }

        //verifikasi oldPassword dengan newPassword
        const isPasswordValid = await validationResult(oldPassword, user.password_hash);
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Password lama salah!"
            });
        }

        //hashPassword
        const hashedPassword = await hashPassword(oldPassword);

        //update
        const updateUser = await prisma.user.update({
            where: {nim: req.user.nim},
            data: { password_hash: hashedPassword}
        })
        res.status(201).json({
            'success': true,
            'message': 'Password berhasil diubah'
        });   
    } catch (error){
        console.error(error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
}


module.exports = {
     register,
     login,
     changePassword
}