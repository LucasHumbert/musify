import { fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {Album} from "@/utils/spotify/spotifyTypes";
import AlbumPreview from "@/components/album/album-preview";

export default async function NewReleases() {
    const token = await fetchSpotifyToken();

    const res = await fetch('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
            Authorization: 'Bearer ' + token
        },
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        return <h1 className="text-red-500 text-center">Erreur : {res.status} {res.statusText}</h1>;
    }

    const data = await res.json();

    if (!data.albums || !data.albums.items) {
        return <h1 className="text-center">Aucune nouveauté trouvée.</h1>;
    }

    return <div className='flex overflow-x-scroll space-x-4 custom-scrollbar'>
        {data.albums.items.map((album: Album) => (
            <div key={album.id} className='min-w-75 mb-3'>
                <AlbumPreview album={album} displayArtistName={true} />
            </div>
        ))}
    </div>
}