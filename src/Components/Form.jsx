import React, { useEffect, useRef, useState } from "react";
import myjson from "../data.json";

export default function Form({
  userArray,
  setuserArray,
  getvalue,
  submitdata,
  userObj,
  setuserObj,
  obj,
  checkRef,
  deletebtn_select,
  update_btn,
  resetbtn,
}) {
  const [stateList, setstateList] = useState([]);
  const [cityList, setcityList] = useState([]);
  let countryaddList = myjson.map((x) => x.country);


  // for dependecy dropdown
  const countrychange = (e) => {
    const country = e.target.value;
    const obj = myjson.find((x) => {
      return x.country === country;
    });
    let state = obj.statelist.map((x) => x.state);
    setstateList(state);
    setcityList([]); // when i change country citylist is going to be blank.
  };

  const statechange = (e) => {
    const state = e.target.value;

    // const state = userObj.state;
    const obj = myjson.map((x) => {
      return x.statelist.filter((y) => {
        return y.state === state;
      });
    });
    obj.forEach((x) =>
      x.map((y) => {
        if (y.state === state) {
          const city = y.cityList.map((z) => z);
          setcityList(city);
        }
      })
    );
  };
  //   console.log(statevalue)

// on edit if i clicked edit btn and again clicked on upper edit btn state and city cannot be set. so we need useEffect 
// useeffect with country's dependency
  useEffect(() => {
    if (userObj.country !== "") {
      const country = userObj.country;
      const objs = myjson.find((x) => {
        return x.country === country;
      });
      let state = objs?.statelist?.map((x) => x.state);
      setstateList(state);
    }
  }, [userObj.country]);


  // useeffect with state's dependency
  useEffect(() => {
    const state = userObj.state;
    const obj = myjson.map((x) => {
      return x.statelist.filter((y) => {
        return y.state === state;
      });
    });
    obj.forEach((x) =>
      x.map((y) => {
        if (y.state === state) {
          const city = y.cityList.map((z) => z);
          setcityList(city);
        }
      })
    );
  }, [userObj.state]);
  // =============================== deletebtn ====================================

  const deletebtn = () => {
    let confirmation = window.confirm("Are you sure you want to delete?");
    if (confirmation) {
      let deletebutton = userArray.filter((x) => x.selected == false); //false bcoz we need array is blank
      // console.log(big_check.current)
      setuserArray([...deletebutton]);
      checkRef.current.checked = false; // for unchecked main_checkbox when all data is deleted.
      deletebtn_select.current.style.display = "none";
      update_btn.current.style.display = "none";
      setuserObj({ ...obj });  // when data will be delete , form should have to blank.
    }
  };
  // =============================================================================

  return (
    <>
      <h1 className="text-center" id="form">
        Form
      </h1>
      <form
        action=""
        className=" w-50 mx-auto p-3 shadow-lg bg-white position-relative"
        onSubmit={submitdata}
      >
        <label htmlFor="" className="w-100">
          First Name
        </label>
        <input
          type="text"
          className="w-100"
          name="fname"
          value={userObj.fname}
          onChange={getvalue}
        />
        <label htmlFor="" className="w-100">
          Last Name
        </label>
        <input
          type="text"
          className="w-100"
          name="lname"
          value={userObj.lname}
          onChange={getvalue}
        />
        <label htmlFor="" className="w-100">
          Email Id
        </label>
        <input
          type="email"
          className="w-100"
          name="email"
          value={userObj.email}
          onChange={getvalue}
        />
        <label htmlFor="" className="w-100">
          Mobile Number
        </label>
        <input
          type="number"
          className="w-100"
          name="number"
          value={userObj.number}
          onChange={getvalue}
        />
        <label htmlFor="" className="w-100">
          DOB
        </label>
        <input
          type="date"
          className="w-100"
          name="dob"
          value={userObj.dob}
          onChange={getvalue}
        />
        <label htmlFor="" className="w-100">
          Gender
        </label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={userObj.gender?.includes("Male")}
          onChange={getvalue}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={getvalue}
          checked={userObj.gender?.includes("Female")}
        />
        Female
        <label htmlFor="" className="w-100">
          Hobbies
        </label>
        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          checked={userObj.hobbies?.includes("Reading")}
          onChange={getvalue}
        />{" "}
        Reading
        <input
          type="checkbox"
          name="hobbies"
          value="Playing"
          checked={userObj.hobbies?.includes("Playing")}
          onChange={getvalue}
        />{" "}
        Playing
        <input
          type="checkbox"
          name="hobbies"
          value="Swimming"
          checked={userObj.hobbies?.includes("Swimming")}
          onChange={getvalue}
        />{" "}
        Swimming
        {/* <!-- for dependecy dropdown --> */}
        <label htmlFor="" className="w-100">
          Country
        </label>
        <select
          name="country"
          className="w-100"
          onChange={(e) => {
            countrychange(e);
            getvalue(e);
          }}
          value={userObj.country}
        >
          <option value="">Please select country</option>
          {countryaddList.map((x, i) => {
            return (
              <option key={i} value={x}>
                {x}
              </option>
            );
          })}
        </select>
        <label htmlFor="" className="w-100">
          State
        </label>
        <select
          name="state"
          className="w-100 "
          onChange={(e) => {
            statechange(e);
            getvalue(e);
          }}
          value={userObj.state}
        >
          <option value="">Please select state</option>
          {stateList.map((x, i) => {
            return (
              <option key={i} value={x}>
                {x}
              </option>
            );
          })}
        </select>
        <label htmlFor="" className="w-100">
          City
        </label>
        <select
          name="city"
          className="w-100 "
          onChange={getvalue}
          value={userObj.city}
        >
          <option value="">please select city</option>
          {cityList.map((x, i) => {
            return (
              <option key={i} value={x}>
                {x}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded "
          value={"Submit"}
        ></input>
        <input
          type="submit"
          className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded "
          value={"Update"}
          ref={update_btn}
          style={{ display: "none" }}
        ></input>
        <input
          type="reset"
          className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded position-absolute "
          style={{ right: "15px" }}
          onClick={() => resetbtn()}
        />
        <input
          type="button"
          className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded ms-2"
          value="Delete"
          onClick={() => deletebtn()}
          ref={deletebtn_select}
          style={{ display: "none" }}
        ></input>
      </form>
    </>
  );
}
