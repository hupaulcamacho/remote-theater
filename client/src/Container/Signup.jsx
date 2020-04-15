import React from 'react'


class Signup extends React.Component{
    constructor(){
        super();
        this.state ={
            name: "",
            email:"",
            password: ""
        }
    }

    render(){
        return(
            <div>
                <h2> Sign up</h2>
            </div>
        )
    }
}

export default Signup;