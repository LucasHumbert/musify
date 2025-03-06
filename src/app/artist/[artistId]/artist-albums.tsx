import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import ArtistAlbumsClient from "@/app/artist/[artistId]/artist-albums-client";
import {Album} from "@/utils/spotify/spotifyTypes";

export default async function ArtistAlbums({ artistId }: { artistId: string }) {
    const token = await fetchSpotifyToken();

    const fetchAlbumsByGroup = async (group: string) => {
        const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=${group}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        return data.items || [];
    };

    const [albums, singles, appearsOn] = await Promise.all([
        fetchAlbumsByGroup("album"),
        fetchAlbumsByGroup("single"),
        fetchAlbumsByGroup("appears_on")
    ]);

    const sortByDate = (a: Album, b: Album) => b.release_date.localeCompare(a.release_date);

    const content: { albums: Album[], singles: Album[], appears_on: Album[] } = {
        albums: albums.sort(sortByDate),
        singles: singles.sort(sortByDate),
        appears_on: appearsOn.sort(sortByDate)
    };

    return <ArtistAlbumsClient content={content} />
}