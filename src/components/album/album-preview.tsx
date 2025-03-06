import {Album} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";
import AlbumCover from "@/components/album/album-cover";
import DisplayArtistsNames from "@/components/artist/display-artists-names";
import {DateTime} from "luxon";

export default function AlbumPreview({
    album,
    displayArtistName = false,
    displayReleaseDate = false,
    fullSizeCover = false
} : {
    album: Album,
    displayArtistName?: boolean,
    displayReleaseDate?: boolean,
    fullSizeCover?: boolean
}) {
    const format = {
        year: 'yyyy',
        month: 'yyyy-MM',
        day: 'yyyy-MM-dd',
    }[album.release_date_precision] || 'yyyy-MM-dd';

    const releaseDate = DateTime.fromFormat(album.release_date, format).toLocaleString()
    const releaseYear = DateTime.fromFormat(album.release_date, format).year

    return <div>
        <Link href={`/album/${album.id}`}>
            <AlbumCover album={album} size={300} full={fullSizeCover} />
            <p className='w-full truncate' title={album.name}>{ album.name }</p>
            { displayReleaseDate && <p className='w-full truncate' title={releaseDate}>{ releaseYear }</p> }
        </Link>

        { displayArtistName && <div className='flex w-full truncate'>
            <DisplayArtistsNames artists={album.artists} />
        </div> }

    </div>
}