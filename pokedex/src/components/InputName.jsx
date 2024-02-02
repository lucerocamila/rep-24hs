import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";

const InputName = () => {
  
  const [userName, setUserName] = useState("");

  //navegacion 
  const navigate = useNavigate();
  const dispatch = useDispatch();

//---funcion enter name para el OnClick---
  const enterName = () => {
    dispatch(changeName(userName));
    navigate("/pokedex");
  };

  return (
    <div className="welcome">
             <p>Welcome {userName}!</p>

      <h1>Input name</h1>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)} 
        value={userName}
      />
      <button onClick={enterName}>Enter</button>
    </div>
  );
};

export default InputName;
