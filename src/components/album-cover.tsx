import Image from "next/image";
import {Fragment} from "react";
import {Album} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";

export default function AlbumCover({ album } : { album: Album }) {
    return <div>
        <Link href={`/album/${album.id}`}>
            <Image
                src={album.images[0].url}
                width={300}
                height={300}
                alt={album.name}
            />
            <p>{ album.name }</p>
        </Link>
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