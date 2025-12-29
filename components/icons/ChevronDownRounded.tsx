import React from "react";

interface IconProps {
    className?: string;
    size?: number | string;
}

export default function ChevronDownRoundedIcon({ className, size = 24 }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
            <path d="M12 6.00003C12 6.00003 9.05404 9.99999 7.99997 10C6.94589 10 4 6 4 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}