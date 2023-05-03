import logo from "./triangle logo.png";
import { useSelector } from "react-redux";

function InfoPanel() {
  const clubData = useSelector((state) => state.clubData);
  const infoPanelStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: "1.5rem",
  };

  const infoNodeStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem",
    color: "#000",
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const logoStyle = {
    padding: "0.5rem",
  };

  return (
    <div style={infoPanelStyle}>
      {/* <div style={logoStyle}>
        <img src={logo} alt="" />
      </div> */}
      <div style={infoNodeStyle}>
        <div>Followers</div>
        <div>{clubData.stats.Followers}</div>
      </div>
      <div style={infoNodeStyle}>
        <div>Likes</div>
        <div>{clubData.stats.Likes}</div>
      </div>
    </div>
  );
}

function ClubDescription() {
  const clubData = useSelector((state) => state.clubData);
  const clubDescriptionStyle = {
    color: "#000",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0.75rem",
  };

  const randomTest = "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend, magna id finibus congue, velit tellus convallis tortor, a venenatis ex quam in tellus. Fusce dapibus elit euismod justo pulvinar, eu mattis arcu bibendum. Nulla facilisi. Sed vel lectus.";

  return (
    <div style={clubDescriptionStyle}>
      <p>{clubData.description}</p>
    </div>
  );
}

export default function MainBubble(props) {
  const divStyle = {
    backgroundColor: "#FFE4CC",
    margin: "0 auto",
    width: `${props.width}`,
    height: `${props.height}`,
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "3px",
  };

  const innerDivStyle = {
    display: "flex",
    flexDirection: "column",
    borderBottom: "2px solid #C05621",
    padding: "3px",
  };
  const clubData = useSelector((state) => state.clubData);
  return (
    <div style={divStyle}>
      <div style={innerDivStyle}>
        <InfoPanel></InfoPanel>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{clubData.name}</h1>
        <ClubDescription />
      </div>
    </div>
  );
}
