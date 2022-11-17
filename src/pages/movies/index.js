import React, { useEffect, useState } from "react";
import moviesApi from "../../services/moviesApi";
import Header from "./Header";
import Button from "@mui/material/Button";
// import ModalComponent from '../movies/ModalComponent';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../../index.css";
import Grid from "@mui/material/Grid";
// import { alignProperty } from "@mui/material/styles/cssUtils";

const Index = () => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  // const handleModalOpen = (_selectedMovie) => {
  //   setSelectedMovie(_selectedMovie);
  // };
  // const handleModalClose = () => {
  //   setSelectedMovie(null);
  // };

  // <Modal open={selectedMovie} onClose={handleModalClose}>
  //   Movie content
  // </Modal>;

  const [navigateOptions, setNavigateOptions] = useState({
    next: null,
    previous: null,
    count: null,
  });

  console.log("navigate", navigateOptions);

  const handlePrevious = () => {
    const param = navigateOptions.previous.split("?")[1];
    getMovieList(param);
  };

  const handleNext = () => {
    const param = navigateOptions.next.split("?")[1];
    getMovieList(param);
  };

  // const [open, setOpen] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpen = (selected) => {
    setSelectedMovie(selected);
  };
  const handleClose = () => setSelectedMovie(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getMovieList = async (param) => {
    const response = await moviesApi.getMovies(param);
    console.log("zxxxx", response);
    if (response.success) {
      setMovieList(response.data.results);
      setNavigateOptions({
        ...navigateOptions,
        next: response.data.next,
        previous: response.data.previous,
        count: response.data.count,
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Header />
      {error && (
        <div>
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            onClick={getMovieList}
            sx={{ mt:2 }}
          >
            Refresh
          </Button>
        </div>
      )}
      {movieList?.map((movie) => {
        return (
          <Card
            sx={{ minWidth: 275, ml: 7, mt: 20, boxShadow: 1, }}
            onClick={() => {
              handleOpen(movie);
            }}
            key={movie.uuid}
            style={{
              maxHeight: 200,
              width: 200,
              margin: 20,
              overflowY: "scroll",
            }}
          >
            <CardContent sx={{ width: "80%" }}>
              <img
                src={`https://ui-avatars.com/api/?name=${movie.title
                  .split(" ")
                  .join("+")}`}
                alt={movie.title}
              ></img>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <b>Title:</b> {movie.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <b>Genre:</b> {movie.genres}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <b>Description:</b> {movie.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      <Grid sx={{ mt: 30 }}>
        <Button
          color="primary"
          size="large"
          variant="contained"
          type="submit"
          onClick={handlePrevious}
          disabled={!navigateOptions.previous}
        >
          Previous
        </Button>
        <Button
        sx={{ ml: 2 }}
          color="primary"
          size="large"
          variant="contained"
          type="submit"
          onClick={handleNext}
          disabled={!navigateOptions.next}
        >
          Next
        </Button>
      </Grid>
      {selectedMovie && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={selectedMovie}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={selectedMovie}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${selectedMovie.title
                    .split(" ")
                    .join("+")}`}
                  alt={selectedMovie.title}
                ></img>
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {selectedMovie.title}
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {selectedMovie.genres}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedMovie.description}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default Index;
