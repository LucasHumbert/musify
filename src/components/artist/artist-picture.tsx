import Image from "next/image";
import {ArtistProfile} from "@/utils/spotify/spotifyTypes";

export default function ArtistPicture({ artist, size }: { artist: ArtistProfile, size: number }) {
    return <Image
        src={artist.images[0].url}
        width={size}
        height={size}
        alt={artist.name}
        priority={true}
        className="rounded-full object-cover"
        style={{ aspectRatio: `${artist.images[0].width} / ${artist.images[0].height}` }}
    />
}