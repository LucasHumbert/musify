export type Album = {
    id: string,
    artists: Artist[],
    images: SpotifyImage[],
    name: string,
    release_date: string,
    release_date_precision: string,
    tracks: {
        items: Track[]
    },
    total_tracks: number,
    label: string,
    external_urls: External_urls,
    album_type: string,
    type: string
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
    external_urls: External_urls,
    type: string
}

type External_urls = {
    spotify: string
}

export type ArtistProfile = {
    id: number,
    name: string,
    followers: {
        total: number
    },
    genres: string[],
    images: SpotifyImage[],
    external_urls: External_urls,
    type: string
}

type SpotifyImage = {
    url: string
    width: number,
    height: number
}

export type SpotifyError = {
    error: {
        status: number;
        message: string;
    };
};

export type SearchResults = {
    albums: {
        items: Album[]
    },
    artists: {
        items: ArtistProfile[]
    },
    tracks: {
        items: Album[]
    }
}