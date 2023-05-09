const ListProp = ({movies}) => {


    return (     
    <div className="movie-list">
    {movies.map((movies) => (
    <div className="movie-name" key={movies.id}>
        <h2>{movies.title} : {movies.genre}</h2>
        <p> {movies.body}</p>
        </div>
    ))}
</div> );
}
 
export default ListProp;