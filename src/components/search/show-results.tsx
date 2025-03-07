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
                    <div>
                        <h2 className="p-2 text-lg underline">Artist</h2>
                        <ResultElement item={results.artists.items[0]} onSelect={onSelect} isClickable />
                    </div>
                )}

                {results.albums.items.length > 0 && (
                    <div>
                        <h2 className="p-2 text-lg underline">Albums</h2>
                        { results.albums.items.map((album) => (
                            <ResultElement key={album.id} item={album} onSelect={onSelect} isClickable />
                        ))}
                    </div>
                )}

                {results.tracks.items.length > 0 && (
                    <div>
                        <h2 className="p-2 text-lg underline">Tracks</h2>
                        { results.tracks.items.map((track) => (
                            <ResultElement key={track.id} item={track} onSelect={onSelect} />
                        ))}
                    </div>
                )}
            </div>
        ) : (
            <div className="p-3 text-gray-500 dark:text-gray-400">No results found</div>
        )}
    </div>
}