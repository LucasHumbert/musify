import DisplayArtistsNames from "@/components/artist/display-artists-names";
import {Duration} from "luxon";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/solid";
import {Track} from "@/utils/spotify/spotifyTypes";

export default function AlbumTrack({ track, trackNumber }: { track: Track, trackNumber?: number }) {
    return <div key={track.id} className='flex justify-between items-center my-2 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-200'>
        <div className='mr-3 ml-1 w-5 text-center'>
            {trackNumber ?? track.track_number}
        </div>
        <div className='grow'>
            <p>
                {track.name}
                { track.explicit && <span className='text-sm bg-gray-300 w-fit h-fit ml-1 px-1 rounded-sm' title='Explicit'>E</span> }
            </p>
            <div className='flex w-full truncate flex-wrap'>
                <DisplayArtistsNames artists={track.artists} />
            </div>
        </div>
        <p>{ Duration.fromObject({ milliseconds: track.duration_ms }).toFormat('m:ss') }</p>
        <Link href={track.external_urls.spotify} target='_blank' className='ml-3'>
            <ArrowTopRightOnSquareIcon className="size-5" title='Open in Spotify' />
        </Link>
    </div>
}