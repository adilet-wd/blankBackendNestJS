/*
  Warnings:

  - Added the required column `group_title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `group_title` VARCHAR(191) NOT NULL;
