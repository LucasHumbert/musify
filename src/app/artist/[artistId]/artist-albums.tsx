import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import AlbumPreview from "@/components/album/album-preview";

export default async function ArtistAlbums({ artistId }: { artistId: number }) {
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data: { items: Album[] } | SpotifyError = await res.json()

    if ('error' in data) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{data.error.message}</h1>
    }

    console.log(data)

    return <div className='flex space-x-4 overflow-x-auto'>
        {data.items
            .map((album) => (
                <AlbumPreview album={album} key={album.id} />
            ))
        }
    </div>
}