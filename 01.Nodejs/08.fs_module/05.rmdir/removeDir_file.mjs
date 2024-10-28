import fs from 'node:fs/promises';
import path from 'node:path';

async function removeDirectory(dirPath) {
    try {
        // Read all files and directories in the specified directory
        const files = await fs.readdir(dirPath);

        // Loop through each file/directory and remove them
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = await fs.stat(filePath); // Get file stats to determine if it's a file or directory

            if (stat.isDirectory()) {
                // If it's a directory, call removeDirectory recursively
                await removeDirectory(filePath);
            } else {
                // If it's a file, remove it
                await fs.unlink(filePath);
            }
        }

        // Remove the now-empty directory
        await fs.rmdir(dirPath);
        console.log(`Directory ${dirPath} removed successfully.`);
    } catch (err) {
        console.error(`Error removing directory ${dirPath}:`, err);
    }
}

// Usage example
removeDirectory('./makeDirectory2'); // Replace with your directory path
