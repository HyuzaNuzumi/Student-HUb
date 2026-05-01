const { body } = require('express-validator');
const constants = require('../constants/constants');

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
        .trim()           // hapus spasi di awal/akhir
        .escape(),        // amankan dari XSS
];

module.exports = { registerValidation };