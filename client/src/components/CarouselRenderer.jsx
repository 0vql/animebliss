import Carousel from "react-elastic-carousel";

import { v4 as uuidv4 } from "uuid";
import CarouselCard from "./CarouselCard";
import { useState, useEffect } from "react";
import UpcomingCard from "./UpcomingCard";
export default function CarouselRenderer({
  finalQuery,
  rowTitle,
  isRecent,
  isUpcoming,
  stretchedA,
  type = "",
  initialActiveIndex,
  setIsPlaying,
  setTrailerId,
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const breakPoints = [
    { width: 1, itemsToShow: isUpcoming ? 2 : 3 },

    { width: 670, itemsToShow: isUpcoming ? 3 : 3 },

    { width: 950, itemsToShow: isUpcoming ? 3 : 3 },

    { width: 1200, itemsToShow: isUpcoming ? 4 : 4 },
    { width: 1673, itemsToShow: isUpcoming ? 4 : 7 },
  ];

  return (
    <div className="carouselinstance">
      <h1
        style={{
          color: "#fdba74",
          fontSize: "3rem",
          marginLeft: "21px",
          marginBottom: "5px",
        }}
      >
        {rowTitle}
      </h1>
      <Carousel
        initialActiveIndex={initialActiveIndex}
        enableTilt={true}
        enableAutoPlay={true}
        autoPlaySpeed={6000}
        pagination={windowSize < 800 ? false : true}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query, index) =>
          stretchedA ? (
            <CarouselCard
              title={query.title.english}
              image={query.image}
              key={uuidv4()}
              type={type}
              rating={query.rating}
              id={query.id}
              rowTitle={rowTitle}
              episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
            ></CarouselCard>
          ) : (
            <UpcomingCard
              setTrailerId={setTrailerId}
              setIsPlaying={setIsPlaying}
              title={query.title}
              image={query.images.jpg.large_image_url}
              key={uuidv4()}
              rowTitle={rowTitle}
              episodeNum={isRecent ? query.episode : 0}
              trailerVideoId={
                query.trailer !== null ? query.trailer.youtube_id : 0
              }
            ></UpcomingCard>
          )
        )}
      </Carousel>
    </div>
  );
}
