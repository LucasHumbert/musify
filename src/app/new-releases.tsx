import {Album, fetchSpotifyToken} from "@/utils/spotifyUtils";
import AlbumCover from "@/components/album-cover";

export default async function NewReleases() {
    const token = await fetchSpotifyToken();

    const data = await fetch('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const { albums } = await data.json()
    console.log(albums)

    return <section className='m-4'>
        <h1 className='text-2xl mb-2'>New releases</h1>
        <div className='flex overflow-x-scroll space-x-4'>
            {albums.items.map((album: Album) => (
                <div key={album.id} className='min-w-75'>
                    <AlbumCover album={album} />
                </div>
            ))}
        </div>
    </section>;
}