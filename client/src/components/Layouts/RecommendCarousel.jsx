import CarouselRenderer from "./CarouselRenderer";
const RecommendCarousel = ({ finalQuery, rowTitle }) => {
  return (
    <>
      <CarouselRenderer
        finalQuery={finalQuery}
        stretchedA={true}
        rowTitle={rowTitle}
      ></CarouselRenderer>
    </>
  );
};

export default RecommendCarousel;
