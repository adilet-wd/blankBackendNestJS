/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id]` on the table `Subscribe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Subscribe_user_id_post_id_key` ON `Subscribe`(`user_id`, `post_id`);
