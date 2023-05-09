import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../auth/api';

/* 
    * This component is used to display images from the image pipeline.
    * The image pipeline is a service that takes in a club name and returns a list of image urls.
    * The image pipeline is used to display images on the home page.
    * The image pipeline is also used to display images on the club page.
    @param: none
    @return: a list of images as <img> tags in a react component
*/
function Image() {
    const [images, setImages] = useState([]);
    const club = "Test Elephant Club";
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await api.get(`${process.env.REACT_APP_SERVER_URL}/image_pipeline/get/${club}`);
                setImages(response.data.images);
            } catch (error) {
                console.error(error);
            }
        }
        fetchImages();
    }, []);

    return (
        <div>
            {images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Image ${index}`} />
            ))}
        </div>
    );
}

export default Image;