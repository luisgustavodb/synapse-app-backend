import React, { useState, useEffect } from 'react';

interface VideoThumbnailProps {
    videoUrl: string;
    alt: string;
    className?: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl, alt, className }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!videoUrl) return;

        const cacheKey = `video-thumb:${videoUrl}`;
        const cachedThumb = sessionStorage.getItem(cacheKey);
        if (cachedThumb) {
            setThumbnailUrl(cachedThumb);
            return;
        }

        let isMounted = true;
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0.1;

        const onSeeked = () => {
            if (!isMounted) return;

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');

            if (context) {
                try {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg');
                    if(isMounted) {
                        setThumbnailUrl(dataUrl);
                        sessionStorage.setItem(cacheKey, dataUrl);
                    }
                } catch (e) {
                    console.error("Canvas drawImage error for video thumbnail:", e);
                    if (isMounted) setError(true);
                }
            } else {
                 if (isMounted) setError(true);
            }
        };
        
        const onError = (e: Event | string) => {
            console.error("Error loading video for thumbnail generation:", e);
            if (isMounted) setError(true);
        };
        
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('error', onError);

        // This is a common pattern to ensure frame is loaded on all browsers
        video.play().catch(() => {
            // Play can be interrupted, but we just need it to start loading.
        });

        return () => {
            isMounted = false;
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('error', onError);
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [videoUrl]);

    if (error) {
        return <div className={`${className} bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-red-500 text-xs p-1`}>Erro ao carregar capa</div>;
    }

    if (!thumbnailUrl) {
        return <div className={`${className} bg-slate-200 dark:bg-slate-800 animate-pulse`} />;
    }

    return <img src={thumbnailUrl} alt={alt} className={className} />;
};

export default VideoThumbnail;
