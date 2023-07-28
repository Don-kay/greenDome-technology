"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { adminUpdateUsers } from "@/features/profile/profileSlice";
import makeAnimated from "react-select/animated";
import _ from "lodash";
import { GetAllUsers } from "@/features/profile/profileSlice";
import functionsSpace from "@/features/functions/functions";
import { useRouter } from "next/navigation";
import FormRow from "@/components/FormRow";
import { setActiveParams } from "@/features/profile/profileSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditProfile({ params }) {
  // const router = useRouter();
  const dispatch = useDispatch();
  const {
    profileParams,
    users,
    updatedProfiles,
    updatedStatus,
    isUpdated,
    updated,
  } = useSelector((strore) => strore.profiles);
  // console.log(params);
  // const [users, setUsers] = useState("");

  useEffect(() => {
    // try {
    //   const fetch = async () => {
    //     const profiles = await axios.get(
    //       "http://localhost:8000/greendometech/ng/auth/users",
    //       {
    //         withCredentials: true,
    //         credentials: "includes",
    //       }
    //     );
    //     const resp = { data: profiles.data, stats: profiles.status };
    //     setUsers(resp);
    //   };
    //   fetch();
    // } catch (error) {
    //   return { msg: error.response.data };
    // }

    dispatch(GetAllUsers());
  }, []);

  const paramsId = params;
  // const user = users.data?.user;
  // const user = data?.user;
  const singlProfile = users?.filter((item) => item.id === paramsId);
  // console.log(singlProfile);
  // const newArray = singlProfile.map((a) => ({ ...a }));
  const id = _.toString(singlProfile?.map((i) => i.id));
  const firstname = _.toString(singlProfile?.map((i) => i.firstname));
  const lastname = _.toString(singlProfile?.map((i) => i.lastname));
  const country = _.toString(singlProfile?.map((i) => i.country));
  const mobilenumber = _.toString(singlProfile?.map((i) => i.mobilenumber));
  const biography = _.toString(singlProfile?.map((i) => i.biography));
  const certificate = singlProfile?.map((i) => i.certificate);
  const roles = singlProfile?.map((i) => i.roles);
  const username = _.toString(singlProfile?.map((i) => i.username));

  const flattenCert = certificate.flat(1);
  const flattenRoles = roles.flat(1);

  const [roleCont, setRoleCont] = useState();
  const [certCont, setCertCont] = useState();
  const [countryZip, setCountryZip] = useState([]);
  const roleOptions = [
    { value: "1", label: "student" },
    { value: "2", label: "tutor" },
    { value: "3", label: "company" },
    { value: "4", label: "Admin" },
  ];
  const certifiedOptions = [
    { value: "1", label: "none" },
    { value: "2", label: "AWS Developer" },
    { value: "3", label: "Software Engineer" },
    { value: "4", label: "Web Developer" },
    { value: "5", label: "Data Analyst" },
    { value: "6", label: "IT Engineer" },
  ];
  const countryOptions = [
    { value: "1", label: "234" },
    { value: "2", label: "141" },
    { value: "3", label: "199" },
    { value: "4", label: "444" },
    { value: "5", label: "205" },
    { value: "6", label: "363" },
  ];
  useEffect(() => {
    // if (roleCont.length === 0) {
    //   setRoleCont(roles);
    // } else {
    //   handleSelected;
    // }
    setRoleCont(flattenRoles);
    // if (countryZip.length === 0) {
    //   setCountryZip(country);
    // } else {
    //   handleSelected;
    // }
    setCountryZip(country);
    setCertCont(flattenCert);
    // if (certCont.length === 0) {
    //   setCertCont(certificate);
    // } else if (certCont.length > 0) {
    //   handleSelectedCert;
    // }
    // console.log(certCont.length);
  }, []);
  const roleDisplay = functionsSpace(roles);
  const certDisplay = functionsSpace(certificate);
  const byt = "123";
  const [updatedUser, setUpdatedUser] = useState({
    firstname: firstname,
    lastname: lastname,
    country: country,
    mobilenumber: mobilenumber,
    biography: biography,
  });

  const zip = ` + ${updatedUser.country}`;
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  // console.log(certificate);
  // const handleOnFocus = (id) => {
  //   console.log("item in focus");
  //   console.log(id);
  //   setIsEditing(true);
  // };
  // const handleOnBlur = () => {
  //   console.log("item out of focus");
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };
  const handleSelected = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setRoleCont(label);
  };
  const handleSelectedCert = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setCertCont(label);
  };
  const handleSelectedCountry = (selectedOptions) => {
    const label = selectedOptions.label;
    setCountryZip(_.toString(label));
  };

  useEffect(() => {
    dispatch(setActiveParams(paramsId));
  }, []);
  // console.log(typeof roles);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      certificate,
      country,
      mobilenumber,
      biography,
    } = updatedUser;

    if (
      !firstname ||
      !lastname ||
      !certificate ||
      !country ||
      !mobilenumber ||
      !biography
    ) {
      toast.error("please fill all details");
    }
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
    // console.log(res.data);

    dispatch(
      adminUpdateUsers({
        params: profileParams,
        firstname: firstname,
        lastname: lastname,
        certificate: certCont,
        mobilenumber: mobilenumber,
        biography: biography,
        roles: roleCont,
        country: _.toString(countryZip),
      })
    );
    dispatch(GetAllUsers());
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Update {`${username}`} profile</h1>

        <div>
          <FormRow
            type="text"
            name="firstname"
            value={updatedUser.firstname}
            handleChange={handleChange}
            // handleOnFocus={() => handleOnFocus()}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="text"
            name="lastname"
            value={updatedUser.lastname}
            handleChange={handleChange}
            // handleOnFocus={handleOnFocus}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="number"
            name="mobilenumber"
            value={updatedUser.mobilenumber}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="biography"
            value={updatedUser.biography}
            handleChange={handleChange}
          />
          <div>
            <h5>country</h5>
            <Select
              components={makeAnimated()}
              name="country"
              options={countryOptions}
              id="certificate"
              onChange={handleSelectedCountry}
              // isMulti={true}
              isSearchable
              noOptionsMessage={() => "certificate does not exist yet"}
              placeholder={country}
            />
          </div>
          <div>
            <h5>certificate</h5>
            <Select
              components={makeAnimated()}
              name="certificate"
              options={certifiedOptions}
              id="certificate"
              onChange={handleSelectedCert}
              isMulti={true}
              isSearchable
              noOptionsMessage={() => "certificate does not exist yet"}
              placeholder={_.toString(certDisplay)}
            />
          </div>
          <div>
            <h5>roles</h5>
            <Select
              components={makeAnimated()}
              name="roles"
              // value={roles}
              options={roleOptions}
              id="roles"
              onChange={handleSelected}
              isMulti={true}
              isSearchable
              noOptionsMessage={() => "role does not exist yet"}
              placeholder={_.toString(roleDisplay)}
            />
          </div>
        </div>

        <button>submit</button>
      </form>
      <div>editProfile</div>;
    </main>
  );
}

export default EditProfile;
