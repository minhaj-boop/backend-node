import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);


    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email };
        setUser(updatedUser);
    }
    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        // const updatedUser = { name: user.name, email: updatedEmail };
        // setUser(updatedUser);
        const updatedUser = { ...user };
        updatedUser.email = updatedEmail;
        setUser(updatedUser);
    }
    const handleOnSubmit = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    alert('Updated successfully!');
                    setUser({});
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <h2>Update {user.name}</h2>
            <p><small>ID: {id}</small></p>
            <form onSubmit={handleOnSubmit}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default UpdateUser;