'use client';

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/useDebounce'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

type SetOpenSearchType = (value: boolean) => void;

const SearchBar: React.FC<{ setOpenSearch?: SetOpenSearchType }> = ({setOpenSearch}) => {

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
        setOpenSearch && setOpenSearch(false);
        setShowSuggestions(false);
        router.push(`/results?search_query=${event.currentTarget.innerText}`);
        
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        setOpenSearch && setOpenSearch(false);
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
                <Input 
                    className='z-10 h-10 pl-4 bg-white/50 dark:bg-black/50 text-base border-r-0 border-gray-300 dark:border-gray-500/50 rounded-s-full rounded-e-none' 
                    type="text" 
                    value={searchTerm || ""} 
                    onChange={handleSearch} 
                    placeholder="Search" 
                />
                {searchTerm && 
                <div className='bg-white/50 dark:bg-black/50 border-gray-300 dark:border-gray-500/50 border-t border-b flex items-center px-1'>
                    <button 
                        className='p-1 hover:bg-gray-200 dark:hover:bg-gray-700/80 rounded-full' 
                        type='button' 
                        onClick={() => {setSearchTerm("")}}
                    >
                        <X strokeWidth={1} />
                    </button>
                </div>
                }
                <Button 
                    className='h-10 px-[1.2rem] border-gray-300 dark:border-gray-500/50 rounded-s-none rounded-e-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700/80 focus:bg-gray-300 dark:focus:bg-gray-600/70' 
                    variant='outline' 
                    type='submit' 
                >
                    <Search strokeWidth={1} />
                </Button>
            </form>
            <div className='mr-6 min-w-[18rem] md:min-w-[20rem] max-w-[33.5rem] mt-1 absolute'>
                {showSuggestions && searchTerm!=="" && searchResults !== null && searchResults.length > 0 && (
                    <ScrollArea className='w-full border border-grey-500 rounded-xl bg-white dark:bg-black'>
                        <div className='h-4'/>
                        {searchResults.slice(0,10).map((result, index) => (
                            <div className='hover:bg-gray-200' key={index}>
                                <button className='w-full px-3 py-1 flex items-center space-x-4 text-left text-sm' onClick={handleSelect}>
                                    <div>
                                        <Search strokeWidth={1} size={24} />
                                    </div>
                                    <p className='font-semibold line-clamp-1'>{result.title}</p>
                                </button>
                            </div>
                        ))}
                        <div className='h-2'/>
                    </ScrollArea>
                )}
            </div>
        </div>
    );
};

export default SearchBar;