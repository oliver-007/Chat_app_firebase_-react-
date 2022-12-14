import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

import { auth, db } from "../firebase";
import { useGlobalContext } from "../context/AuthContext";

const Navbar = () => {
  const history = useHistory();

  const { user } = useGlobalContext();

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });

    await signOut(auth);
    history.replace("/login");
  };

  return (
    <nav>
      <h3>
        <Link to="/">FireChat</Link>
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login"> Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
