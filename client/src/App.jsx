import Login from "./components/Pages/Login";
import "./App.css";
import GenresPage from "./components/Pages/GenresPage";
import Home from "./components/Pages/Home";
import MoreSection from "./components/Sections/MoreSection";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClockLoader from "react-spinners/MoonLoader";
import AnimePlayerPage from "./components/Pages/AnimePlayerPage";
import MoviesPage from "./components/Pages/MoviesPage";
import RecentPage from "./components/Pages/RecentPage";
import SearchResults from "./components/Pages/SearchResults";
import FilteredPage from "./components/Pages/FilteredPage";
import Signup from "./components/Pages/Signup";
export const SharedState = React.createContext();
const App = () => {
  const [videoIsLoading, setVideoIsLoading] = useState(false);
  const override = {
    position: "fixed",
    zIndex: 800000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "red",
  };
  return (
    <SharedState.Provider
      value={{
        videoIsLoading,
        setVideoIsLoading,
      }}
    >
      <div className="App">
        {videoIsLoading && (
          <ClockLoader
            className="spinner"
            color={"white"}
            loading={videoIsLoading}
            cssOverride={override}
            size={35}
          />
        )}
        <BrowserRouter>
          <>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/recentep"
                element={<RecentPage></RecentPage>}
              />
              <Route exact path="/filter" element={<GenresPage />} />
              <Route
                exact
                path="/more/:section"
                element={<MoreSection></MoreSection>}
              />
              <Route exact path="/watch/:id" element={<AnimePlayerPage />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/movies"
                element={
                  <MoviesPage
                    setVideoIsLoading={setVideoIsLoading}
                  ></MoviesPage>
                }
              />
              <Route
                exact
                path="/filtered/:type/:value"
                element={<FilteredPage></FilteredPage>}
              />
              <Route exact path="/search" element={<SearchResults />} />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    </SharedState.Provider>
  );
};
export default App;
