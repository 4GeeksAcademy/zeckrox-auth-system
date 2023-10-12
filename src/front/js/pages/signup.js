import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [ user, setUser ] = useState(
		{
			"email":"",
			"password":"",
			"passconfirm":""
		}
	);
	
	useEffect(() => {
		if(store.token) navigate("/account")
	}, []);

	async function userCreation(){
		if (!user.email || !user.password || !user.passconfirm) alert("Some fields are missing")
		if (user.password != user.passconfirm) alert("Passwords doesn't match")
		else{
			let create = await actions.createUser(user)
			if (create == true) navigate("/login")
			else alert("User already exists")
		}
	}

	return (
		<div className="container w-25 bg-light border rounded p-4 my-5">
			<h1 className="text-center mb-3">Sign Up!</h1>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
				onChange={(e) => setUser({...user, "email":e.target.value})} />
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1"
				onChange={(e) => setUser({...user, "password":e.target.value})} />
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
				<input type="password" className="form-control" id="exampleInputPassword2"
				onChange={(e) => setUser({...user, "passconfirm":e.target.value})} />
				<div id="emailHelp" className="form-text">By registering you accept our <a className="text-decoration-underline text-primary">Terms and Conditions</a></div>
			</div>
			<button type="submit" className="btn btn-primary mt-2" onClick={() => userCreation() }>Submit</button>
		</div>
	);
};
