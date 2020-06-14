import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';
import {API_BASE_URL} from '../../constants/ApiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        userId : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "userId":state.userId,
            "secret":state.password,
        }
        axios.post(API_BASE_URL+'login', payload)
            .then(function (response) {
                if(response.status === 200){
                    if (response.data.status === '0') {
                        props.showError(response.data.message);
                    } else {
                        localStorage.setItem('userToken', response.data.token);
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Login successful. Redirecting to home page..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.data.message) {
                    props.showError(error.response.data.message);
                } else {
                    props.showError('Internal server error');
                }
            });
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center d-flex align-items-center flex-column">
            <form>
                <div className="form-group text-left">
                <label htmlFor="formGroupExampleInput">User ID</label>
                <input type="text" 
                       className="form-control" 
                       id="userId" 
                       aria-describedby="userId" 
                       placeholder="Enter User ID" 
                       value={state.userId}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(LoginForm);