import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CrudOne from "./Components/CrudOne";
import Form from "./Components/Form";
import Table from "./Components/Table";
import { useRef, useState } from "react";

function App() {
  let obj = {
    id: 0,
    fname: "",
    lname: "",
    email: "",
    number: "",
    dob: "",
    gender: "",
    hobbies: [],
    country: "",
    state: "",
    city: "",
    selected: "",
  };
  let [userObj, setuserObj] = useState({ ...obj });
  let [userArray, setuserArray] = useState([]);
  let hby = userObj.hobbies ? userObj.hobbies : [];
  const update_btn = useRef(); // btn interchange , we need it in both form & app component so ,called here bcoz data can be passed in parent to child component
  const deletebtn_select = useRef(); // delete button , we need it in both form and table component so ,called here bcoz data can be passed in parent to child component
  let big_check = useRef(); // main checkbox , we need it in both component so ,called here bcoz data can be passed in parent to child component

  //===========  reset data ===========
  const resetbtn = () => {
    setuserObj({ ...obj });
  };
  // =================================

  //===================  onchange events ========================
  const getvalue = (e) => {
    const _userObj = { ...userObj }; // state cannot be change directly so, i need variable and need to set in obj.
    if (e.target.name === "hobbies") {
      if (e.target.checked) {
        hby.push(e.target.value);
      } else {
        hby = hby.filter((x) => x !== e.target.value);
      }
      _userObj.hobbies = hby;
    } else {
      _userObj[e.target.name] = e.target.value;
    }
    setuserObj(_userObj);
  };

  //================ onSubmit event ===========
  const submitdata = (e) => {
    e.preventDefault();
    if (userObj.id === 0) {
      userObj.id = setId();
      // userObj.selected = false
      userArray.push(userObj);
    } else {
      let index = userArray.findIndex((x) => x.id === userObj.id);
      userArray.splice(index, 1, userObj);
      update_btn.current.style.display = "none"; //whene i clicked edit btn and data is updated , i need submit btn.
    }
    setuserArray([...userArray]);
    setuserObj({ ...obj });
  };

  // ============ for Id manage =============
  const setId = () => {
    let num = 1;
    if (userArray.length == 0) {
      return num;
    } else if (userArray.length > 0) {
      let id = userArray.map((x) => x.id);
      let max_id = Math.max(...id);
      return max_id + 1;
    }
  };

  return (
    <>
      {/*=====================================     task -1 simple react crud  ===================================*/}
      {/* <CrudOne /> */}

      {/* =====================  task - 2 table and form in seprate component and called as a sibling component in app.js ==================== */}
      <Form
        userArray={userArray}
        setuserArray={setuserArray}
        getvalue={getvalue}
        submitdata={submitdata}
        userObj={userObj}
        setuserObj={setuserObj}
        obj={obj}
        deletebtn_select={deletebtn_select}
        update_btn={update_btn}
        checkRef={big_check}
        resetbtn={resetbtn}
      />
      <Table
        userArray={userArray}
        setuserArray={setuserArray}
        deletebtn_select={deletebtn_select}
        checkRef={big_check}
        setuserObj={setuserObj}
        update_btn={update_btn}
        obj={obj}
      />

      {/* ========================================================================================================================== */}
    </>
  );
}

export default App;
