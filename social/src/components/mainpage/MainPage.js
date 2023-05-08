import { Container } from 'react-bootstrap';
import './MainBubble.css'

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
  // should be refactored later to remove inline
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
    <div >
      <p>{clubData.description}</p>
    </div>
  );
}

export default function MainBubble(props) {
  const clubData = useSelector((state) => state.clubData);
  return (
    <Container fluid className='main-bubble'>
        <h1>{clubData.name}</h1>
        <p>{clubData.description}</p>
    </Container>
  );
}
