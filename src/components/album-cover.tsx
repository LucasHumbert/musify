import Image from "next/image";
import { Album } from "@/utils/spotifyUtils"
import {Fragment} from "react";

export default function AlbumCover({ album } : { album: Album }) {
    return <div>
        <Image
            src={album.images[0].url}
            width={300}
            height={300}
            alt={album.name}
        />
        <p>{ album.name }</p>
        <div className='flex'>
            {album.artists.map((artist, index) => {
                return <Fragment key={artist.id}>
                    <p className='w-fit'>{artist.name}</p>
                    {index !== album.artists.length - 1 && <span className='mr-1'>,</span>}
                </Fragment>
            })}
        </div>
    </div>
}