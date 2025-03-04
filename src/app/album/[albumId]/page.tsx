import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtists from "@/components/display-artists";
import {DateTime} from "luxon";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import AlbumTrack from "@/components/album/album-track";

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

    return <div className='w-1/3 m-auto py-11'>
        <div className='w-fit m-auto'>
            <AlbumCover album={data} size={500} />
        </div>

        <div className='flex justify-center items-center'>
            <h1 className='text-5xl text-center leading-none'>{data.name}</h1>
            <Link href={data.external_urls.spotify} target='_blank' className='ml-1'>
                <ArrowTopRightOnSquareIcon className="size-6" title='Open in Spotify' />
            </Link>
        </div>

        <div className='flex justify-center text-xl'>
            <DisplayArtists artists={data.artists} />
        </div>

        <p className='text-center'>{DateTime.fromFormat(data.release_date, 'yyyy-MM-dd').toLocaleString()}</p>

        <div className='mt-4'>
            <h2 className='text-2xl mb-4'>{ data.total_tracks } tracks</h2>
            {data.tracks.items
                .slice()
                .sort((a, b) => a.track_number - b.track_number)
                .map((track) => (
                    <AlbumTrack track={track} key={track.id} />
                ))}
        </div>

        <div className='mt-8 pl-2'>
            @{ DateTime.fromFormat(data.release_date, 'yyyy-MM-dd').year } {data.label}
        </div>
    </div>
}