import Image from "next/image";
import {ArtistProfile} from "@/utils/spotify/spotifyTypes";

export default function ArtistPicture({ artist, size, full }: { artist: ArtistProfile, size: number, full?: boolean }) {
    return <Image
        src={artist.images[0].url}
        width={size}
        height={size}
        alt={artist.name}
        priority={true}
        className="rounded-full object-cover"
        style={{
            ...full ? { width: '100%' } : {},
            aspectRatio: `${artist.images[0].width} / ${artist.images[0].height}`
        }}
    />
}