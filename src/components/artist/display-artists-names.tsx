import {Fragment} from "react";
import {Artist} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";

export default function DisplayArtistsNames({ artists, clickable = true } : { artists: Artist[], clickable?: boolean }) {

    return <>
        {artists.map((artist, index) => {
            const text = artist.name
            return <Fragment key={artist.id}>
                { clickable ? (
                    <Link href={`/artist/${artist.id}`} className='w-fit hover:underline'>{artist.name}</Link>
                ) : (
                    text
                )}
                {index !== artists.length - 1 && <span className='mr-1'>,</span>}
            </Fragment>
        })}
    </>
}