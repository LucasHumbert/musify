import { headers } from "next/headers";

export async function fetchSpotifyToken() {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/spotify-token`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la récupération du token depuis l'API interne");

    }

    const data = await res.json();
    return data.access_token;
}