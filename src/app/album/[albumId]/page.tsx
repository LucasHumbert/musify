import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtists from "@/components/display-artists";

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
        <div className='w-fit m-auto'>
            <AlbumCover album={data} size={500} />
        </div>

        <h1 className='text-3xl text-center'>{data.name}</h1>

        <div className='flex justify-center'>
            <DisplayArtists artists={data.artists} />
        </div>

        <p className='text-center'>{data.release_date}</p>
    </div>
}