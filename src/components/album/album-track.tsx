import DisplayArtists from "@/components/display-artists";
import {Duration} from "luxon";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/solid";
import {Track} from "@/utils/spotify/spotifyTypes";

export default function AlbumTrack({ track }: { track: Track }) {
    return <div key={track.id} className='flex justify-between items-center my-2 px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-200'>
        <div className='mr-3 ml-1 w-5 text-center'>
            {track.track_number}
        </div>
        <div className='grow'>
            <div className='flex'>
                <p>{track.name}</p>
                { track.explicit && <div className='bg-gray-300 w-fit ml-1 px-1 rounded-sm' title='Explicit'>E</div> }
            </div>
            <div className='flex'><DisplayArtists artists={track.artists} /></div>
        </div>
        <p>{ Duration.fromObject({ milliseconds: track.duration_ms }).toFormat('m:ss') }</p>
        <Link href={track.external_urls.spotify} target='_blank' className='ml-3'>
            <ArrowTopRightOnSquareIcon className="size-5" title='Open in Spotify' />
        </Link>
    </div>
}