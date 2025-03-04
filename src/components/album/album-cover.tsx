import Image from "next/image";
import {Album} from "@/utils/spotify/spotifyTypes";

export default function AlbumCover({ album, size } : { album: Album, size: number }) {
    return <Image
        src={album.images[0].url}
        width={size}
        height={size}
        alt={album.name}
        priority={true}
    />
}