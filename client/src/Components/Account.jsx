import React, { Component } from 'react';
import './CSS/Account.css';
import axios from 'axios';
import Popup from "reactjs-popup";
import { ToastContainer, toast } from 'react-toastify';
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            userPreferences: [],
            genres: [],
            userPrefObject: {}
        }
    }
    componentDidMount = async () => {
        await this.getAllGenres()
        await this.getUserPreferences()
    }

    notify = (e) => {
        console.log(e.target.innerText)
        let genre = e.target.innerText
        toast.success(`${genre} was added to preferences.`)
    }

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
        let response = await axios.get(URL);
        let userPrefObject = {}

        let preferences = response.data.payload

        for (let genre of preferences) {
            userPrefObject[genre.name] = true
        }
        this.setState({
            userPreferences: preferences,
            userPrefObject: userPrefObject
        })
    }

    addToPreferences = async (genreId, genreName ) => {
        const { user } = this.state
        const URL = `/api/preferences/add/${user.id}/${genreId}`
        await axios.post(URL)
        toast.success(`${genreName} was added to preferences.`)
        await this.getUserPreferences()
    }

    deletePreference = async (genreId, genreName) => {
        const { user } = this.state
        const URL = `/api/preferences/delete/${user.id}/${genreId}`
        await axios.delete(URL)
        toast.error(`${genreName} was removed from preferences.`)
        await this.getUserPreferences()
    }


    clickPreference = (e) => {
        const { userPrefObject } = this.state
        let genreName = e.target.name
        let genreId = e.target.id
        let objCopy = { ...userPrefObject }
        let checked = objCopy[genreName]

        if (!checked) {
            objCopy[genreName] = true
            console.log('checked')
            this.addToPreferences(genreId, genreName)
        } else {
            objCopy[genreName] = false
            console.log('unchecked')
            this.deletePreference(genreId, genreName)
        }
        this.setState({
            userPrefObject: objCopy
        })
    }

    render() {
        const { user, genres, userPrefObject } = this.state

        let genreOptions = genres.map(genre => (
            <div className="gPreferences">
                <label className='whitesmokeColor'> {genre.name} </label>
                <input name={genre.name} type="checkbox" id={genre.id} checked={userPrefObject[genre.name]} onChange={this.clickPreference} />
            </div>
        ))
        return (
            <div>
                <h1>Account</h1>
                <div className='preferences'>
                    <p>username: {user?.name}</p>
                    <p>email: {user?.email}</p>
                    <h2>My Preferences</h2>
                    <div className='genre-container'>

                        <form className="updatePreferences">
                            {genreOptions}
                        </form>
                    </div>

                    {/* <Popup trigger={<button className="button"> Change Preferences </button>} modal closeOnDocumentClick>
                        <h2>Change Preferences</h2>
                        <div className='genre-container'> */}
                    {/* {genreComponents} */}
                    {/* </div>
                    </Popup> */}

                </div>
            </div>
        )
    }
}
export default Account;