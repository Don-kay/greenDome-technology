import React from "react";
import UserView from "@/components/Csr-components/pagesComponent/userVieW1";
const Profile = async (req) => {
  const params = req.params.id;

  return (
    <section>
      <UserView userid={params} />
    </section>
  );
};

export default Profile;
