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
            userPreferences: null,
            genres: null,
            message: '', 
            checkBox: false
        }
    }

    componentDidMount = async () => {
        await this.getAllGenres()
        await this.getUserPreferences()
    }

    // notify = (e) => {
    //     console.log(e.target.innerText)
    //     let genre = e.target.innerText
    //     toast.success(`${genre} was added to preferences.`)
    // }
    

    getAllGenres = async () => {
        const URL = `/api/genres`
        let genres = await axios.get(URL);
        this.setState({
            genres: genres.data.payload
        });
    }

    getUserPreferences = async () => {
        // let userId = await sessionStorage.getItem('currentUserid')
        const { user } = this.state
        console.log(this.state)
        const URL = `/api/preferences/id/${user.id}`
        let preferences = await axios.get(URL);
        console.log("here", preferences.data.payload)
        this.setState({
            userPreferences: preferences.data.payload
        })
    }

    addToPreferences = async (e) => {
        const { user } = this.state
        const genreId = e.target.id
        console.log(genreId)
        let genre = e.target.innerText
        
        const URL = `/api/preferences/add/${user.id}/${genreId}`
        await axios.post(URL)

        // toast.success(`${genre} was added to preferences.`)
        // this.getUserPreferences()
    }

    deletePreference = async (e) => {
        const { user } = this.state
        const genreId = e.target.id

        const URL = `/api/preferences/delete/${user.id}/${genreId}`
        let genre = e.target.innerText
        await axios.delete(URL)

        // toast.error(`${genre} was removed from preferences.`)
        // await this.getUserPreferences()
    }


clickPreference = async (e) => {
    const { checkBox } = this.state
    console.log("here")
    if(checkBox.checked){
        this.setState({ checkBox: true})
        console.log('checked')
        this.addToPreferences()
    }
}
    render() {
        const { user, genres, userPreferences } = this.state
        const userPreferenceComponents = [];
        const genreComponents = [];

        for (let i = 0; i < genres?.length; i ++) {
            genreComponents.push(
                <p onClick={this.addToPreferences} className='genre' id={genres[i].id} name={genres[i].name}>{genres[i].name}</p>
            )
        }

        for (let i = 0; i < userPreferences?.length; i ++) {
            console.log(userPreferences[i].name)
            userPreferenceComponents.push(
                <p onClick={this.deletePreference}className='genre2' id={userPreferences[i].id}>{userPreferences[i].name}</p>
                )
        }

        let genreOptions = genreComponents.map(el => ( 
            <div>
            <label> {el.props.name} </label>
            <input name="checkBox" type="checkbox" onClick={this.clickPreference()} />
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
                        {userPreferenceComponents}

                    </div>
                    <Popup trigger={<button className="button"> Change Preferences </button>} modal closeOnDocumentClick>
                        <h2>Change Preferences</h2>
                        <div className='genre-container'>
                            {/* {genreComponents} */}
                           {genreOptions}
                        </div>
                    </Popup>
                </div>  
            </div>
        )
    }
}
export default Account;
