import NewReleases from "@/app/new-releases";
import LoadingSpinner from "@/components/loading-spinner";
import {Suspense} from "react";
import RecommendedArtists from "@/app/recommended-artists";

export default async function Home() {
  return <>
    <section className='m-4'>
      <h1 className='text-2xl mb-2'>New releases</h1>
      <Suspense fallback={<div className='flex justify-center items-center mt-8'><LoadingSpinner /></div>}>
        <NewReleases />
      </Suspense>
    </section>


    <section className='m-4 mt-12'>
      <h1 className='text-2xl mb-2'>Recommended artists</h1>
      <Suspense fallback={<div className='flex justify-center items-center mt-8'><LoadingSpinner /></div>}>
        <RecommendedArtists />
      </Suspense>
    </section>
  </>;
}
