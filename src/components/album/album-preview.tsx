import {Album} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtistsNames from "@/components/artist/display-artists-names";

export default function AlbumPreview({ album } : { album: Album }) {
    return <div className='w-[300px] min-w-[300px]'>
        <Link href={`/album/${album.id}`}>
            <AlbumCover album={album} size={300} />
            <p className='w-full truncate' title={album.name}>{ album.name }</p>
        </Link>
        <div className='flex w-full truncate'>
            <DisplayArtistsNames artists={album.artists} />
        </div>
    </div>
}