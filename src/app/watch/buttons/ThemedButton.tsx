'use client'

interface ThemedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function ThemedButton({children, onClick, className}: ThemedButtonProps) {
    return (<button className={`px-3 py-2 bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600/70 ${className}`} onClick={onClick}>
        {children}
    </button>)

}