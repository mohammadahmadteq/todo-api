-- AlterTable
ALTER TABLE `Tasks` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `deletedAt` DATETIME(3) NULL;
