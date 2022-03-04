import React, { useEffect, useState } from 'react';
import './searchbar.css';
import { Search } from '@material-ui/icons';
import axios from "axios";
import { Link } from 'react-router-dom';


const Searchbar = () => {
    const [ query, setQuery ] = useState('');
    const [ search, setSearch ] = useState(false);
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const searchUsers = async () => {
            try {
                const res = await axios.get('/users/search');
                setUsers(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        searchUsers();
    }, [])

    
    return (
        <div className='search'>
            <div className="searchbar">
                <Search className='searchIcon'/>
                <input 
                    onChange={(e) => {setQuery(e.target.value); setSearch(true)}}
                    // onBlur={(e) => setSearch(false)}
                    type='text'
                    placeholder='Search for friends, posts and more' 
                    className="searchInput" 
                    />
            </div>
            <div className="listWrapper" style={ search ? {display:'flex'} : {display: 'none'}}>
                <ul className="list">
                    {users.filter((u) => 
                       u.username.toLowerCase().includes(query)
                     ).map((u) => (
                        <Link to={'/profile/' + u.username} style={{textDecoration: 'none'}} key={u._id}>
                        <li key={u.id} className="listItem">{u.username}</li>
                        </Link>
                        ))}
                </ul>
                <span className="closeSearch" onClick={(e) => setSearch(false)}>X</span>
            </div>
      </div>
    );
};

export default Searchbar;