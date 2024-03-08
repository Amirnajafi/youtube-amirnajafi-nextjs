-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "title_fa" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "content_fa" TEXT NOT NULL DEFAULT '',
    "authorId" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "created_date", "id", "published", "title") SELECT "authorId", "content", "created_date", "id", "published", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
