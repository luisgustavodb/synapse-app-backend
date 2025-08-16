import React, { useState, useEffect } from 'react';
import { getBestImage } from '../services/imageService';

interface PixabayImageProps {
    searchQuery: string;
    alt: string;
    className?: string;
    minW?: number;
    minH?: number;
}

const PixabayImage: React.FC<PixabayImageProps> = ({ searchQuery, alt, className, minW = 100, minH = 100 }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchAndSetImage = async () => {
            setIsLoading(true);
            try {
                const result = await getBestImage(searchQuery, minW, minH);
                if (isMounted && result) {
                    setImageUrl(result.url);
                } else if (isMounted) {
                    // Fallback placeholder if nothing is found
                    setImageUrl(`https://via.placeholder.com/${Math.max(minW, 150)}x${Math.max(minH, 150)}?text=Not+Found`);
                }
            } catch (error) {
                console.error("Failed to get best image:", error);
                 if (isMounted) {
                    setImageUrl(`https://via.placeholder.com/${Math.max(minW, 150)}x${Math.max(minH, 150)}?text=Error`);
                }
            } finally {
                 if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (searchQuery) {
            fetchAndSetImage();
        }

        return () => {
            isMounted = false;
        };
    }, [searchQuery, minW, minH]);

    if (isLoading || !imageUrl) {
        return <div className={`${className} bg-slate-200 dark:bg-slate-700 animate-pulse`} />;
    }

    return <img src={imageUrl} alt={alt} className={className} loading="lazy" />;
};

export default PixabayImage;
