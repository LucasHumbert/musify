import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtists from "@/components/display-artists";
import {DateTime, Duration} from "luxon";

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

    return <div className='w-1/3 m-auto py-11'>
        <div className='w-fit m-auto'>
            <AlbumCover album={data} size={500} />
        </div>

        <h1 className='text-5xl text-center'>{data.name}</h1>

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
                    <div key={track.id} className='flex justify-between items-center my-2 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-200'>
                        <div className='mr-3 ml-1 w-5 text-center'>
                            {track.track_number}
                        </div>
                        <div className='grow'>
                            <div className='flex'>
                                <p>{track.name}</p>
                                { track.explicit && <div className='bg-gray-300 w-fit ml-1 px-1 rounded-sm' title='Explicit'>E</div> }
                            </div>
                            <div className='flex'><DisplayArtists artists={track.artists} /></div>
                        </div>
                        <p>{ Duration.fromObject({ milliseconds: track.duration_ms }).toFormat('m:ss') }</p>
                        <div>
                            ...
                        </div>
                    </div>
                ))}
        </div>

        <div className='mt-8 pl-2'>
            @{ DateTime.fromFormat(data.release_date, 'yyyy-MM-dd').year } {data.label}
        </div>
    </div>
}