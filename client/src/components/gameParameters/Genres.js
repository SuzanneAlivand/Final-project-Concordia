import styled from "styled-components";

const Genres = ({ geners }) => {
  return (
    <div>
      <span style={{ color: "var(--color-secondary)" }}>Genres: </span>
      {geners?.map((genre) => {
        return <span key={genre.name}>{genre.name + ". "}</span>;
      })}
    </div>
  );
};

export default Genres;
