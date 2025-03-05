import {Fragment} from "react";

export default function DisplayArtistGenres({ genres }: { genres: string[] }) {
    return <>
        {genres.map((genre, index) => {
            return <p key={genre}>
                { genre }{index !== genres.length - 1 && <span className='mr-1'>,</span>}
            </p>
        })}
    </>
}