/*
  Warnings:

  - Added the required column `user_username` to the `Subscribe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscribe` ADD COLUMN `user_username` VARCHAR(191) NOT NULL;
