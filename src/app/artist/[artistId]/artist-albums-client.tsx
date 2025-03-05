'use client';

import {Album} from "@/utils/spotify/spotifyTypes";
import AlbumPreview from "@/components/album/album-preview";
import {useState} from "react";

export default function ArtistAlbumsClient({ content }: { content: { albums: Album[], singles: Album[] }}) {
    const [contentToDisplay, setContentToDisplay] = useState(content.albums)

    return <>
        <h2 className='text-2xl mb-4' onClick={() => setContentToDisplay(content.albums)}>Albums</h2>
        <h2 className='text-2xl mb-4' onClick={() => setContentToDisplay(content.singles)}>Singles</h2>
        <div className='grid grid-cols-4 gap-4'>
            {contentToDisplay
                .map((album) => (
                    <AlbumPreview album={album} displayReleaseDate={true} fullSizeCover={true} key={album.id} />
                ))
            }
        </div>
    </>

}