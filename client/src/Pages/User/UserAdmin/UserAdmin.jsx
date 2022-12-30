import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import { Link, } from 'react-router-dom'

const UserAdmin = () => {
    let [users, setUsers] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    let fetchData = () => {
        Axios.get("https://cute-hare-attire.cyclic.app/user/")
            .then((response) => {
                setUsers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    let deleteHandler = (userId) => {
        let url = `https://cute-hare-attire.cyclic.app/user/${userId}`
        Axios.delete(url)
            .then(() => {
                console.log("User detail deleted successfully...");
                fetchData()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return <>
        <table className='table table-dark text-white text-center mt-5'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Image</th>
                    <th>Modify</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                        return <tr key={user._id}>
                            <td >{(user._id).slice(20, 24)}</td>
                            <td>{user.name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td><img src={user.image} height="70px" alt="" /></td>
                            <td>
                                <Link to={`/editForm/${user._id}`} className="btn btn-success">Edit</Link>
                                <Link onClick={deleteHandler.bind(this, user._id)} className="btn btn-warning">Delete</Link>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}

export default UserAdmin