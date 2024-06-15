import React from 'react';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti"
import { useState,useEffect } from 'react';

export default function RatingStars({avg_rating, size}) {

    const [stars, set_stars] = useState({
        full : 0,
        half: 0,
        empty: 0
    })

    useEffect(() => {
        const full_stars = Math.floor(avg_rating) || 0;
        const half_stars = Number.isInteger(avg_rating) ? 0 : 1;
        const empty_stars = 5 - full_stars - half_stars;
        set_stars({
            full : full_stars,
            half : half_stars,
            empty : empty_stars
        })
    }, [avg_rating])

    return (
        <div className='flex gap-1 text-yellow-200'>

            {
                [...new Array(stars.full)].map(( _ , ind) => (
                    <TiStarFullOutline size={size || 20} key={ind}/>
                ) )
            }

            {
                [...new Array(stars.half)].map(( _ , ind) => (
                    <TiStarHalfOutline size={size || 20} key={ind}/>
                ) )
            }

            {
                [...new Array(stars.empty)].map(( _ , ind) => (
                    <TiStarOutline size={size || 20} key={ind}/>
                ) )
            }

        </div>
    )
}
