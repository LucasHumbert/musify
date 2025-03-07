import Image from "next/image";
import {SpotifyImage} from "@/utils/spotify/spotifyTypes";

export default function AlbumCover({ image, size, full } : { image: SpotifyImage, size: number, full?: boolean }) {
    return <Image
        src={image.url}
        width={size}
        height={size}
        alt='Album cover'
        priority={true}
        style={full ? { width: '100%' } : {}}
    />
}