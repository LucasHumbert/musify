import React from "react";
import {Album, ArtistProfile} from "@/utils/spotify/spotifyTypes";
import Link from "next/link";

export default function ResultElement({ title, item, onSelect, isClickable = false }: { title: string, item: Album | ArtistProfile, onSelect: () => void, isClickable?: boolean }) {
    return <div>
        <h2 className="p-2 text-lg underline">{title}</h2>

        {isClickable ? (
            <Link href={`/${item.type}/${item.id}`} onClick={onSelect}>
                <div className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    {item.name}
                </div>
            </Link>
        ) : (
            <div className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                {item.name}
            </div>
        )}
    </div>
}