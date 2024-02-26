'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

function debounce<F extends (...args: any[]) => any>(cb: F, delay: number = 1000): (...args: Parameters<F>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {cb(...args)}, delay);
    };
}

const updateDebounceText = debounce((searchTerm: string) => {
    // make api call here
    console.log("debounce", searchTerm);
}, 650);

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        updateDebounceText(event.target.value);
    };

    return (
        <div>
            <form>
                <Input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
                <button type='submit' >Search</button>
            </form>
        </div>
    );
};

export default SearchBar;