'use client';

import React, { useEffect, useRef, useState } from "react";
import ShowResults from "@/components/search/show-results";
import {SearchResults} from "@/utils/spotify/spotifyTypes";

export default function SearchBar() {
    const [searchInputValue, setSearchInputValue] = useState("");
    const [debouncedSearchInputValue, setDebouncedSearchInputValue] = useState("");
    const [results, setResults] = useState<SearchResults|null>(null);
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedSearchInputValue(searchInputValue);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [searchInputValue]);

    useEffect(() => {
        if (!debouncedSearchInputValue) return;

        fetch(`/api/search?q=${debouncedSearchInputValue}`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data.response)
            })
    }, [debouncedSearchInputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
        setShowResults(true);
    };

    const handleResultSelect = () => {
        setShowResults(false);
        setSearchInputValue("");
    };

    return (
        <div ref={searchContainerRef} className="relative w-[500px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="default-search"
                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Search for albums, artists..."
                   onChange={handleSearchInputChange}
                   onFocus={() => setShowResults(!!searchInputValue.length) }
            />

            {(showResults && results) && <ShowResults results={results} onSelect={handleResultSelect} />}
        </div>
    );
}
