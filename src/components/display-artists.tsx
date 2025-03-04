import {Fragment} from "react";
import {Artist} from "@/utils/spotify/spotifyTypes";

export default function DisplayArtists({ artists } : { artists: Artist[] }) {
    return <>
        {artists.map((artist, index) => {
            return <Fragment key={artist.id}>
                <p className='w-fit'>{artist.name}</p>
                {index !== artists.length - 1 && <span className='mr-1'>,</span>}
            </Fragment>
        })}
    </>
}