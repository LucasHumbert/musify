import React from "react";
import {Album, ArtistProfile, Track} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import ArtistPicture from "@/components/artist/artist-picture";

export default function ResultElement({ title, item, onSelect, isClickable = false }: { title: string, item: Album | ArtistProfile | Track, onSelect: () => void, isClickable?: boolean }) {
    function isAlbum(item: Album | ArtistProfile | Track): item is Album {
        return item.type === "album";
    }

    function isTrack(item: Album | ArtistProfile | Track): item is Track {
        return item.type === "track";
    }

    function isArtist(item: Album | ArtistProfile | Track): item is ArtistProfile {
        return item.type === "artist";
    }

    let picture = null;

    if (isAlbum(item)) {
        picture = <AlbumCover image={item.images[0]} size={100} full />
    } else if (isTrack(item)) {
        picture = <AlbumCover image={item.album.images[0]} size={100} full />
    } else if (isArtist(item)) {
        picture = <ArtistPicture image={item.images[0]} size={100} full />
    }

    const content = (
        <div className="flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={onSelect}>
            <div className='w-[70px]'>
                { picture }
            </div>
            <p className='ml-4'>
                {item.name}
            </p>
        </div>
    );

    return (
        <div>
            <h2 className="p-2 text-lg underline">{title}</h2>
            {isClickable ? <Link href={`/${item.type}/${item.id}`}>{content}</Link> : content}
        </div>
    );
}