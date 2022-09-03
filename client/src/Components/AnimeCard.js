import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AnimeCard({
  title,
  image,
  stretchedA,
  stretchedB,
  episodeNum,
}) {
  return (
    <div
      className="animecard-wrapper"
      style={{
        padding: "50px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "50px",

          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          height: stretchedA ? "340px" : "230px",
          width: stretchedA ? "230px" : "430px",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {episodeNum > 0 && (
        <h5 style={{ color: "white", fontWeight: "lighter" }}>
          Episode {episodeNum}
        </h5>
      )}


      <h3 style={{ color: "white", fontWeight: "lighter" }}>{title}</h3>
    </div>
  );
}
