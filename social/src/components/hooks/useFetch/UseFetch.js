import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogle = async (response) => {
        setLoading(true);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential: response.credential }),
        })
            .then((res) => {
                setLoading(false);
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data?.user.firstName));
                    localStorage.setItem("jwt", JSON.stringify(data?.user.token));
                    window.location.reload();
                }
                throw new Error(data?.message || data);
            })
            .then(() => {
                console.log("hi");
                navigate("/");
            })
            .catch((error) => {
                setError(error?.message);
            });
    };

    return { loading, error, handleGoogle };
};

export default useFetch;