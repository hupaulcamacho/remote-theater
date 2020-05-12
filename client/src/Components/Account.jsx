import React, { Component } from 'react';
import './CSS/Account.css';
import axios from 'axios';
import Popup from "reactjs-popup";

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            userPreferences: null,
            genres: null
        }
    }

    componentDidMount = async () => {
        await this.getAllGenres()
        await this.getUserPreferences()
    }

    // loadUserInfo = async () => {
    //     let { user } = this.state
    //     const URL = `http://localhost:3001/api/users/${user.id}`
    //     let user = await axios.get(URL);
    //     console.log(user.data.payload)
    //     this.setState({
    //         user: user.data.payload[0]
    //     })
    // }

    getAllGenres = async () => {
        const URL = `/api/genres`
        let genres = await axios.get(URL);
        this.setState({
            genres: genres.data.payload
        });
    }

    getUserPreferences = async () => {
        const { user } = this.state
        const URL = `/api/preferences/id/${user.id}`
        let preferences = await axios.get(URL);
        console.log(preferences.data.payload)
        this.setState({
            userPreferences: preferences.data.payload
        })
    }

    addToPreferences = async (e) => {
        const { user } = this.state
        const genreId = e.target.id
        console.log(genreId)
        
        const URL = `/api/preferences/add/${user.id}/${genreId}`
        axios.post(URL)
        await this.getUserPreferences()
    }

    deleteFromPreferences = (e) => {

    }

    render() {
        const { user, genres, userPreferences } = this.state
        const userPreferenceComponents = [];
        const genreComponents = [];
        for (let i = 0; i < genres?.length; i ++) {
            console.log(genres[i].name)
            genreComponents.push(
                <p onClick={this.addToPreferences} className='genre' id={genres[i].id}>{genres[i].name}</p>
            )
        }

        for (let i = 0; i < userPreferences?.length; i ++) {
            console.log(userPreferences[i].name)
            userPreferenceComponents.push(
                <p className='genre' id={userPreferences[i].id}>{userPreferences[i].name}</p>
            )
        }
        return (
            <div>
                <h1>Account</h1>
                <div className='preferences'>
                    <p>username: {user?.name}</p>
                    <p>email: {user?.email}</p>
                    <h2>My Preferences</h2>
                    <div className='genre-container'>
                        {userPreferenceComponents}
                    </div>

                    <Popup trigger={<button className="button"> Change Preferences </button>} modal closeOnDocumentClick>
                        <h2>Change Preferences</h2>
                        <div className='genre-container'>
                            {genreComponents}
                        </div>
                    </Popup>
                </div>
            </div>
        )
    }
}

export default Account;
