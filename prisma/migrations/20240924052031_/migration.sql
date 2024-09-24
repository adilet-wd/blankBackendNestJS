/*
  Warnings:

  - Added the required column `post_title` to the `Subscribe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscribe` ADD COLUMN `post_title` VARCHAR(191) NOT NULL;
