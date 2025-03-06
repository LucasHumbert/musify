import NewReleases from "@/app/new-releases";
import LoadingSpinner from "@/components/loading-spinner";
import {Suspense} from "react";

export default async function Home() {
  return <>
    <Suspense fallback={<div className='flex justify-center items-center mt-8'><LoadingSpinner /></div>}>
      <NewReleases />
    </Suspense>
  </>;
}
