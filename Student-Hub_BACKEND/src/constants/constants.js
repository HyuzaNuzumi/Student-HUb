module.exports = {
    REGEX: {
        NIM: /^\d{9,10}$/,                       // 9-10 digit angka, dari awal sampai akhir
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/, // minimal 6, huruf+angka
        NAMA: /^[A-Za-z\s]{3,}$/,                // minimal 3, huruf dan spasi
        ALAMAT: /^[A-Za-z0-9\s,.-]{5,}$/,        // minimal 5, alamat umum
        TANGGAL_LAHIR: /^\d{4}-\d{2}-\d{2}$/,    // format YYYY-MM-DD
        JURUSAN: /^[A-Za-z\s]{3,}$/              // minimal 3, huruf dan spasi (sama seperti NAMA)
    },
    VALIDATION: {
        NIM: {
            MIN_LENGTH: 9,
            MAX_LENGTH: 10
        },
        PASSWORD: {
            MIN_LENGTH: 6,
            MAX_LENGTH: 72,
            SALT_ROUNDS: 10
        },
        PASSWORD_BARU: {
            MIN_LENGTH: 6,
            MAX_LENGTH: 72
        },
        NAMA: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 100
        },
        ALAMAT: {
            MIN_LENGTH: 5,
            MAX_LENGTH: 255
        },
        JENIS_KELAMIN: {
            ALLOWED_VALUES: ['L', 'P']
        },
        TANGGAL_LAHIR: {
            MIN_YEAR: 1900,
            MAX_YEAR: new Date().getFullYear(),
            FORMAT: 'YYYY-MM-DD'
        },
        JURUSAN: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 100,
            ALLOWED_VALUES: [
                'Teknik Informatika',
                'Sistem Informasi',
                'Teknik Komputer',
                'Manajemen Informatika',
                'DKV',
                'Akuntansi',
                'Manajemen'
                // Tambahkan jurusan lain sesuai kebutuhan
            ]
        }
    },
    MESSAGES: {
        // NIM
        NIM_REQUIRED: 'NIM wajib diisi',
        NIM_INVALID: 'NIM harus 9 atau 10 digit angka',
        
        // Password
        PASSWORD_REQUIRED: 'Password wajib diisi',
        PASSWORD_MIN: 'Password minimal 6 karakter',
        PASSWORD_MAX: 'Password maksimal 72 karakter',
        PASSWORD_PATTERN: 'Password harus mengandung huruf dan angka',

        // Password Lama
        PASSWORD_LAMA_REQUIRED: 'Password lama wajib diisi',

        // Password Baru
        PASSWORD_BARU_REQUIRED: 'Password baru wajib diisi',
        PASSWORD_BARU_MIN: 'Password baru minimal 6 karakter',
        PASSWORD_BARU_MAX: 'Password maksimal 72 karakter',
        PASSWORD_BARU_PATTERN: 'Password baru harus mengandung huruf dan angka',
        PASSWORD_BARU_SAME: 'Password baru tidak boleh sama dengan password lama',

        // Konfirmasi Password Baru
        KONFIRMASI_PASSWORD_REQUIRED: 'Konfirmasi password baru wajib diisi',
        KONFIRMASI_PASSWORD_NOT_MATCH: 'Konfirmasi password baru tidak cocok',
        
        // Nama
        NAMA_REQUIRED: 'Nama wajib diisi',
        NAMA_MIN: 'Nama minimal 3 karakter',
        NAMA_MAX: 'Nama maksimal 100 karakter',
        NAMA_PATTERN: 'Nama hanya boleh mengandung huruf dan spasi',
        
        // Alamat
        ALAMAT_REQUIRED: 'Alamat wajib diisi',
        ALAMAT_MIN: 'Alamat minimal 5 karakter',
        ALAMAT_MAX: 'Alamat maksimal 255 karakter',
        
        // Jenis Kelamin
        JENIS_KELAMIN_REQUIRED: 'Jenis kelamin wajib diisi',
        JENIS_KELAMIN_INVALID: 'Jenis kelamin harus L atau P',
        
        // Tanggal Lahir
        TANGGAL_LAHIR_REQUIRED: 'Tanggal lahir wajib diisi',
        TANGGAL_LAHIR_INVALID: 'Format tanggal lahir harus YYYY-MM-DD',
        TANGGAL_LAHIR_RANGE: 'Tanggal lahir tidak valid',
        
        // Jurusan
        JURUSAN_REQUIRED: 'Jurusan wajib diisi',
        JURUSAN_MIN: 'Jurusan minimal 3 karakter',
        JURUSAN_MAX: 'Jurusan maksimal 100 karakter',
        JURUSAN_PATTERN: 'Jurusan hanya boleh mengandung huruf dan spasi',
        JURUSAN_INVALID: 'Jurusan tidak tersedia dalam daftar'
    }
};

