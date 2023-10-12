import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{store.token && <>
						<Link to="/account">
							<button className="btn btn-primary mx-2" >Account</button>
						</Link>

						<Link to="/login">
							<button className="btn btn-primary mx-2" onClick={()=> actions.logout() }>Logout</button>
						</Link>
					</>
					}
					{!store.token && <>
						<Link to="/signup">
							<button className="btn btn-primary mx-2" >Sign Up</button>
						</Link>

						<Link to="/login">
							<button className="btn btn-primary mx-2">Login</button>
						</Link>
					</>
					}
					
				</div>
			</div>
		</nav>
	);
};
