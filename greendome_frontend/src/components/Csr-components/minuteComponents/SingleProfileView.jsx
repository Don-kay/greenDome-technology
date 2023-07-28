"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "@/features/functions/functions";

const SingleProfileView = () => {
  const { modalId } = useSelector((strore) => strore.functions);
  const { users } = useSelector((strore) => strore.profiles);

  const singleProfile = users.filter((i) => i.id === modalId);

  return (
    <section>
      {singleProfile.map((item, idx) => {
        const {
          id,
          email,
          roles,
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

        return (
          <div key={idx}>
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
              <h3>Member since: </h3> <h2>{createdAt}</h2>
            </div>
            <div>
              <h3>Last Updated: </h3> <h2>{updatedAt}</h2>
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
};

export default SingleProfileView;
