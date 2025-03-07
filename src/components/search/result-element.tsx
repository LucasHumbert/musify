import React from "react";
import {Album, ArtistProfile, Track} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import ArtistPicture from "@/components/artist/artist-picture";
import DisplayArtistsNames from "@/components/artist/display-artists-names";

export default function ResultElement({ item, onSelect, isClickable = false }: { item: Album | ArtistProfile | Track, onSelect: () => void, isClickable?: boolean }) {
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
    let artists = null;

    if (isAlbum(item)) {
        picture = item.images.length ? <AlbumCover image={item.images[0]} size={100} full /> : null
        artists = item.artists
    } else if (isTrack(item)) {
        picture = item.album.images.length ? <AlbumCover image={item.album.images[0]} size={100} full /> : null
        artists = item.artists
    } else if (isArtist(item)) {
        picture = item.images.length ? <ArtistPicture image={item.images[0]} size={100} full /> : null
    }

    const content = (
        <div className="flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={onSelect}>
            <div className='w-[70px]'>
                { picture }
            </div>
            <div className='ml-4'>
                <p >{item.name}</p>
                <p>{ artists && <DisplayArtistsNames artists={artists} clickable={false} /> }</p>
            </div>
        </div>
    );

    return <>
            {isClickable ? <Link href={`/${item.type}/${item.id}`}>{content}</Link> : content}
    </>;
}