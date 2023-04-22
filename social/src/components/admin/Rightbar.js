import React from 'react'
import {
    useState
} from 'react';
const Rightbar = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Announcement');

    function handleButtonClick() {
        setIsEditing(true);
    }

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleInputBlur() {
        setIsEditing(false);
    }

    const handleRemoveOfficer = (e) => {
        // remove officer from the database
        // then => remove from the UI
    }
    const handleAddOfficer = (e) => {
        // add officer from the database
        // then => add to the Officers array
    }

    // TODO: get From Mongodb
    const Officers = [{
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }, {
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }, {
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }, {
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }, {
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }, {
        Position: "President",
        Name: "Aabid Ismail"
    }, {
        Position: "Secretary",
        Name: "Nipuna Ginige"
    }]

    return (
        <div className='rightbar'>
            <div className='announcement'>

                {/* Officers List */}
                {Officers.map((officer, index) => (
                    < div key={index} className='listrow' >
                        <p> {officer.Position}</p>
                        <p> {officer.Name}</p>
                        <button onClick={handleRemoveOfficer}>Remove</button>
                    </div>

                ))
                }

                {/* Add Button */}
                <button onClick={handleAddOfficer}> ADD OFFICER</button>
            </div >
        </div >
    )
}

export default Rightbar