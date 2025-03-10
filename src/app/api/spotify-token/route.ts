// import { NextResponse } from "next/server";
//
// let cachedToken: string | null = null;
// let tokenExpiration: number = 0;

export async function GET() {
    console.log("API /api/spotify-token appelée !");

    return Response.json({ access_token: "fake_token" });
    // if (cachedToken && tokenExpiration > Date.now()) {
    //     return NextResponse.json({ access_token: cachedToken });
    // }
    //
    // const client_id = process.env.SPOTIFY_CLIENT_ID!;
    // const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
    //
    // const response = await fetch("https://accounts.spotify.com/api/token", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization:
    //             "Basic " +
    //             Buffer.from(client_id + ":" + client_secret).toString("base64"),
    //     },
    //     body: new URLSearchParams({
    //         grant_type: "client_credentials",
    //     }),
    // });
    //
    // if (!response.ok) {
    //     return NextResponse.json(
    //         { error: "Erreur lors de l'obtention du token" },
    //         { status: 500 }
    //     );
    // }
    //
    // const data = await response.json();
    //
    // cachedToken = data.access_token;
    // tokenExpiration = Date.now() + data.expires_in * 1000;
    //
    // return NextResponse.json({ access_token: data.access_token });
}
