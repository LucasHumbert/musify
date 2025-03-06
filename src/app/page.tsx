import NewReleases from "@/app/new-releases";
import LoadingSpinner from "@/components/loading-spinner";
import {Suspense} from "react";
import RecommendedArtists from "@/app/recommended-artists";

export default async function Home() {
  return <>
    <Suspense fallback={<div className='flex justify-center items-center mt-8'><LoadingSpinner /></div>}>
      <NewReleases />
    </Suspense>

    <Suspense fallback={<div className='flex justify-center items-center mt-8'><LoadingSpinner /></div>}>
      <RecommendedArtists />
    </Suspense>
  </>;
}
