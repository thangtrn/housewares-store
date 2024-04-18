'use client';
import { EmblaCarouselType } from 'embla-carousel';
import React, { useCallback, useEffect, useState } from 'react';

export const useDotButton = (emblaApi?: EmblaCarouselType, onButtonClick?: (emblaApi?: EmblaCarouselType) => void) => {
   const [selectedIndex, setSelectedIndex] = useState<number>(0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

   const onDotButtonClick = useCallback(
      (index: number) => {
         if (!emblaApi) return;
         emblaApi.scrollTo(index);
         if (onButtonClick) onButtonClick(emblaApi);
      },
      [emblaApi, onButtonClick]
   );

   const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
   }, []);

   const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
   }, []);

   useEffect(() => {
      if (!emblaApi) return;

      onInit(emblaApi);
      onSelect(emblaApi);
      emblaApi.on('reInit', onInit);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('select', onSelect);
   }, [emblaApi, onInit, onSelect]);

   return {
      selectedIndex,
      scrollSnaps,
      onDotButtonClick
   };
};
