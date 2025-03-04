import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import Image from "next/image";
import {Fragment} from "react";

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ albumId: string }>
}) {
    const { albumId } = await params
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data: Album | SpotifyError = await res.json()

    if ('error' in data) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{data.error.message}</h1>
    }

    console.log(data)

    return <div className='p-4'>
        <Image
            src={data.images[0].url}
            width={500}
            height={500}
            alt={data.name}
            priority={true}
            className='m-auto'
        />

        <h1 className='text-3xl text-center'>{data.name}</h1>

        <div className='flex justify-center'>
            {data.artists.map((artist, index) => {
                return <Fragment key={artist.id}>
                    <p className='w-fit'>{artist.name}</p>
                    {index !== data.artists.length - 1 && <span className='mr-1'>,</span>}
                </Fragment>
            })}
        </div>

        <p className='text-center'>{data.release_date}</p>
    </div>
}