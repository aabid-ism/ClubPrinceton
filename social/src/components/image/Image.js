import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../auth/api';

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