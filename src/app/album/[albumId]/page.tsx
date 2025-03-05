import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtistsNames from "@/components/artist/display-artists-names";
import {DateTime} from "luxon";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import AlbumTrack from "@/components/album/album-track";
import {Metadata} from "next";

export async function generateMetadata({ params }: { params: Promise<{ albumId: string }> }): Promise<Metadata> {
    const { albumId } = await params
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const album: Album | SpotifyError = await res.json();

    if ("error" in album) {
        return { title: "Album not found" };
    }

    return { title: album.name };
}

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

    const album: Album | SpotifyError = await res.json()

    if ('error' in album) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{album.error.message}</h1>
    }

    return <div className='py-11'>
        <div className='w-fit m-auto'>
            <AlbumCover album={album} size={400} />
        </div>

        <div className='w-1/2 m-auto flex justify-center items-center'>
            <h1 className='text-5xl text-center leading-snug'>{album.name}</h1>
            <Link href={album.external_urls.spotify} target='_blank' className='ml-1'>
                <ArrowTopRightOnSquareIcon className="size-6" title='Open in Spotify' />
            </Link>
        </div>

        <div className='flex justify-center text-xl'>
            <DisplayArtistsNames artists={album.artists} />
        </div>

        <p className='text-center'>{DateTime.fromFormat(album.release_date, 'yyyy-MM-dd').toLocaleString()}</p>

        <div className='w-1/3 m-auto mt-4'>
            <h2 className='text-2xl mb-4'>{ album.total_tracks } tracks</h2>
            {album.tracks.items
                .slice()
                .sort((a, b) => a.track_number - b.track_number)
                .map((track) => (
                    <AlbumTrack track={track} key={track.id} />
                ))}
        </div>

        <div className='mt-8 pl-2 w-1/3 m-auto'>
            @{ DateTime.fromFormat(album.release_date, 'yyyy-MM-dd').year } {album.label}
        </div>
    </div>
}