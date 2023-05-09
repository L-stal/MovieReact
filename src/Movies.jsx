import { useState } from 'react';
import ListProp from './ListProp';


const Person = () => {
    const [movies , setMovies] = useState([
        {title: "Hero movie", body:"just a place holder text to se if stuff works", genre: "Action" , id: 1},
        {title: "Hero movie2", body:"just a place holder text to se if stuff works2", genre: "80's action" , id: 2},
        {title: "Hero movie3", body:"just a place holder text to se if stuff works3", genre: "Action Reborn" , id: 3}
    ]);

    return (
        <div className="movie-list">
            <ListProp movies={movies} />
        </div>
    );
}
 
export default Person;