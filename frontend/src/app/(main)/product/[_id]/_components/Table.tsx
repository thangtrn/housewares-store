import React from 'react';
import tw from '~/lib/tw';

interface RowProps {
   className?: string;
   data: string[];
}

const Row: React.FC<RowProps> = ({ data }) => {
   return (
      <tr className='border-b odd:bg-[--gray-200-color] even:bg-white'>
         <td className='w-1/3 px-4 py-3 font-medium text-gray-900'>{data[0]}</td>
         <td className='w-2/3 px-4 py-3'>
            <div dangerouslySetInnerHTML={{ __html: data[1] }} />
         </td>
      </tr>
   );
};

interface TableProps {
   className?: string;
   data: string[][];
   children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ className, data, children }) => {
   return (
      <table className={tw('w-full rounded-md text-left text-sm text-gray-500', className)}>
         <tbody>
            {data.map((item, index) => (
               <Row key={index} data={item} />
            ))}
         </tbody>
      </table>
   );
};

export default Table;
