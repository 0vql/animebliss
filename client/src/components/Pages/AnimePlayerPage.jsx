import "./AnimePlayerPage.css";
import ScrollToTop from "react-scroll-to-top";
import AnimePlayer from "../Players/AnimePlayer";
import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import ReccomendCarousel from "../Layouts/ReccomendCarousel";
import {
  StarFilled,
  CalendarOutlined,
  OrderedListOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { SharedState } from "../../App";
import axios from "axios";
import VerticalCarousel from "../Layouts/VerticalCarousel";
import Navbar from "../Sections/Navbar";
import AnimeSection from "../Sections/AnimeSection";
const AnimePlayerPage = () => {
  const animestate = useContext(SharedState);
  animestate.setVideoIsLoading(true);
  const { id } = useParams();
  const [adaptation, setAdaptation] = useState(null);
  const [description, setDescription] = useState(null);
  const [anime, setAnime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const epArray = [];
  const [ep, setEp] = useState(null);
  useEffect(() => {
    initialFetch();
  }, [id]);
  const initialFetch = async () => {
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        setAnime(res.data);
        setCurrentId(res.data.episodes[selectedOption - 1].id);
        for (let i = 1; i <= res.data.episodes.length; i++) {
          epArray.push(i);
        }
        setEp(epArray);
        let adaptation = "";
        for (let i = 0; i < res.data.relations.length; i++) {
          if (res.data.relations[i].relationType === "ADAPTATION") {
            adaptation =
              res.data.relations[i].title.english ||
              res.data.relations[i].title.romaji;
          }
        }
        setAdaptation(adaptation);
        let regexeddescription = res.data.description.replaceAll(
          /<\/?[\w\s]*>|<.+[\W]>/g,
          ""
        );
        setDescription(
          regexeddescription.substring(0, regexeddescription.indexOf("("), 4)
        );
      });
  };
  async function fetchVideoById(url) {
    return await axios.get(url).then((response) => {
      setCurrentStreamUrl([
        response.data.sources[0].url,
        response.data.sources[1].url,
      ]);
    });
  }
  useEffect(() => {
    if (currentId !== "")
      fetchVideoById(
        " https://consumet-api.herokuapp.com/meta/anilist/watch/" + currentId
      );
  }, [currentId]);
  useEffect(() => {
    if (anime) setCurrentId(anime.episodes[selectedOption - 1].id);
  }, [selectedOption, anime]);
  return (
    <>
      <Navbar></Navbar>
      {currentStreamUrl !== null && anime && (
        <>
          <div className="animeplayer-container">
            {animestate.setVideoIsLoading(false)}
            <div className="vime-container">
              <AnimePlayer
                animeInfoUrl={
                  " https://consumet-api.herokuapp.com/meta/anilist/watch/" +
                  currentId
                }
                src={currentStreamUrl}
              ></AnimePlayer>
            </div>
            <div className="curranime">
              <h2 className="anime-title">{anime.title.english}</h2>
              <h4 style={{ color: "#FC4747" }}>
                <span className="curranime-genres">
                  {anime.genres.join(" • ")}
                </span>
              </h4>
              <div className="curranimeinfo" style={{ marginTop: 10 }}>
                <span className="curranime-platform">
                  <PlayCircleOutlined /> TV Show
                </span>
                <span className="curranime-score">
                  Rating: <StarFilled style={{ color: "yellow" }} />{" "}
                  {anime.rating / 10}
                </span>
                <span className="curranime-epaired">
                  <OrderedListOutlined /> Total Ep: {anime.episodes.length}
                </span>
                <span className="curranime-releaseyear">
                  <CalendarOutlined /> {anime.releaseDate}
                </span>
              </div>
              <form style={{ marginTop: 15 }}>
                <div className="contindex">
                  {ep.map((ep, index) => {
                    return (
                      <div
                        key={uuidv4()}
                        className="epindex"
                        style={{
                          backgroundColor:
                            selectedOption === String(ep) ? "red" : "#8230c6",
                        }}
                        onClick={(e) => {
                          setSelectedOption(e.target.innerText);
                        }}
                      >
                        {ep}
                      </div>
                    );
                  })}
                </div>
              </form>
              <div className="sharewatchlistcontainer">
                <div className="share">
                  <svg
                    height={26}
                    width={26}
                    fill="white"
                    viewBox="0 0 448 512"
                  >
                    <path d="M448 127.1c0 53.9-43 96-96 96-25.9 0-49.4-9.3-66.6-26l-94.1 47c.5 3.9-.2 7-.2 11.9 0 4 .7 7.1.2 11.9l94.1 47c17.2-16.7 40.7-26.9 66.6-26.9 53 0 96 42.1 96 96 0 53-43 96-96 96-53.9 0-96-43-96-96 0-4.9.2-8 .7-11.9l-94.1-47C145.4 341.8 121.9 352 96 352c-53.02 0-96-43-96-96 0-53.9 42.98-96 96-96 25.9 0 49.4 10.2 66.6 26.9l94.1-47c-.5-4.8-.7-7.9-.7-11.9 0-53.02 42.1-96 96-96 53 0 96 42.98 96 96v-.9zm-352.9 160c18.6 0 32-13.4 32-32 0-16.8-13.4-32-32-32-16.77 0-32 15.2-32 32 0 18.6 15.23 32 32 32zM352 95.1c-17.7 0-32 15.2-32 32 0 18.6 14.3 32 32 32s32-13.4 32-32c0-16.8-14.3-32-32-32zm0 320.9c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"></path>
                  </svg>
                  <span>Share</span>
                </div>
                <div className="watchlist">
                  <FontAwesomeIcon
                    size="xl"
                    color="white"
                    icon={faFileCirclePlus}
                  ></FontAwesomeIcon>
                  <span>Watchlist</span>
                </div>
              </div>
              <h3 className="summary-title">Synopsis</h3>
              <p className="summary-content">
                <TextTruncate
                  text={description}
                  line={window.innerWidth < 800 ? 4 : 8}
                ></TextTruncate>
              </p>
              <br />
              <div className="additional-anime-info">
                <h4 style={{ color: "white" }}>
                  Studios:&nbsp;
                  <span className="curranime-studios">
                    {anime.studios.join(", ")}
                  </span>
                </h4>
                {adaptation !== "" && (
                  <h4 style={{ color: "white" }}>
                    Adapation:&nbsp;
                    <span className="curranime-adaptation">{adaptation}</span>
                  </h4>
                )}
                <h4 style={{ color: "white" }}>
                  Status:&nbsp;
                  <span className="curranime-status">{anime.status}</span>
                </h4>
              </div>
              <br />
            </div>
            <div>
              <VerticalCarousel
                rowTitle={"More Like This"}
                finalQuery={anime.recommendations}
              ></VerticalCarousel>
            </div>
          </div>
          {anime.recommendations && (
            <ReccomendCarousel
              rowTitle="Recommendations"
              finalQuery={anime.recommendations}
            ></ReccomendCarousel>
          )}
          <AnimeSection
            url={"https://consumet-api.herokuapp.com/meta/anilist/trending"}
            id={"trending"}
            sectiontitle={"Trending"}
          ></AnimeSection>
        </>
      )}
      <ScrollToTop
        style={{
          border: "1px solid dodgerblue",
          background: "rgb(33, 33, 33)",
          color: "white",
          boxShadow: "none",
        }}
        className="scrolltop"
        top={1500}
        smooth
        color="#fff"
      />
    </>
  );
};
export default AnimePlayerPage;
