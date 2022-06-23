import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function Rating({ rating }) {

    const full = 5;
    let whole = 0;
    let empty = 0;
    let half = false;

    if (rating % 1 === 0) {
        whole = rating;
        empty = full - whole;
    } else if (rating % 1 === 0.5) {
        whole = rating - 0.5;
        half = true;
        empty = full - whole - 1;
    }

    return (
        <span>
            {Array(whole).fill().map((_, i) => (
                <StarIcon key={i} />
            ))}
            {half && <StarHalfIcon />}
            {Array(empty).fill().map((_, i) => (
                <StarOutlineIcon key={i} />
            ))}
            </span>
    );
}

export default Rating;