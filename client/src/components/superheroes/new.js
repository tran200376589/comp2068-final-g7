import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        Axios.post(
            '/api/superheroes',
            inputs
        )
            .then(resp => {
                console.log(resp);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleInputChange(event) {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;

        setInputs(inputs => {
            // Below is a shallow merge. It takes the original inputs value and merges in the new object key and value using the spread operator
            return {
                ...inputs, [name]: value
            }
        });
    }

    if (redirect) {
        return <Redirect to="/superheroes" />;
    }

    return (
        <div className="container">
            <header>
                <h1>New Superhero Post</h1>
            </header>
            <div>
                <form action="/blogs" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Real Name</label>
                        <input className="form-control" name="realName" required="required" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Superhero Name</label>
                        <textarea className="form-control" name="superheroName" onChange={handleInputChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" name="age" required="required" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Group</label>

                        <select className="form-control" name="group" required="required" onChange={handleInputChange}>
                            <option value="X-MEN">x-men</option>
                            <option value="FANTASTIC FOUR">fantasticfour</option>
                            <option value="X-FORCE">x-force</option>
                            <option value="THE AVENGERS">THE AVENGERS</option>
                            <option value="THE ETERNALS">THE ETERNALS</option>
                            <option value="THE DEFENDERS">THE DEFENDERS</option>
                        </select>    
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default New;