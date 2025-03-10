export async function fetchSpotifyToken() {
    console.log('Server URL: ', process.env.SERVER_URL)

    const res = await fetch(`${process.env.SERVER_URL}/api/spotify-token`, {
        next: { revalidate: 3600 },
        cache: 'no-store'
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la récupération du token depuis l'API interne");

    }

    const data = await res.json();
    console.log("Réponse de /api/spotify-token :", data);
    return data.access_token;
}