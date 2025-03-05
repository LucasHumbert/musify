import {Album} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtistsNames from "@/components/artist/display-artists-names";
import {DateTime} from "luxon";

export default function AlbumPreview({ album, displayArtistName = false, displayReleaseDate = false } : { album: Album, displayArtistName?: boolean, displayReleaseDate?: boolean}) {
    const releaseDate = DateTime.fromFormat(album.release_date, 'yyyy-MM-dd').toLocaleString()
    const releaseYear = DateTime.fromFormat(album.release_date, 'yyyy-MM-dd').year

    return <div className='w-[300px] min-w-[300px]'>
        <Link href={`/album/${album.id}`}>
            <AlbumCover album={album} size={300} />
            <p className='w-full truncate' title={album.name}>{ album.name }</p>
            { displayReleaseDate && <p className='w-full truncate' title={releaseDate}>{ releaseYear }</p> }
        </Link>

        { displayArtistName && <div className='flex w-full truncate'>
            <DisplayArtistsNames artists={album.artists} />
        </div> }

    </div>
}