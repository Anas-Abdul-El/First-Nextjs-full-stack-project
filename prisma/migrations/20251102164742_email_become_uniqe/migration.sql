/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Info_email_key" ON "Info"("email");
