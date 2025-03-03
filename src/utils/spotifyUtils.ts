export async function fetchSpotifyToken() {
    const res = await fetch(`${process.env.SERVER_URL}/api/spotify-token`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la récupération du token depuis l'API interne");
    }

    const data = await res.json();
    return data.access_token;
}

export type Album = {
    id: string,
    artists: Artist[],
    images: { url: string }[],
    name: string,
    release_date: string
}

type Artist = {
    id: string,
    href: string,
    name: string
}