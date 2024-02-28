'use client';

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/useDebounce'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Video[] | null>(null);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    
    const debouncedSearch = useDebounce(searchTerm, 200);
    const router = useRouter()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowSuggestions(true);
        setSearchTerm(event.target.value);
    };

    const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSearchTerm(event.currentTarget.innerText);
        setShowSuggestions(false);
        router.push(`/results?search_query=${event.currentTarget.innerText}`);
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        setShowSuggestions(false);
        router.push(`/results?search_query=${searchTerm}`)
    }

    // TODO: backend validation in searchTerm

    async function fetchVideos() {
        const res = await fetch(`/api/videos/search?query=${debouncedSearch}`)
        const data = await res.json();
        setSearchResults(data.videos);
        return data;
    }

    useEffect(() => {
        if (debouncedSearch) fetchVideos();
    }, [debouncedSearch])

    return (
        <div>
            <form className='flex' onSubmit={handleSubmit}>
                <Input className='z-10 h-10 border-r-0 rounded-s-full rounded-e-none' type="text" value={searchTerm || ""} onChange={handleSearch} placeholder="Search" />
                {searchTerm && <div className='border-t border-b border-grey-500 flex items-center px-1'><button className='p-1 bg-white hover:bg-gray-200 rounded-full' type='button' onClick={() => {setSearchTerm("")}}><X strokeWidth={1} /></button></div>}
                <Button className='h-10 rounded-s-none rounded-e-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-300' variant='outline' type='submit' ><Search strokeWidth={1} /></Button>
            </form>
            <div className='w-72 mt-2 absolute'>
                {showSuggestions && searchTerm!=="" && searchResults !== null && searchResults.length > 0 && (
                    <ScrollArea className='w-full border border-grey-500 rounded-xl p-2 bg-white'>
                        {searchResults.map((result, index) => (
                            <div className='hover:bg-blue-100' key={index}><button className='w-full py-1 text-left pl-2 text-sm text-gray-500 hover:text-black' onClick={handleSelect}>{result.title}</button></div>
                        ))}
                    </ScrollArea>
                )}
            </div>
        </div>
    );
};

export default SearchBar;