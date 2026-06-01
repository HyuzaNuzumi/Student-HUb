const { body } = require('express-validator');
const express = require('express');
const constants = require('../constants/constants');
const { register, login, changePassword } = require('../controllers/authController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const registerValidation = [
    body('nim')
        .notEmpty().withMessage(constants.MESSAGES.NIM_REQUIRED)
        .matches(constants.REGEX.NIM).withMessage(constants.MESSAGES.NIM_INVALID)
        .trim(),  
    body('password')
        .notEmpty().withMessage(constants.MESSAGES.PASSWORD_REQUIRED)
        .isLength({ min: constants.VALIDATION.PASSWORD.MIN_LENGTH })
            .withMessage(constants.MESSAGES.PASSWORD_MIN)
        .isLength({ max: constants.VALIDATION.PASSWORD.MAX_LENGTH })
            .withMessage(constants.MESSAGES.PASSWORD_MAX)
        .matches(constants.REGEX.PASSWORD)
            .withMessage(constants.MESSAGES.PASSWORD_PATTERN),
    body('konfirmasi_password')
        .notEmpty().withMessage('Konfirmasi password wajib diisi')
        .custom((value, { req }) => value === req.body.password)
            .withMessage('Konfirmasi password tidak cocok dengan password'),
    body('nama')
        .notEmpty().withMessage(constants.MESSAGES.NAMA_REQUIRED)
        .isLength({ min: constants.VALIDATION.NAMA.MIN_LENGTH })
            .withMessage(constants.MESSAGES.NAMA_MIN)
        .isLength({ max: constants.VALIDATION.NAMA.MAX_LENGTH })
            .withMessage(constants.MESSAGES.NAMA_MAX)
        .matches(constants.REGEX.NAMA)
            .withMessage(constants.MESSAGES.NAMA_PATTERN)
        .trim()          
        .escape(),        
    body('alamat')
        .notEmpty().withMessage(constants.MESSAGES.ALAMAT_REQUIRED)
        .isLength({ min: constants.VALIDATION.ALAMAT.MIN_LENGTH })
            .withMessage(constants.MESSAGES.ALAMAT_MIN)
        .isLength({ max: constants.VALIDATION.ALAMAT.MAX_LENGTH })
            .withMessage(constants.MESSAGES.ALAMAT_MAX)
        .matches(constants.REGEX.ALAMAT)
            .withMessage('Format alamat tidak valid')  // optional, karena regex cukup longgar
        .trim(),
    body('jenis_kelamin')
        .notEmpty().withMessage(constants.MESSAGES.JENIS_KELAMIN_REQUIRED)
        .isIn(constants.VALIDATION.JENIS_KELAMIN.ALLOWED_VALUES)
            .withMessage(constants.MESSAGES.JENIS_KELAMIN_INVALID)
        .trim(),
    body('tanggal_lahir')
        .notEmpty().withMessage(constants.MESSAGES.TANGGAL_LAHIR_REQUIRED)
        .matches(constants.REGEX.TANGGAL_LAHIR)
            .withMessage(constants.MESSAGES.TANGGAL_LAHIR_INVALID)
        .custom((value) => {
            const date = new Date(value);
            const tahun = date.getFullYear();
            const minTahun = constants.VALIDATION.TANGGAL_LAHIR.MIN_YEAR;
            const maxTahun = constants.VALIDATION.TANGGAL_LAHIR.MAX_YEAR;
            
            if (isNaN(date.getTime())) {
                throw new Error(constants.MESSAGES.TANGGAL_LAHIR_INVALID);
            }
            if (tahun < minTahun || tahun > maxTahun) {
                throw new Error(constants.MESSAGES.TANGGAL_LAHIR_RANGE);
            }
            return true;
        }),
    body('jurusan')
        .notEmpty().withMessage(constants.MESSAGES.JURUSAN_REQUIRED)
        .isLength({ min: constants.VALIDATION.JURUSAN.MIN_LENGTH })
            .withMessage(constants.MESSAGES.JURUSAN_MIN)
        .isLength({ max: constants.VALIDATION.JURUSAN.MAX_LENGTH })
            .withMessage(constants.MESSAGES.JURUSAN_MAX)
        .matches(constants.REGEX.JURUSAN)
            .withMessage(constants.MESSAGES.JURUSAN_PATTERN)
        .isIn(constants.VALIDATION.JURUSAN.ALLOWED_VALUES)
            .withMessage(constants.MESSAGES.JURUSAN_INVALID)
        .trim()      
        .escape(),       
];

const loginValidation = [
        body('nim')
        .notEmpty().withMessage(constants.MESSAGES.NIM_REQUIRED)
        .matches(constants.REGEX.NIM).withMessage(constants.MESSAGES.NIM_INVALID)
        .trim(),
        body('password')
        .notEmpty().withMessage(constants.MESSAGES.PASSWORD_REQUIRED)
        .isLength({ min: constants.VALIDATION.PASSWORD.MIN_LENGTH })
            .withMessage(constants.MESSAGES.PASSWORD_MIN)
        .isLength({ max: constants.VALIDATION.PASSWORD.MAX_LENGTH })
            .withMessage(constants.MESSAGES.PASSWORD_MAX)
        .matches(constants.REGEX.PASSWORD)
            .withMessage(constants.MESSAGES.PASSWORD_PATTERN),
];

const changePasswordValidation = [
        body('passwordLama')
        .notEmpty().withMessage(constants.MESSAGES.PASSWORD_LAMA_REQUIRED),
        body('passwordBaru')
        .notEmpty().withMessage(constants.MESSAGES.PASSWORD_BARU_REQUIRED)
        .isLength({ min: constants.VALIDATION.PASSWORD_BARU.MIN_LENGTH }).withMessage(constants.MESSAGES.PASSWORD_BARU_MIN)
        .isLength({ max: constants.VALIDATION.PASSWORD_BARU.MAX_LENGTH }).withMessage(constants.MESSAGES.PASSWORD_BARU_MAX)
        .matches(constants.REGEX.PASSWORD).withMessage(constants.MESSAGES.PASSWORD_BARU_PATTERN)
        .custom((value, {req}) =>{
            //Memastikan password lama tidak sama dengan password baru
            if(value === req.body.passwordLama){
                throw new Error(constants.MESSAGES.KONFIRMASI_PASSWORD_NOT_MATCH)
            }
            return true;
        }),
        body('konfirmasiPassword')
        .notEmpty().withMessage(constants.MESSAGES.KONFIRMASI_PASSWORD_REQUIRED)
        .custom((value, {req}) => {
            if(value !== req.body.passwordBaru){
                throw new Error(constants.MESSAGES.KONFIRMASI_PASSWORD_NOT_MATCH);
            }
            return true;
        }),
];

router.post('/register', registerValidation, register);
router.post('/login',  loginValidation, login);
router.put('/change-password', authMiddleware, changePasswordValidation, changePassword)

module.exports = router;