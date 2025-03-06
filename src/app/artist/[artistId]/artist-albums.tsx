import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album, SpotifyError} from "@/utils/spotify/spotifyTypes";
import ArtistAlbumsClient from "@/app/artist/[artistId]/artist-albums-client";

export default async function ArtistAlbums({ artistId }: { artistId: number }) {
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album,single`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data: { items: Album[] } | SpotifyError = await res.json()

    if ('error' in data) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{data.error.message}</h1>
    }

    const content = {
        albums: data.items.filter(album => album.album_type === "album"),
        singles: data.items.filter(album => album.album_type === "single")
    }

    console.log(content.albums)

    return <ArtistAlbumsClient content={content} />
}