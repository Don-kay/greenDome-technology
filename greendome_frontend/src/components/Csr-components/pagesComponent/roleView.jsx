"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/profile/profileSlice";
import makeAnimated from "react-select/animated";
import StudentsSlice from "../minuteComponents/slicedRolecomp.jsx";
import functionsSpace from "@/features/functions/functions.jsx";
import Select from "react-select";
import { useRouter } from "next/navigation.js";
import { adminUpdateUsers } from "@/features/profile/profileSlice";
import _ from "lodash";

const RoleView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((strore) => strore.profiles);
  const [roleCont, setRoleCont] = useState();
  const [rowId, setRowId] = useState(null);
  const [isId, setisId] = useState(null);

  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);
  const roleOptions = [
    { value: "1", label: "student" },
    { value: "2", label: "tutor" },
    { value: "3", label: "company" },
    { value: "4", label: "Admin" },
  ];

  const handleSelected = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setRoleCont(label);
  };

  const confirmId = (id) => {
    setisId(id);
  };

  const handleId = (id) => {
    setRowId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(`items in container ${roleCont} ${profileParams} ${id}`);
    // console.log(roleDisplay);

    // const res = await axios.put(
    //   "http://localhost:8000/greendometech/ng/auth/users/update/6480d2355c177a3d245857e4",
    //   {
    //     firstname: firstname,
    //     lastname: lastname,
    //     biography: biography,
    //     certificate: certCont,
    //     mobilenumber: mobilenumber,
    //     country: _.toString(countryZip),
    //     roles: roleCont,
    //   },
    //   {
    //     withCredentials: true,
    //     credentials: "include",
    //   }
    // );
    // console.log(`this is rowid ${rowId}`);

    if (rowId === isId) {
      dispatch(
        adminUpdateUsers({
          params: rowId,
          roles: roleCont,
        })
      );
      dispatch(GetAllUsers());

      router.refresh();
    } else {
      return;
    }
  };

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>board</div>
      <div>
        {users.map((item, ids) => {
          const { firstname, lastname, username, roles } = item;
          const { id } = item;
          const Role = functionsSpace(roles);

          return (
            <section key={ids}>
              <div key={ids}>
                user: {ids} <h2>{firstname}</h2>
                <h2>{lastname}</h2>
                <h2>{username}</h2>
                <h2>{id}</h2>
                <h2>{Role}</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <h5>Assign roles</h5>
                <div onClick={() => confirmId(id)}>
                  <Select
                    key={ids}
                    components={makeAnimated()}
                    name="roles"
                    // value={roles}
                    options={roleOptions}
                    id="roles"
                    onChange={handleSelected}
                    isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "role does not exist yet"}
                    placeholder={_.toString(roles)}
                  />
                </div>

                <button onClick={() => handleId(id)}>submit</button>
              </form>
            </section>
          );
        })}
      </div>
      <StudentsSlice />
      {/* <div className="relative flex items-center justify-around flex-row">
        <TotalStudentPops />
        <ActiveStudentPops />
      </div> */}
    </section>
  );
};

export default RoleView;
