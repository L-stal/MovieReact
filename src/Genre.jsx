import { useState } from 'react';



const Genre = () => {
    const handleClick = () => 
    console.log('hello genre')
    return (
        <div className="person">
            <h2>Genre</h2>
            <button onClick={handleClick}>Click me</button>
        </div>
    );;
}
 
export default Genre;