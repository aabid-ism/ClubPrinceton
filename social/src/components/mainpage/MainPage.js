import { Container } from 'react-bootstrap';
import './MainBubble.css'

import { useSelector } from "react-redux";


/* Main bubble for the website
  @param - none
  @return - main bubble
*/
export default function MainBubble(props) {
  const clubData = useSelector((state) => state.clubData);
  return (
    <Container fluid className='main-bubble'>
        <h1>{clubData.name}</h1>
        <p>{clubData.description}</p>
    </Container>
  );
}
