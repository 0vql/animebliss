export default function GridCard({ title, image, height, width, episodeNum,test }) {
 
  return (
    <div
      className="gridcard-wrapper"
      style={{
        display: "flex",
        marginTop: "30px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          borderRadius: "15px",
          backgroundImage: `url(${image})`,
          height: height,
          width: width,

          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {episodeNum > 0 && (
        <h5 style={{ color: "white", fontWeight: "lighter" }}>
          Episode {episodeNum}
        </h5>
      )}

      <h4
        className="grid-card-title"
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "lighter",
          marginTop: 8,
        }}
      >
        {title}
      </h4>
    </div>
  );
}
