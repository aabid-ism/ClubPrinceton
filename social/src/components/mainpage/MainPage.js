import logo from "./triangle logo.png";
import { useSelector } from "react-redux";

function Button({ value }) {
  const buttonStyle = {
    color: "#ffc107",
    padding: "0.25rem 1.25rem",
    border: "2px solid #ffc107",
    borderRadius: "0.5rem",
    ":hover": {
      backgroundColor: "#ffe082",
    },
  };
  return <button style={buttonStyle}>{value}</button>;
}

function ReachOut() {
  const reachOutStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "0.75rem",
  };

  const dividerStyle = {
    borderLeft: "2px solid #ffc107",
    height: "1.5rem",
    marginLeft: "0.75rem",
    marginRight: "0.75rem",
  };

  const buttonStyle = {
    color: "#ffc107",
    padding: "0.25rem 1.25rem",
    border: "2px solid #ffc107",
    borderRadius: "0.5rem",
    ":hover": {
      backgroundColor: "#ffe082",
    },
  };

  return (
    <div style={reachOutStyle}>
      <div style={buttonStyle}>
        <Button value={"Follow"} />
      </div>
      <div style={dividerStyle}></div>
      <div style={buttonStyle}>
        <Button value={"Contact"} />
      </div>
      <div style={dividerStyle}></div>
      <div style={buttonStyle}>
        <Button value={"Apply"} />
      </div>
    </div>
  );
}

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
      <div style={logoStyle}>
        <img src={logo} alt="" />
      </div>
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

function InfoNode({ fieldName, fieldValue }) {
  const infoNodeStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem",
    color: "#000",
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <div style={infoNodeStyle}>
      <div>{fieldName}</div>
      <div>{fieldValue}</div>
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
    width: `${props.width}px`,
    height: `${props.height}px`,
    borderRadius: "10px",
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
        <ReachOut></ReachOut>
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
