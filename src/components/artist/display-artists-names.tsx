import {Fragment} from "react";
import {Artist} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";

export default function DisplayArtistsNames({ artists } : { artists: Artist[] }) {
    return <>
        {artists.map((artist, index) => {
            return <Fragment key={artist.id}>
                <Link href={`/artist/${artist.id}`} className='w-fit hover:underline'>{artist.name}</Link>
                {index !== artists.length - 1 && <span className='mr-1'>,</span>}
            </Fragment>
        })}
    </>
}