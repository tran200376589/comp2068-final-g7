import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        Axios.get(`/api/superheroes/${props.match.params.id}`)
            .then(result => {
                setInputs({
                    realName: result.data.realName,
                    superheroName: result.data.superheroName,
                    age: result.data.age,
                    group: result.data.group
                });
            })
            .catch(err => console.error(err));
    }, [props]);

    function handleSubmit(event) {
        event.preventDefault();

        Axios.post(
            '/api/superheroes/update',
            {
                id: props.match.params.id,
                superhero: {
                    realName: inputs.realName,
                    superheroName: inputs.superheroName,
                    age: inputs.age,
                    group: inputs.group
                }
            }
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
                <h1>Edit Superhero Post</h1>
            </header>
            <div>
                <form action="/superheroes" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Real Name</label>
                        <input className="form-control" name="realName" required="required" onChange={handleInputChange} defaultValue={inputs.realName} />
                    </div>

                    <div className="form-group">
                        <label>Superhero Name</label>
                        <textarea className="form-control" name="superheroName" onChange={handleInputChange} value={inputs.superheroName} />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" name="age" required="required" onChange={handleInputChange} defaultValue={inputs.age} />                    </div>

                    <div className="form-group">
                        <label>Group</label>
                        <select className="form-control" name="group" required="required" onChange={handleInputChange}>
                            <option value="X-MEN">X-MEN</option>
                            <option value="FANTASTIC FOUR">FANTASTIC FOUR</option>
                            <option value="X-FORCE">X-FORCE</option>
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

export default Edit;