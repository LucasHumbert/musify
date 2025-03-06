'use client';

import { Album } from "@/utils/spotify/spotifyTypes";
import AlbumPreview from "@/components/album/album-preview";
import { useState, useEffect, useMemo } from "react";

export default function ArtistAlbumsClient({ content }: { content: { albums: Album[], singles: Album[], appears_on: Album[] } }) {
    const defaultCategory: 'albums' | 'singles' | 'appears_on' =
        content.albums.length ? 'albums' :
            content.singles.length ? 'singles' :
                'appears_on';

    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const contentToDisplay = useMemo(() => content[selectedCategory], [selectedCategory, content]);

    return (
        <section className='mt-12'>
            <div className="flex gap-4 mb-4">
                {!isLoading && (['albums', 'singles', 'appears_on'] as const).map((category) => {
                    if (content[category].length) {
                        return <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-2xl font-medium cursor-pointer ${
                                selectedCategory === category ? "text-green-500 underline" : "text-gray-700"
                            }`}
                            disabled={isLoading}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    }
                })}
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full aspect-square bg-gray-400 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                    {contentToDisplay.length ? contentToDisplay.map((album) => (
                        <AlbumPreview album={album} displayReleaseDate fullSizeCover key={album.id} />
                    )) : `Aucun ${selectedCategory} !`}
                </div>
            )}
        </section>
    );
}
