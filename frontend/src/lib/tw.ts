import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const tw = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs));
};

export default tw;
