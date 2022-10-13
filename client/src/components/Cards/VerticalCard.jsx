import { useContext } from "react";
import TextTruncate from "react-text-truncate";
import { SharedState } from "../../App.jsx";
import "./GridCard.jsx";
import { useNavigate } from "react-router-dom";
import "./VerticalCard.css";
import React from "react";
const CarouselCard = ({ title, image, episodeNumber, id }) => {
  const navigate = useNavigate();
  const animestate = useContext(SharedState);
  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    navigate("/watch/" + id);
  }
  return (
    <>
      <div
        onClick={() => {
          fetchVideo(id);
        }}
        className="vertcard-wrapper"
      >
        <div
          className="vertcard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        {episodeNumber > 0 && (
          <h5 className="epnumber">Episode {episodeNumber}</h5>
        )}
        <a href={`/watch/${id}`} className="vertcard-title">
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
};
export default CarouselCard;
