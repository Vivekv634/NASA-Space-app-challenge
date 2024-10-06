import React from 'react'

const InfoCard = ({ Info }) => {
    return (
        <div className='bg-green-500'>
            <h1>{Info?.name}</h1>
            <p>{Info?.radius}</p>
            <p>{Info?.tilt}</p>
        </div>
    )
}

export default InfoCard