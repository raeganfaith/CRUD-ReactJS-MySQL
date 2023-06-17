/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMoviereview] = useState("");

  const [newMovie, setNewMovie] = useState("");
  const [newReview, setNewReview] = useState("");

  const [movieList, setMovieList] = useState([]);

  const addReview = () => {
    Axios.post("http://localhost:3001/create", {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      setMovieList([
        ...movieList,
        {
          movieName: movieName,
          movieReview: movieReview,
        },
      ]);
    });
  };

  const getMovieReview = () => {
    Axios.get("http://localhost:3001/moviereview").then((response) => {
      setMovieList(response.data);
    });
  };

  const updateReview = (id) => {
    setNewReview("");
    Axios.put("http://localhost:3001/update", {
      movieReview: newReview,
      id: id,
    }).then(() => {
      setMovieList(
        movieList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                movieName: val.movieName,
                movieReview: newReview,
              }
            : val;
        })
      );
    });
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setMovieList(
        movieList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <div className="box">
          <h1>CRUD APPLICATION</h1>
          <label>Enter movie movieName:</label>
          <input
            type="text"
            onChange={(event) => {
              setMovieName(event.target.value);
            }}
          />
          <label>Enter your movie review:</label>
          <input
            className="review"
            type="text"
            onChange={(event) => {
              setMoviereview(event.target.value);
            }}
          />
          <button onClick={addReview}>Add Movie Review</button>
          <button className="showreviews" onClick={getMovieReview}>
            View Movie Reviews
          </button>
        </div>
      </div>
      <div className="movie_review">
        {movieList.map((val) => {
          return (
            <div className="movie">
              <div className="showlabels">
                <h3>Movie Name: {val.movieName}</h3>
                <h3>Movie Review: {val.movieReview}</h3>
              </div>
              <div className="forms">
                <input
                  className="review"
                  type="text"
                  placeholder="edit movie review"
                  onChange={(event) => {
                    setNewReview(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateReview(val.id);
                  }}
                >
                  {" "}
                  Update Movie review
                </button>

                <button
                  onClick={() => {
                    deleteReview(val.id);
                  }}
                >
                  Delete Movie Review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
