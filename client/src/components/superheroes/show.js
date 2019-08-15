import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
    const [superhero, setSuperhero] = useState([]);

    useEffect(() => {
        Axios.get(`/api/superheroes/${props.match.params.id}`)
            .then(result => {
                console.log(result);
                setSuperhero(result.data);
            })
            .catch(err => console.error(err));
    }, [props]);

    return (
        <div className="container">
            <header>
                <h1>{superhero && superhero.realName}</h1>
            </header>

            <div>
                {superhero && superhero.superheroName}
            </div>
        </div>
    );
}

export default Show;