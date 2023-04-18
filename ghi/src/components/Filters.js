import React from 'react';
import Filter from './Filter';
import {GiLargePaintBrush} from 'react-icons/gi';
import {BsFillPencilFill} from 'react-icons/bs';
import {GiStoneBust} from 'react-icons/gi';
import {MdMiscellaneousServices} from 'react-icons/md';

const Filters = () => {
    const sorting = [
        {title:'Painting', icon:<GiLargePaintBrush />},
        {title:'Drawing', icon:<BsFillPencilFill />},
        {title:'Sculpture', icon:<GiStoneBust />},
        {title:'Whatevers', icon:<MdMiscellaneousServices />},
    ];
    return(
        <div className=''>
            <div className='flex justify-start gap-3 sm:gap-4 mt-4'>
                {sorting.map((obj) => (
                    <Filter title={obj.title} icon={obj.icon} />
                ))}
            </div>
        </div>
    );
}
export default Filters;
