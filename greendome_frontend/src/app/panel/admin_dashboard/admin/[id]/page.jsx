import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import functionsSpace from "@/features/functions/functions";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import Link from "next/link";

async function fetchUserProfile() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("myToken")?.value;

  try {
    const profiles = await axios.get(
      "http://localhost:8000/greendometech/ng/auth/users",
      {
        headers: {
          Cookie: "myToken=" + cookie,
        },
      }
    );
    return { profile: profiles.data };
  } catch (error) {
    return { msg: error.response.data };
  }
}

const Profile = async (req) => {
  try {
    const users = await fetchUserProfile();
    const params = req.params.id;

    const { user } = users.profile;
    const adminProfile = user.filter((profile) => profile.id === params);
    const roles = adminProfile.map((i) => i.roles);
    const Roles = functionsSpace(roles);
    // console.log(adminProfile);

    return (
      <main>
        <section>
          {adminProfile.map((item, idx) => {
            const {
              id,
              email,
              country,
              mobilenumber,
              certificate,
              roles,
              firstname,
              lastname,
              username,
              biography,
              classesId,
              createdAt,
              updatedAt,
            } = item;
            const phoneNumber = `${country}-${mobilenumber}`;
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
                  <h3>Certificate: </h3> <h2>{certificate}</h2>
                </div>
                <div>view single profile</div>
              </div>
            );
          })}
          <div>
            <div>
              <p>Edit</p>
              <Link href={`/panel/edit-profile/${params}`}>
                <AiFillSetting />
              </Link>
            </div>
          </div>
        </section>
        Profile
      </main>
    );
  } catch (error) {}
  <section>
    <h1> user details not available </h1>
    <p> refresh the page </p>
  </section>;
};

export default Profile;
