import React from "react";
import axios from "axios";
import { MovieCard } from "./movie-card/movie-card";
import { MovieView } from "./movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        // {
        //   _id: 1,
        //   Title: "Inception",
        //   Description:
        //     "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        //   Genre: "Science fiction action film",
        //   Director: "Christopher Nolan",
        //   ImagePath:
        //     "https://m.media-amazon.com/images/M/MV5BMTQ3NTU4MjA2Ml5BMl5BanBnXkFtZTcwNjQ0OTk1Mw@@._V1_UY100_CR25,0,100,100_AL_.jpg",
        // },
        // {
        //   _id: 2,
        //   Title: "The Shawshank Redemption",
        //   Description:
        //     "It tells the story of banker, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.",
        //   Genre: "Drama",
        //   Director: "Frank Darabont",
        //   ImagePath:
        //     "https://m.media-amazon.com/images/M/MV5BMTc3NjM4MTY3MV5BMl5BanBnXkFtZTcwODk4Mzg3OA@@._V1_UX100_CR0,0,100,100_AL_.jpg",
        // },
        // {
        //   _id: 3,
        //   Title: "Gladiator",
        //   Description:
        //     "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        //   Genre: "Action",
        //   Director: "Ridley Scott",
        //   ImagePath:
        //     "https://m.media-amazon.com/images/M/MV5BMTM1NTA3MTkwOF5BMl5BanBnXkFtZTcwOTQ0NjcxNA@@._V1_UX100_CR0,0,100,100_AL_.jpg",
        // },
      ],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://movieapishelf.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // if (selectedMovie) return <MovieView movie={selectedMovie} />;

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
