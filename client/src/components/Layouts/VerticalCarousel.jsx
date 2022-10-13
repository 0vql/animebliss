import { v4 as uuidv4 } from "uuid";
import CarouselCard from "../Cards/CarouselCard";
const VerticalCarousel = ({ finalQuery, rowTitle }) => {
  return (
    <div className="vertical-grid-container">
      <h1 className="row-title" style={{ marginLeft: "1%", color: "#D8D8D8" }}>
        {rowTitle}
      </h1>
      <div className="vertical-grid">
        {finalQuery.map((query, index) => (
          <CarouselCard
            key={uuidv4()}
            title={query.title.english}
            image={query.image}
            rating={query.rating}
            id={query.id}
            rowTitle={rowTitle}
          ></CarouselCard>
        ))}
      </div>
    </div>
  );
};
export default VerticalCarousel;
