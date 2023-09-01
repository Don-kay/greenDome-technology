"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "@/features/functions/functions";
import { GetAllUsers } from "@/features/profile/profileSlice";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import moment from "moment";

const SingleProfileView = ({ users, id }) => {
  const dispatch = useDispatch();
  const { modalId } = useSelector((strore) => strore.functions);
  // const { users } = useSelector((strore) => strore.profiles);

  // useEffect(() => {
  //   //  const fetchUsers = async () => {
  //   //    try {
  //   //      const res = await customFetch.get(`/auth/users/${modalId}`, {
  //   //        withCredentials: true,
  //   //        credentials: "includes",
  //   //      });
  //   //      //console.log(res);
  //   //      const resp = { data: res.data.user, stats: res.status };
  //   //      setUsers(resp.data);
  //   //    } catch (error) {
  //   //      return { msg: error };
  //   //    }
  //   //  };
  //   //  fetchUsers();

  //   dispatch(ProfileModal({ bool: false }));
  // }, []);
  try {
    const singleProfile = users?.filter((i) => i.id === id);
    return (
      <section>
        {singleProfile?.map((item, idx) => {
          const {
            id,
            email,
            roles,
            image,
            country,
            mobilenumber,
            certificate,
            firstname,
            lastname,
            username,
            biography,
            classesId,
            createdAt,
            updatedAt,
          } = item;
          const phoneNumber = `${country}-${mobilenumber}`;
          const Roles = functionsSpace(roles);
          const Certificate = functionsSpace(certificate);
          const created = moment(createdAt).format("YYYY-MM-DD HH:MM:SS");
          const updated = moment(updatedAt).format("YYYY-MM-DD HH:MM:SS");

          return (
            <div key={idx}>
              {image === undefined || image === "" ? (
                <Image width={200} height={200} src={Greendome} alt="image" />
              ) : (
                <Image width={200} height={200} src={image} alt="image" />
              )}
              <p>{id}</p>
              <div>
                <h3>Username: </h3> <h2>{username}</h2>
              </div>
              <div>
                <h3>firstname: </h3> <h2>{firstname}</h2>
              </div>
              <div>
                <h3>Lastname: </h3> <h2>{lastname}</h2>
              </div>
              <div>
                <h3>email: </h3> <h2>{email}</h2>
              </div>
              <div>
                <h3>Mobile: </h3> <h2>{`+${phoneNumber}`}</h2>
              </div>
              <div>
                <h3>Role: </h3> <h2>{Roles}</h2>
              </div>
              <div>
                <h3>Active membership: </h3> <h2>{classesId}</h2>
              </div>
              <div>
                <h3>Biography: </h3> <h2>{biography}</h2>
              </div>
              <div>
                <h3>Member since: </h3> <h2>{created}</h2>
              </div>
              <div>
                <h3>Last Updated: </h3> <h2>{updated}</h2>
              </div>
              <div>
                <h3>Certificate: </h3> <h2>{Certificate}</h2>
              </div>
              <div>view single profile</div>
            </div>
          );
        })}
      </section>
    );
  } catch (error) {
    return (
      <div>
        <h1>no profile to display</h1>
      </div>
    );
  }
};

export default SingleProfileView;
