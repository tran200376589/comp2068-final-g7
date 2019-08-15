import React, { useState, useEffect } from "react";
import Axios from "axios";

function Index() {
    const [superheroes, setSuperheroes] = useState([]);

    useEffect(() => {
        Axios.get('/api/superheroes')
            .then(result => {
                setSuperheroes(result.data);
            })
            .catch(err => console.error(err));
    });
    return (
        <div className="container">
            <header>
                <h1>All Superheroes</h1>
            </header>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Real Name</th>
                            <th>Superhero Name </th>
                            <th>Age</th>
                            <th>Group</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {superheroes.map(superhero => (
                            <tr key={superhero._id}>


                                <td><a href={`/superheroes/${superhero._id}`}>{superhero.realName}</a></td>
                                <td>{superhero.superheroName}</td>
                                <td>{superhero.age && superhero.age} </td>
                                <td>{superhero.group && superhero.group} </td>
                                <td></td>
                            </tr>
                        ))}


                       



                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;