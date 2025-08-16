// services/imageService.ts

const API_KEY = "51777692-1a07d70a50e9d1710f5c77a7a";

interface PixabayHit {
    largeImageURL?: string;
    webformatURL?: string;
    previewURL?: string;
    user: string;
    likes: number;
    views: number;
    downloads: number;
}

interface PixabayResponse {
    total: number;
    totalHits: number;
    hits: PixabayHit[];
}

interface ImageDimensions {
    width: number;
    height: number;
}

export interface BestImageResult {
    url: string;
    meta: ImageDimensions;
    hit: PixabayHit;
    checked: number;
}

const cache = new Map<string, BestImageResult>();

async function fetchPixabay(query: string, page = 1, perPage = 20): Promise<PixabayResponse> {
    const url = new URL("https://pixabay.com/api/");
    const safeQuery = query.substring(0, 100);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("q", safeQuery);
    url.searchParams.set("image_type", "photo");
    url.searchParams.set("safesearch", "true");
    url.searchParams.set("order", "popular");
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Erro Pixabay: " + res.status);
    return res.json();
}

function testLoad(src: string): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve({ width: im.naturalWidth, height: im.naturalHeight });
        im.onerror = () => reject(new Error("Falha ao carregar imagem"));
        const bust = (src.includes("?") ? "&" : "?") + "cb=" + Date.now();
        im.src = src + bust;
    });
}

export async function getBestImage(query: string, minW = 0, minH = 0, maxPages = 3): Promise<BestImageResult | null> {
    const cacheKey = `${query}:${minW}:${minH}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    let page = 1;
    let checked = 0;

    while (page <= maxPages) {
        try {
            const data = await fetchPixabay(query, page, 50);
            const hits = Array.isArray(data.hits) ? data.hits : [];
            if (!hits.length && page === 1) { // No hits on first page, try a broader query
                 const broaderQuery = query.split(' ').slice(0, 2).join(' ');
                 if(broaderQuery && broaderQuery !== query) {
                    return getBestImage(broaderQuery, minW, minH, 1);
                 }
            }
            if (!hits.length) break;

            // Simple sort, Pixabay's 'popular' order is already good.
            for (const h of hits) {
                checked++;
                const candidate = h.largeImageURL || h.webformatURL || h.previewURL;
                if (!candidate) continue;
                
                try {
                    const meta = await testLoad(candidate);
                    if (meta.width >= minW && meta.height >= minH) {
                        const result = { url: candidate, meta, hit: h, checked };
                        cache.set(cacheKey, result);
                        return result;
                    }
                } catch (e) {
                    // Image failed to load, try the next one.
                }
            }
        } catch (error) {
            console.error("Error fetching from Pixabay:", error);
            break; // Stop if there's a network or API error
        }
        page++;
    }
    
    // Fallback if no specific image is found
    if (query.includes(' ')) {
        const fallbackQuery = query.split(' ')[0];
        const fallbackResult = await getBestImage(fallbackQuery, minW, minH, 1);
        if(fallbackResult) {
            cache.set(cacheKey, fallbackResult);
            return fallbackResult;
        }
    }

    return null;
}