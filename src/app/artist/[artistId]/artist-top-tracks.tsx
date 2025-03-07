import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import { SpotifyError, Track} from "@/utils/spotify/spotifyTypes";
import AlbumTrack from "@/components/album/album-track";

export default async function ArtistTopTracks({ artistId }: { artistId: string }) {
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data: { tracks: Track[] } | SpotifyError = await res.json()

    if ('error' in data) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{data.error.message}</h1>
    }

    if (data.tracks.length) {
        return <div className='w-[98%] xl:w-1/2 m-auto h-auto'>
            <h2 className='text-2xl mb-4'>Top tracks</h2>
            {data.tracks
                .slice(0, 5)
                .map((track, index) => (
                    <AlbumTrack track={track} trackNumber={index+1} key={track.id} />
                ))
            }
        </div>
    }
}