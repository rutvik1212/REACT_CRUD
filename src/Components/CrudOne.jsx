import React, { useEffect, useRef, useState } from 'react';
import myjson from '../data.json';

export default function CrudOne() {
    // console.log(myjson)
    const obj = { id: 0, fname: "", lname: "", email: "", number: "", dob: "", gender: "", hobbies: [], country: "", state: "", city: "", selected: "" }
    let [userObj, setuserObj] = useState({ ...obj })
    let [userArray, setuserArray] = useState([])

    // const [countryList, setcountryList] = useState([])
    const [stateList, setstateList] = useState([])
    const [cityList, setcityList] = useState([])    
    // const [countryblank, setcountryblank] = useState("")
    // const [count, setcount] = useState(1)
    // const refcountry = useRef();
    // const refstate = useRef();
    // const refcity = useRef();
    const big_check = useRef()
    const deletebtn_select = useRef();
    const submit_btn = useRef();
    const update_btn = useRef();

    let hby = userObj.hobbies ? userObj.hobbies : []

    let countryaddList = myjson.map(x => x.country)
    // setcountryList(countryaddList)

// ========= reset btn ========
const resetbtn = () =>{
    setuserObj({ ...obj })
}
    // for dependecy dropdown 
    const countrychange = (e) => {
        const country = e.target.value;
        const obj = myjson.find(x => {
            return x.country === country
        })
        let state = obj.statelist.map(x => x.state)
        setstateList(state)
        setcityList([])  // when i change country citylist is going to be blank.
    }

    const statechange = (e) => {
        const state = e.target.value;
        // const state = userObj.state;
        const obj = myjson.map(x => {
            return x.statelist.filter(y => {
                return y.state === state
            })
        })
        obj.forEach(x => x.map(y => {
            if (y.state === state) {
                const city = y.cityList.map(z => z)
                setcityList(city)
            }
        }))
    }


    // onchange events

    const getvalue = (e) => {
        const _userObj = { ...userObj }   // state cannot be change directly so, i need variable and need to set in obj.
        if (e.target.name === "hobbies") {
            if (e.target.checked) {
                hby.push(e.target.value)
            }
            else {
                hby = hby.filter(x => x !== e.target.value)
            }
            _userObj.hobbies = hby;
        }
        else {
            _userObj[e.target.name] = e.target.value;
        }
        setuserObj(_userObj)


    }
    // console.log(userObj);


    //================ onSubmit event ===========
    const submitdata = (e) => {
        e.preventDefault();
        if (userObj.id === 0) {
            userObj.id = setId();
            userArray.push(userObj);
        }
        else {
            let index = userArray.findIndex(x => x.id === userObj.id);
            userArray.splice(index, 1, userObj)
            update_btn.current.style.display = "none" //whene i clicked edit btn and data is updated , i need submit btn.
        }
        setuserArray([...userArray])
        setuserObj({ ...obj })

    }
 
    // ============ for Id manage =============
    const setId = () => {
        let num = 1;
        if (userArray.length == 0) {
            return num;
        }
        else if (userArray.length > 0) {
            let id = userArray.map(x => x.id)
            let max_id = Math.max(...id)
            return max_id + 1;
        }
    }
    // =======================================

    // ===== deleteuser ===========
    const deleteuser = (id) => {
        const index = userArray.findIndex(x => x.id === id)
        const confirmation = window.confirm("Are you sure you want to delete ?")
        if (confirmation) {
            userArray.splice(index, 1)
        }
        setuserArray([...userArray])
        update_btn.current.style.display = "none";  //when i clicked edit btn and i want to delete data at that time submit btn is going to display. 
    }

    // ======== edituser ============
    const edituser = (id, e) => {
        const index = userArray.find(x => x.id === id);
        setuserObj({ ...index })
        // submit_btn.current.value = "Update"
        submit_btn.current.setAttribute("value" , "Update")
        console.log(submit_btn.current);

        // console.log(submit_btn.current.value);

        update_btn.current.style.position = "absolute";
        update_btn.current.style.left = "15px";
        // submit_btn.current.style.display = "none"
        update_btn.current.style.display = "inline-block" //when i clicked edit btn and i want to delete data at that time update btn is going to display. 
    }



    // =========== checkbox task ================

    // one to all 
    const checkAll = (e) => {
        let value = e.target.checked;
        // console.log(value);

        let newArr = [...userArray].map(x => {
            x = {
                ...x, selected: value
            }
            if (x.selected == true) {
                deletebtn_select.current.style.display = "inline-block"
            }
            else {
                deletebtn_select.current.style.display = "none"
            }
            return x;
        })
        userArray = newArr;
        setuserArray([...userArray])

        // let condition_check = [...userArray].length && [...userArray].every(x => x.selected);
        // condition_check = value;

        // if (big_check.current.checked == true) {
        //     deletebtn_select.current.style.display = "inline-block"
        // }
        // else if (big_check.current.checked == false) {
        //     deletebtn_select.current.style.display = "none"
        // }



    }

    // All to one
    const check = (id) => {
        let newObj = [...userArray].findIndex(data => data.id === id);
        userArray[newObj].selected = !userArray[newObj].selected
        setuserArray([...userArray])
        let condition_check = userArray.length && userArray.every(x => x.selected);
        big_check.current.checked = condition_check;

        const btn_show = [...userArray].length && [...userArray].some(u => u.selected); //check any of one is selected or not
        if (btn_show) {
            deletebtn_select.current.style.display = "inline-block";
        }
        else {
            deletebtn_select.current.style.display = "none"
        }
    }

    // ============================================

    const deletebtn = () => {
        let confirmation = window.confirm("Are you sure you want to delete?");
        if (confirmation) {
            let deletebutton = userArray.filter(x => x.selected == false)  //false bcoz we need array is blank
            setuserArray([...deletebutton])
            big_check.current.checked = false;   // for unchecked main_checkbox when all data is deleted.
            deletebtn_select.current.style.display = "none";
        }
    }



    return (
        <>
            <h1 className='text-center' id='form'>Form</h1>
            <form action="" className=" w-50 mx-auto p-3 shadow-lg bg-white position-relative" onSubmit={submitdata}>
                <label htmlFor="" className='w-100'>First Name</label>
                <input type="text" className="w-100" name="fname" value={userObj.fname} onChange={getvalue} />
                <label htmlFor="" className='w-100'>Last Name</label>
                <input type="text" className="w-100" name="lname" value={userObj.lname} onChange={getvalue} />
                <label htmlFor="" className='w-100'>Email Id</label>
                <input type="email" className="w-100" name="email" value={userObj.email} onChange={getvalue} />
                <label htmlFor="" className='w-100'>Mobile Number</label>
                <input type="number" className="w-100" name="number" value={userObj.number} onChange={getvalue} />
                <label htmlFor="" className='w-100'>DOB</label>
                <input type="date" className="w-100" name="dob" value={userObj.dob} onChange={getvalue} />
                <label htmlFor="" className='w-100'>Gender</label>
                <input type="radio" name="gender" value="Male" checked={userObj.gender?.includes("Male")} onChange={getvalue} />Male
                <input type="radio" name="gender" value="Female" onChange={getvalue} checked={userObj.gender?.includes("Female")} />Female
                <label htmlFor="" className='w-100'>Hobbies</label>
                <input type="checkbox" name="hobbies" value="Reading" checked={userObj.hobbies?.includes("Reading")} onChange={getvalue} /> Reading
                <input type="checkbox" name="hobbies" value="Playing" checked={userObj.hobbies?.includes("Playing")} onChange={getvalue} /> Playing
                <input type="checkbox" name="hobbies" value="Swimming" checked={userObj.hobbies?.includes("Swimming")} onChange={getvalue} /> Swimming

                {/* <!-- for dependecy dropdown --> */}
                <label htmlFor="" className='w-100'>Country</label>
                <select name="country" className="w-100" onChange={(e) => {
                    countrychange(e)
                    getvalue(e)
                }} value={userObj.country} >
                    <option value="">Please select country</option>
                    {
                        countryaddList.map((x, i) => {
                            return (<option key={i} value={x}>{x}</option>)
                        })
                    }
                </select>
                <label htmlFor="" className='w-100'>State</label>
                <select name="state" className="w-100 " onChange={(e) => {
                    statechange(e)
                    getvalue(e)
                }} value={userObj.state} >

                    <option value="">Please select state</option>
                    {
                        stateList.map((x, i) => {
                            return <option key={i} value={x}>{x}</option>;
                        })
                    }

                </select>
                <label htmlFor="" className='w-100'>City</label>
                <select name="city" className="w-100 " onChange={getvalue} value={userObj.city}>
                    <option value="">please select city</option>
                    {
                        cityList.map((x, i) => {
                            return <option key={i} value={x}>{x}</option>
                        })
                    }
                </select>

                <input type="submit" className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded " value={'Submit'} ref={submit_btn} ></input>
                <input type="submit" className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded " value={'Update'} ref={update_btn} style={{ display: "none" }}></input>

                <input type="reset" className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded position-absolute "  style={{ right:"15px" }} onClick = {() => resetbtn()}/>


                <input type="button" className="mt-3 border-0 text-bg-success px-4 py-2 fs-5 rounded ms-2" value="Delete" onClick={() => deletebtn()} ref={deletebtn_select} style={{ display: "none" }}></input>


            </form>



            {/* ============================ table ============================== */}

            <table className="w-100 mt-5 table table-info table-striped" id="table">
                <thead>
                    <tr>
                        <td> <input type="checkbox" onChange={(e) => checkAll(e)} ref={big_check} /></td>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>MOBILE NO</th>
                        <th>DOB</th>
                        <th>GENDER</th>
                        <th>HOBBIES</th>
                        <th>COUNTRY</th>
                        <th>STATE</th>
                        <th>CITY</th>
                        <th>SELECTED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        userArray?.map((x, i) => {
                            return (
                                <tr key={i}>
                                    {/* to set checked property for checkbox one to all task */}
                                    <td><input type="checkbox" onChange={(id, e) => check(x.id, e)} checked={x.selected} /></td>
                                    <td>{x.id}</td>
                                    <td>{x.fname}</td>
                                    <td>{x.lname}</td>
                                    <td>{x.email}</td>
                                    <td>{x.number}</td>
                                    <td>{x.dob}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobbies.join(',')}</td>
                                    <td>{x.country}</td>
                                    <td>{x.state}</td>
                                    <td>{x.city}</td>
                                    <td>{x.selected ? "true" : "false"}</td>
                                    <td>
                                        <button className='text-bg-success border-0 px-3 py-1 rounded me-2' onClick={() => edituser(x.id)}>Edit</button>
                                        <button className='text-bg-danger border-0 px-3 py-1 rounded' onClick={() => deleteuser(x.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}
