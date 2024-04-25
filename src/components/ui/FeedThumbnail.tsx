import Image from 'next/image'

interface ThumbnailProps {
    thumbnailUrl: string;
    rounded?: 'lg' | 'xl';
}

export default function FeedThumbnail({thumbnailUrl, rounded='xl'} : ThumbnailProps) {

    return (
        <div className={`relative aspect-video ${rounded === 'lg' ? 'md:rounded-lg' : 'md:rounded-xl' } overflow-hidden`}>
            <Image 
                src={thumbnailUrl} 
                alt='thumbnail' 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className='object-cover bg-slate-700/50' 
            />
        </div>
    );

}