import React, { useRef } from "react";

export default function Table({
  userArray,
  setuserArray,
  update_btn,
  setuserObj,
  obj,
  deletebtn_select,
  checkRef,
}) {
  // =========== checkbox task ================

  // one to all checkbox task
  const checkAll = (e) => {
    let value = e.target.checked;
    // console.log(value);

    let newArr = [...userArray].map((x) => {
      x = {
        ...x,
        selected: value,
      };
      if (x.selected == true) {
        deletebtn_select.current.style.display = "inline-block";
      } else {
        deletebtn_select.current.style.display = "none";
      }
      return x;
    });
    userArray = newArr;
    setuserArray([...userArray]);
  };

  // All to one checkbox task
  const check = (id) => {
    let newObj = [...userArray].findIndex((data) => data.id === id);
    userArray[newObj].selected = !userArray[newObj].selected;
    setuserArray([...userArray]);
    const condition_check = userArray.length && userArray.every((x) => x.selected);
    checkRef.current.checked = condition_check;

    // for button hide and show
    const btn_show =
      [...userArray].length && [...userArray].some((u) => u.selected); //check any of one is selected or not
    if (btn_show) {
      deletebtn_select.current.style.display = "inline-block";
    } else {
      deletebtn_select.current.style.display = "none";
    }
  };

  // ===========================================================

  // ===============================  deleteuser  =================================
  const deleteuser = (id) => {
    const index = userArray.findIndex((x) => x.id === id);
    const confirmation = window.confirm("Are you sure you want to delete ?");
    if (confirmation) {
      userArray.splice(index, 1);
    }
    setuserArray([...userArray]);
    update_btn.current.style.display = "none"; //when i clicked edit btn and i want to delete data at that time submit btn is going to display.
    setuserObj({ ...obj }); //when i clicked edit btn and i want to delete data at that time data of form will be blank
  };

  // ================================= edituser ====================================
  const edituser = (id, e) => {
    debugger;
    let index = userArray.find((x) => x.id == id);
    setuserObj({ ...index });

    // for btn interchange
    update_btn.current.style.position = "absolute";
    update_btn.current.style.left = "15px";
    update_btn.current.style.display = "inline-block"; //when i clicked edit btn and i want to delete data at that time update btn is going to display.
  };

  return (
    <>
      {/* ============================ table ============================== */}

      <table className="w-100 mt-5 table table-info table-striped" id="table">
        <thead>
          <tr>
            <td>
              {" "}
              <input
                type="checkbox"
                onChange={(e) => checkAll(e)}
                ref={checkRef}
              />
            </td>
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
        <tbody>
          {userArray?.map((x, i) => {
            return (
              <tr key={i}>
                {/* to set checked property for checkbox one to all task */}
                <td>
                  <input
                    type="checkbox"
                    onChange={(id, e) => check(x.id, e)}
                    checked={x.selected}   //for all to one checkbox task.
                  />
                </td>
                <td>{x.id}</td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.number}</td>
                <td>{x.dob}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies}</td>
                <td>{x.country}</td>
                <td>{x.state}</td>
                <td>{x.city}</td>
                <td>{x.selected ? "true" : "false"}</td>
                <td>
                  <button
                    className="text-bg-success border-0 px-3 py-1 rounded me-2"
                    onClick={() => edituser(x.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-bg-danger border-0 px-3 py-1 rounded"
                    onClick={() => deleteuser(x.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
