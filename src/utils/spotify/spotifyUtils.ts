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