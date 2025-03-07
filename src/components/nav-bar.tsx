import Link from "next/link";
import SearchBar from "@/components/search/searchBar";

export default function NavBar() {
    return <div className='w-full flex flex-col sm:flex-row gap-y-4 justify-between items-center bg-gray-800 text-white p-5'>
        <Link href='/'>
            <h1 className='text-3xl'>Musify</h1>
        </Link>

        <SearchBar />
    </div>
}