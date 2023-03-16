import React, { useState } from 'react';
import Star from './Star';

const RatingStars = () => {
    const [gradeIndex, setGradeIndex] = useState();
    const GRADES = ['1', '2', '3', '4', '5'];

    const changeGradeIndex = ( index ) => {
        setGradeIndex(index);
    }

    return (
        <div className="container">
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                        <Star />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingStars;