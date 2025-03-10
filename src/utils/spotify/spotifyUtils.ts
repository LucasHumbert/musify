export async function fetchSpotifyToken() {
    if (!process.env.NEXT_RUNTIME || process.env.NEXT_RUNTIME === "nodejs") {
        console.log("Fetch du token désactivé pendant le build");
        return "fake_token";
    }

    const res = await fetch(`${process.env.SERVER_URL}/api/spotify-token`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la récupération du token depuis l'API interne");

    }

    const data = await res.json();
    return data.access_token;
}