import {fetchSpotifyToken} from "@/utils/spotify/spotifyUtils";
import {ArtistProfile, SpotifyError} from "@/utils/spotify/spotifyTypes";
import ArtistPicture from "@/components/artist/artist-picture";
import DisplayArtistGenres from "@/components/artist/display-artist-genres";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/solid";
import ArtistTopTracks from "@/app/artist/[artistId]/artist-top-tracks";
import {Suspense} from "react";
import LoadingSpinner from "@/components/loading-spinner";

export default async function ArtistPage({ params }: { params: Promise<{ artistId : number}> }) {
    const { artistId } = await params
    const token = await fetchSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const artistProfile: ArtistProfile | SpotifyError = await res.json()

    if ('error' in artistProfile) {
        return <h1 className='text-red-500 text-center mt-4 text-4xl'>{artistProfile.error.message}</h1>
    }

    return <div className='w-full m-auto p-11 flex items-start'>
        <div className='w-1/2'>
            <div className='w-fit m-auto'>
                <ArtistPicture artist={artistProfile} size={400} />
            </div>

            <div className='text-center'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-7xl text-center leading-snug'>{artistProfile.name}</h1>
                    <Link href={artistProfile.external_urls.spotify} target='_blank' className='ml-1'>
                        <ArrowTopRightOnSquareIcon className="size-6" title='Open in Spotify' />
                    </Link>
                </div>
                <p className='text-2xl'>{ artistProfile.followers.total } followers</p>

                {artistProfile.genres.length > 0 &&
                  <div className='flex mt-2 justify-center'>
                      <DisplayArtistGenres genres={artistProfile.genres} />
                  </div>
                }
            </div>
        </div>

        <div className='w-1/3 h-auto'>
            <Suspense fallback={<div className='flex justify-center items-center'><LoadingSpinner /></div>}>
                <h2 className='text-2xl mb-4'>Top tracks</h2>
                <ArtistTopTracks artistId={artistId} />
            </Suspense>
        </div>
    </div>
}