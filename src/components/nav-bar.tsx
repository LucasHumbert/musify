import Link from "next/link";

export default function NavBar() {
    return <div className='w-full bg-gray-800 text-white p-5'>
        <Link href='/'>
            <h1 className='text-3xl'>Musify</h1>
        </Link>
    </div>
}