export type Album = {
    id: string,
    artists: Artist[],
    images: { url: string }[],
    name: string,
    release_date: string,
    tracks: {
        items: Track[]
    },
    total_tracks: number,
    label: string,
    external_urls: External_urls
}

export type Artist = {
    id: string,
    href: string,
    name: string
}

export type Track = {
    id: string,
    artists: Artist[],
    name: string
    duration_ms: number,
    explicit: boolean,
    track_number: number,
    external_urls: External_urls
}

type External_urls = {
    spotify: string
}

export type SpotifyError = {
    error: {
        status: number;
        message: string;
    };
};