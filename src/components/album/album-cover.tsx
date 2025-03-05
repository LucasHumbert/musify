import Image from "next/image";
import {Album} from "@/utils/spotify/spotifyTypes";

export default function AlbumCover({ album, size, full } : { album: Album, size: number, full?: boolean }) {
    return <Image
        src={album.images[0].url}
        width={size}
        height={size}
        alt={album.name}
        priority={true}
        style={full ? { width: '100%' } : {}}
    />
}