import { useContext } from "react";
// @ts-ignore
import TextTruncate from "react-text-truncate";
// @ts-ignore

import { SharedState } from "../../App.jsx";
import './GridCard.jsx'
import { useNavigate } from "react-router-dom";
import "./CarouselCard.css";
import React from 'react';
type CardInfo = {
  title: string,
  image: string,
  episodeNumber: number,
  id: string,
}
const CarouselCard = ({ title, image, episodeNumber, id }: CardInfo) => {
  const navigate = useNavigate();
  const animestate = useContext(SharedState);
  async function fetchVideo(id: string) {
    // @ts-ignore
    animestate.setVideoIsLoading(true);
    navigate("/watch/" + id);
  }
  return (
    <>
      <div
        onClick={() => {
          fetchVideo(id);
        }}
        className="animecard-wrapper"
      >
        <div
          className="animecard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        {episodeNumber > 0 && (
          <h5 className="epnumber">Episode {episodeNumber}</h5>
        )}
        <a href={`/watch/${id}`} className="animecard-title">
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
};
export default CarouselCard;
