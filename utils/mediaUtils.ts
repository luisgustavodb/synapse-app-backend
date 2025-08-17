
// A simple Promise-based wrapper for FileReader
const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Processes an image file. If it's larger than the specified limit,
 * it attempts to resize and compress it. Otherwise, it returns the
 * original file as a Data URL.
 * @param file The image file to process.
 * @param maxSizeMB The maximum file size in megabytes.
 * @returns A promise that resolves to a base64 Data URL of the processed image.
 */
export const processAndCompressImage = (file: File, maxSizeMB: number): Promise<string> => {
    const MAX_SIZE_BYTES = maxSizeMB * 1024 * 1024;
    const MAX_DIMENSION = 1280; // Resize images to a max of 1280x1280
    const COMPRESSION_QUALITY = 0.8; // 80% JPEG quality

    if (file.size <= MAX_SIZE_BYTES) {
        // If the file is already small enough, just return it as is.
        return readFileAsDataURL(file);
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            // Calculate new dimensions while maintaining aspect ratio
            if (width > height) {
                if (width > MAX_DIMENSION) {
                    height = Math.round(height * (MAX_DIMENSION / width));
                    width = MAX_DIMENSION;
                }
            } else {
                if (height > MAX_DIMENSION) {
                    width = Math.round(width * (MAX_DIMENSION / height));
                    height = MAX_DIMENSION;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context'));
            }

            // Draw the resized image onto the canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Get the compressed data URL
            // Using image/jpeg for better compression over png
            const dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
            
            resolve(dataUrl);
        };
        img.onerror = reject;

        reader.readAsDataURL(file);
    });
};
