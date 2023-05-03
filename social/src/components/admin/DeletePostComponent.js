import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import "./admin.css";
import api
    from '../auth/api';




function formatDateTime(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
}
const DeletePostComponent = ({ state }) => {

    const [posts, setPosts] = useState([]);
    const [justDeleted, setJustDeleted] = useState(false);
    // get all the posts list
    useEffect(() => {
        api.get(`/posts/allposts/${state.activeClub}`)
            .then((res) => {
                setPosts(res.data);
                setJustDeleted(false);
            })
    }, [state.activeClub, justDeleted]);

    function deletePost(objectid) {
        api.post(`/posts/delete/${state.activeClub}/${objectid}`)
            .then(() => {
                setJustDeleted(true);
            })

    }
    return (
        <Container fluid="md">

            {/* build a row for each post */}

            {/* {posts.map((post) => {
                return (
                    <Row key={post.id}>
                        {post.title}
                    </Row>
                );
            })} */}
            <div>
            <h3>Delete Previous Posts</h3>
            {posts?.map((post, index) => (
                <div className='post-name'>
                <Row key={post.id}>
                    <span>{post.title}</span>
                    <span>{formatDateTime(post.created_at)}</span>
                    <span className='delete-post-button'><Button onClick={() => { deletePost(post._id) }}>Delete</Button></span>
                </Row>
                <br></br>
                </div>

            ))}
            </div>
            {/* <Row>
                <Col>1 of 1</Col>
            </Row> */}
        </Container>
    )
}

export default DeletePostComponent