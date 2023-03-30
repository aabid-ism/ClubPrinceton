import './admin.css';
import Form from './Form';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminInterface() {
    const [clubs, setClubs] = useState([]);
    const [activeClub, setActiveClub] = useState();
    const url = "http://localhost:5050/clubs/admin";

    // at start time, get a list of clubs that the user is an admin for
    useEffect(() => {
        // TODO: get username from loggedin cookies or wtvr
        const username = "ai4295"
        // get clubs
        axios.get(`${url}/${username}`).then((response) => {
            const data = response.data;
            console.log(data);
            setClubs(data);
        })
            .catch((error) => {
                console.log("Error occurred: ", error);
            });
    },
        []);
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar clubs={clubs} setActiveClub={setActiveClub} />
            <main>
                <div>
                    {/* <div style={{width: "18rem"}}>
                <img src={myImage} />
            </div> */}
                    <Form activeClub={activeClub} />
                </div>

            </main>
        </div>

    )
}

export default AdminInterface;