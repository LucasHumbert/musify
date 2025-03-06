'use client';

import { Album } from "@/utils/spotify/spotifyTypes";
import AlbumPreview from "@/components/album/album-preview";
import { useState, useMemo } from "react";

export default function ArtistAlbumsClient({ content }: { content: { albums: Album[], singles: Album[], appears_on: Album[] } }) {
    const defaultCategory: 'albums' | 'singles' | 'appears_on' =
        content.albums.length ? 'albums' :
            content.singles.length ? 'singles' :
                'appears_on';

    const [selectedCategory, setSelectedCategory] = useState<'albums' | 'singles' | 'appears_on'>(defaultCategory);
    const contentToDisplay = useMemo(() => content[selectedCategory], [selectedCategory, content]);

    return (
        <section className='mt-12'>
            <div className="flex gap-4 mb-4">
                {(['albums', 'singles', 'appears_on'] as const).map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-2xl font-medium cursor-pointer ${
                            selectedCategory === category ? "text-green-500 underline" : "text-gray-700"
                        }`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">

                {contentToDisplay.length ? contentToDisplay.map((album) => (
                    <AlbumPreview album={album} displayReleaseDate fullSizeCover key={album.id} />
                )) : `Aucun ${selectedCategory} !`}
            </div>
        </section>
    );
}