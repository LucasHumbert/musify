import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const token = await fetchSpotifyToken();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const response = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=album,artist,track&limit=2`, {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "Erreur lors de la recherche" },
            { status: 500 }
        );
    }

    const data = await response.json()

    return NextResponse.json({ response: data });
}