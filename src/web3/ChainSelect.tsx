// components/Global/ChainSelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

// Define supported blockchain types
type BlockchainType = 'SOL' | 'ETH' | 'POL' | 'BNB';

const ChainSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize selected chain from localStorage with fallback to SOL
    const [selectedOption, setSelectedOption] = useState<BlockchainType>(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('blockchain');
            if (!stored) {
                localStorage.setItem('blockchain', 'SOL');
                return 'SOL';
            }
            return stored as BlockchainType;
        }
        return 'SOL';
    });

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const selectOption = (option: BlockchainType) => {
        setSelectedOption(option);
        localStorage.setItem('blockchain', option);
        setIsOpen(false);
        window.location.reload();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Selected Option */}
            <div
                className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#3a3a3a] transition-all duration-300"
                onClick={toggleDropdown}
            >
                <span className="text-white font-medium">{selectedOption}</span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute border mt-2 w-full rounded-md shadow-lg z-[999]" style={{background:'#fff'}}> 
                    <div
                        className="px-4 py-2 text-wblack font-semibold hover:text-white  transition-all duration-200 cursor-pointer"
                        onClick={() => selectOption('SOL')}
                    >
                        SOL
                    </div>
                    <div
                        className="px-4 py-2 text-black font-semibold hover:text-white  transition-all duration-200 cursor-pointer"
                        onClick={() => selectOption('ETH')}
                    >
                        ETH
                    </div>
                    <div
                        className="px-4 py-2 text-black font-semibold hover:text-white  transition-all duration-200 cursor-pointer"
                        onClick={() => selectOption('POL')}
                    >
                        POL
                    </div>
                    <div
                        className="px-4 py-2 text-black font-semibold hover:text-white  transition-all duration-200 cursor-pointer"
                        onClick={() => selectOption('BNB')}
                    >
                        BNB
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChainSelect;