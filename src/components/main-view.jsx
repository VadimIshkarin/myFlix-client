import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description:
            "Forrest Gump, an innocent and kind-hearted Alabama boy, has been dealing with other peoples unkindness nearly all his life. Having grown up with beautiful Jenny, his only friend, Forrest yearns to learn all about the ways of the world and embarks on a mission to find his true purpose in life.",
          Genre: "Drama",
          Director: "Robert Zemeckis",
          ImagePath:
            "https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i",
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description:
            "It tells the story of banker, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.",
          Genre: "Drama",
          Director: "Frank Darabont",
          ImagePath:
            "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i",
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description:
            "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
          Genre: "Action",
          Director: "Ridley Scott",
          ImagePath:
            "https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592/?ref_=tt_ov_i",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
