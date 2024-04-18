'use client';
import './embla.css';
import React from 'react';
import { useDotButton } from './EmblaCarouselDotButton';
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import tw from '~/lib/tw';

interface EmblaCarouselProps {
   slides: string[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

   const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

   const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

   const emblaVariable: Record<string, string> = {
      '--slide-height': '22.5rem',
      '--slide-spacing': '1rem',
      '--slide-size': '100%'
   };

   const setAutoPlay = (type: string) => {
      // @ts-ignore: Thư viện Type lỗi
      const { stop, play } = emblaApi?.plugins(Autoplay).autoplay;

      if (type === 'stop') {
         stop?.();
      }
      if (type === 'play') {
         play?.();
      }
   };

   return (
      <div
         className='relative'
         style={emblaVariable}
         onMouseEnter={() => setAutoPlay('stop')}
         onMouseLeave={() => setAutoPlay('play')}
      >
         <div className='overflow-hidden' ref={emblaRef}>
            <div className='ml-[calc(var(--slide-spacing)*-1)] flex touch-pan-y'>
               {slides.map((slide, index) => (
                  <div className='flex-shrink-0 basis-full pl-[--slide-spacing]' key={index}>
                     <div className='h-[--slide-height] w-full overflow-hidden rounded-md bg-gray-500'>
                        <Image src={slide} width={800} height={420} alt='123' className='h-full w-full object-cover' />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <Button
            isIconOnly
            color='default'
            size='lg'
            radius='full'
            onClick={onPrevButtonClick}
            className='absolute left-3 top-1/2 -translate-y-1/2 shadow-lg'
            aria-label='previos'
         >
            <ChevronLeft />
         </Button>
         <Button
            isIconOnly
            color='default'
            radius='full'
            size='lg'
            onClick={onNextButtonClick}
            className='absolute right-3 top-1/2 -translate-y-1/2 shadow-lg'
            aria-label='next'
         >
            <ChevronRight />
         </Button>

         {/* PAGINATION  */}
         <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center'>
            {scrollSnaps.map((_, index) => (
               <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={tw(
                     'before:duration-250 flex h-8 w-8 touch-manipulation items-center justify-center before:block before:h-2 before:w-2 before:rounded-full before:bg-[--gray-300-color] before:shadow-lg before:transition-all before:ease-linear',
                     index === selectedIndex && 'before:w-6 before:bg-[--gray-500-color]'
                  )}
               />
            ))}
         </div>
      </div>
   );
};

export default EmblaCarousel;
