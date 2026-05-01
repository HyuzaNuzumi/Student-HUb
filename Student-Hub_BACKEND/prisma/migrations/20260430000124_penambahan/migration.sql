/*
  Warnings:

  - Added the required column `jurusan` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "tanggal_lahir" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("alamat", "created_at", "id", "jenis_kelamin", "nama", "nim", "password_hash", "tanggal_lahir", "updated_at") SELECT "alamat", "created_at", "id", "jenis_kelamin", "nama", "nim", "password_hash", "tanggal_lahir", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_nim_key" ON "users"("nim");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
