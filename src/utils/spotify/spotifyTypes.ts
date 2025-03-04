export type Album = {
    id: string,
    artists: Artist[],
    images: { url: string }[],
    name: string,
    release_date: string,
    tracks: {
        items: Track[]
    }
}

export type Artist = {
    id: string,
    href: string,
    name: string
}

type Track = {
    id: string,
    artists: Artist[],
    name: string
    duration: number
}

export type SpotifyError = {
    error: {
        status: number;
        message: string;
    };
};