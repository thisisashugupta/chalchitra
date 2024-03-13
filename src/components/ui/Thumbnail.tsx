import Image from 'next/image';

interface ThumbnailProps {
    thumbnailUrl: string;
    rounded?: 'lg' | 'xl';
}

export default function Thumbnail({thumbnailUrl, rounded='xl'} : ThumbnailProps) {

    return (
        <div className={`relative aspect-video ${rounded === 'lg' ? 'md:rounded-lg' : 'md:rounded-xl' } overflow-hidden`}>
            <Image src={thumbnailUrl} alt='thumbnail' fill className='object-cover bg-slate-700/50' />
        </div>
    );

}