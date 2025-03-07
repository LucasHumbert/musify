import React from "react";
import { SearchResults} from "@/utils/spotify/spotifyTypes";
import ResultElement from "@/components/search/result-element";

export default function ShowResults({ results, onSelect } : { results: SearchResults, onSelect: () => void }) {
    return <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
        {(results.artists.items.length > 0 ||
            results.albums.items.length > 0 ||
            results.tracks.items.length > 0
        ) ? (
            <div>
                {results.artists.items.length > 0 && (
                   <ResultElement title={'Artist'} item={results.artists.items[0]} onSelect={onSelect} isClickable />
                )}

                {results.albums.items.length > 0 && (
                    <ResultElement title={'Album'} item={results.albums.items[0]} onSelect={onSelect} isClickable />
                )}

                {results.tracks.items.length > 0 && (
                    <ResultElement title={'Track'} item={results.tracks.items[0]} onSelect={onSelect} />
                )}
            </div>
        ) : (
            <div className="p-3 text-gray-500 dark:text-gray-400">No results found</div>
        )}
    </div>
}