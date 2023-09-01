"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/profile/profileSlice";
import makeAnimated from "react-select/animated";
import StudentsSlice from "../minuteComponents/slicedRolecomp.jsx";
import functionsSpace from "@/features/functions/functions.jsx";
import customFetch from "@/utilities/axios.js";
import Select from "react-select";
import Image from "next/image";
import { useRouter } from "next/navigation.js";
import TotalStudentPops, {
  TotalTutorsProps,
  TotalAdminProps,
} from "../minuteComponents/sudentPops.jsx";
import { adminUpdateUsers } from "@/features/profile/profileSlice";
import _ from "lodash";

const RoleView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { users } = useSelector((strore) => strore.profiles);
  const [roleCont, setRoleCont] = useState();
  const [users, setUsers] = useState();
  const [rowId, setRowId] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [isId, setisId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await customFetch.get("/auth/users", {
          withCredentials: true,
          credentials: "includes",
        });
        //console.log(res);
        const resp = { data: res.data.user, stats: res.status };
        setUsers(resp.data);
      } catch (error) {
        return { msg: error };
      }
    };
    fetchUsers();
  }, [trigger]);
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

    if (rowId === isId) {
      try {
        const res = await customFetch.put(
          `/auth/users/update/${rowId}`,
          { roles: roleCont },

          {
            withCredentials: true,
            credentials: "includes",
          }
        );
      } catch (error) {
        return { msg: error };
      }
      setTrigger(true);
      // dispatch(
      //   adminUpdateUsers({
      //     params: rowId,

      //   })
      // );

      // router.refresh("panel/admin_dashboard/roleview");
    } else {
      return;
    }
  };

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>board</div>
      <div>
        {users?.map((item, ids) => {
          const { firstname, lastname, username, roles, image } = item;
          const { id } = item;
          const Role = functionsSpace(roles);

          return (
            <section key={ids}>
              <div key={ids}>
                <div key={ids}>
                  {image && (
                    <Image width={200} height={200} src={image} alt="image" />
                  )}
                </div>
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
                    isClearable={true}
                    options={roleOptions}
                    id="roles"
                    onChange={handleSelected}
                    isMulti={true}
                    isSearchable
                    noOptionsMessage={() => "role does not exist yet"}
                    placeholder={_.toString(Role)}
                  />
                </div>

                <button onClick={() => handleId(id)}>submit</button>
              </form>
            </section>
          );
        })}
      </div>
      <StudentsSlice />
      {/* <div className="relative">
        <div className="absolute">
          <TotalStudentPops />
        </div>
        <div className="absolute">
          <TotalAdminProps />
        </div>
        <div className="absolute">/
          <TotalTutorsProps />
        </div>
      </div> */}
    </section>
  );
};

export default RoleView;
