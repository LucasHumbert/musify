import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {ArtistProfile} from "@/utils/spotify/spotifyTypes";
import ArtistPicture from "@/components/artist/artist-picture";
import Link from "next/link";

export default async function RecommendedArtists() {
    const token = await fetchSpotifyToken();

    const res = await fetch('https://api.spotify.com/v1/artists?ids=2jZ78PLlC1PuYKQ2bVwRvz,0LKAV3zJ8a8AIGnyc5OvfB,2kXKa3aAFngGz2P4GjG5w2,0VphuTgDCzWuJ9Cs3kkqVL,6Gm6S6XDUo6un4aPrRNeOj,1RyvyyTE3xzB2ZywiAwp0i,0zhMujl1yB8pkB023Qm4Y2,2sBKOwN0fSjx39VtL2WpjJ,11jTIrOwxFOLvhJIdb4FYo,36HOtWiV4nn0luNGSn2xAT,0eDvMgVFoNV3TpwtrVCoTj,20pbz4TbpkBUr5JwYfGgPS', {
        headers: {
            Authorization: 'Bearer ' + token
        },
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        return <h1 className="text-red-500 text-center">Erreur : {res.status} {res.statusText}</h1>;
    }

    const data = await res.json();

    return <div className='flex overflow-x-scroll space-x-4 custom-scrollbar'>
        {data.artists.map((artist: ArtistProfile) => (
            <Link href={`/artist/${artist.id}`} key={artist.id} className='min-w-75'>
                <ArtistPicture artist={artist} size={300} full />
                <p className='text-center'>{artist.name}</p>
            </Link>
        ))}
    </div>
}