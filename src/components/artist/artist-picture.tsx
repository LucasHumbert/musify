import Image from "next/image";
import {SpotifyImage} from "@/utils/spotify/spotifyTypes";

export default function ArtistPicture({ image, size, full }: { image: SpotifyImage, size: number, full?: boolean }) {
    return <Image
        src={image.url}
        width={size}
        height={size}
        alt='Artist picture'
        priority={true}
        className="rounded-full object-cover"
        style={{
            ...full ? { width: '100%' } : {},
            aspectRatio: `${image.width} / ${image.height}`
        }}
    />
}