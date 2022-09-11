import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextTruncate from "react-text-truncate";
import { SharedState } from "../App";
export default function HeaderCarouselCard({
  duration,
  cover,
  title,
  id,
  year,
  description,
  epcount,
  coversmall,
}) {
  const animestate = useContext(SharedState);
  const override = {
    position: "fixed",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    margin: "auto",

    borderColor: "red",
  };
  const [videoIsLoading, setVideoIsLoading] = useState(false);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);

    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        animestate.onOpenModal();
        animestate.setVideoIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  let regexeddescription = description.replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "");
  regexeddescription = regexeddescription.substring(
    0,
    regexeddescription.indexOf("("),
    4
  );

  return (
    <>
      <div
        className="header-card"
        style={{
          background:
            windowSize > 800
              ? ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover}),center`
              : ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${coversmall}),center`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: /* windowSizne < 766 ? 330 :*/ 450,
        }}
      >
        <div
          className="anime-info-div"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h1
            className="anime-title"
            style={{
              fontSize: windowSize < 766 ? "2.5rem" : "4rem",
              color: "white",
            }}
          >
            {title !== "" && title}
          </h1>
          <div
            className="anime-info"
            style={{ color: "white", display: "flex", gap: "20px" }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: windowSize < 766 ? "1.4rem" : "",
              }}
            >
              {" "}
              <PlayCircleOutlined /> TV
            </p>

            <p
              style={{
                fontSize: windowSize < 766 ? "1.4rem" : "",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <FontAwesomeIcon icon={faListOl} /> {epcount} Episodes
            </p>
            <p
              style={{
                fontSize: windowSize < 766 ? "1.4rem" : "",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <ClockCircleOutlined /> {duration} Minutes
            </p>
            <p
              style={{
                fontSize: windowSize < 766 ? "1.4rem" : "",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <CalendarOutlined /> {year}
            </p>
          </div>
          <p
            className="anime-description"
            style={{
              textAlign: "justify",
              color: "white",
              fontSize: windowSize < 766 ? "1.4rem" : "",
              fontFamily: "'Inter', sans-serif",
              lineHeight: "1.5",
              width: windowSize < 766 ? "100%" : "50%",
            }}
          >
            {" "}
            <TextTruncate
              text={regexeddescription}
              line={windowSize < 766 ? 3 : 6}
            ></TextTruncate>
          </p>
        </div>
        <a
          onClick={(e) => {
            e.preventDefault();
            fetchVideo(id);
          }}
          className="btn btn-watchnow"
          href="/login"
        >
          {" "}
          <PlayCircleOutlined /> Watch Now
        </a>
      </div>
    </>
  );
}
