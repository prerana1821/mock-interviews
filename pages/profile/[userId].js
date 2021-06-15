import { useState } from "react";
import PrivateRoute from "../../components/PrivateRoute";
import dbConnect from "../../middlewares/db.connect";
import UserCredential from "../../models/UserCredential";
import profileStyles from "../../styles/Profile.module.css";
import { EditProfile } from "../../components/EditProfile";
import Image from "next/image";
import { useAuth } from "../../context";

const UserProfile = ({ userDetail }) => {
  const [editProfile, setEditProfile] = useState(false);
  const { logoutUser } = useAuth();
  console.log({ editProfile });
  console.log({ userDetail });
  return (
    <>
      <div className={profileStyles.profileCard}>
        {editProfile && (
          <EditProfile
            setEditProfile={setEditProfile}
            userDetail={userDetail}
          />
        )}
        <button
          onClick={() => setEditProfile(!editProfile)}
          className={profileStyles.iconBtn}
        >
          <Image src='/images/edit.png' width='34px' height='34px' />
        </button>
        <h1>Profile</h1>
        <h3>
          Name: {userDetail.fullName ? userDetail.fullName : "You Full Name"}
        </h3>
        <p>Discord: {userDetail.username}</p>
        <p>Email: {userDetail.email}</p>
        <p>
          Portfolio:{" "}
          {userDetail.portfolio ? userDetail.portfolio : "Your Portfolio Link"}
        </p>
        <p>Interviews Done: {userDetail.interviewDone}</p>

        <button
          onClick={() => logoutUser()}
          className={profileStyles.btnSecondary}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  let userDetail = await UserCredential.findById(params.userId).lean();
  userDetail = JSON.parse(JSON.stringify(userDetail));

  console.log(userDetail);

  // console.log({ params });
  // const authToken = localStorage.getItem("token");
  // // console.log({ context });

  // let response = await fetch(`/api/userDetail/${params.userId}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: authToken,
  //   },
  // });
  // const data = await response.json();
  // console.log({ data });
  // return { props: { userDetail: data.userDetail } };
  // // return { props: { userDetail: {} } };
  return { props: { userDetail } };
}

export default PrivateRoute(UserProfile);
