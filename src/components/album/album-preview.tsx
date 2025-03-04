import {Album} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtists from "@/components/display-artists";

export default function AlbumPreview({ album } : { album: Album }) {
    return <div>
        <Link href={`/album/${album.id}`}>
            <AlbumCover album={album} size={300} />
            <p>{ album.name }</p>
        </Link>
        <div className='flex'>
            <DisplayArtists artists={album.artists} />
        </div>
    </div>
}