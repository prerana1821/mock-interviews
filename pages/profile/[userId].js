import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../context";
import UserCredential from "../../models/UserCredential";
import InterviewSlot from "../../models/InterviewSlot";
import dbConnect from "../../middlewares/db.connect";
import { EditProfile } from "../../components";
import { AddInterviewSlot } from "../../components";
import { UserInterveiwSlot } from "../../components";
import { ProfileCard } from "../../components";
import PrivateRoute from "../../components/PrivateRoute";
import profileStyles from "../../styles/Profile.module.css";

const UserProfile = ({ userDetail, slots }) => {
  const [editProfile, setEditProfile] = useState(false);
  const { logoutUser } = useAuth();
  console.log({ editProfile });
  console.log({ userDetail });
  console.log({ slots });
  return (
    <>
      <div className={profileStyles.profile}>
        <div className={profileStyles.profileCard}>
          {editProfile && (
            <EditProfile
              setEditProfile={setEditProfile}
              userDetail={userDetail}
            />
          )}
          <button
            onClick={() => setEditProfile(!editProfile)}
            className='btnIcon'
          >
            <Image src='/images/edit.png' width='30px' height='30px' />
          </button>
          <ProfileCard userDetail={userDetail} />
          <button onClick={() => logoutUser()} className='btnSecondary'>
            Logout
          </button>
        </div>
        <div className={profileStyles.interviewSlotForm}>
          <AddInterviewSlot />
        </div>
      </div>
      <div>
        {slots.length === 0 ? (
          <h1 className='textCenter'>You haven't added any slots yet!</h1>
        ) : (
          <UserInterveiwSlot slots={slots} userDetail={userDetail} />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  let userDetail = await UserCredential.findById(params.userId).lean();
  userDetail = JSON.parse(JSON.stringify(userDetail));

  console.log(userDetail);

  let userInterviewDetails = await InterviewSlot.findOne({
    userId: params.userId,
  }).exec();

  userInterviewDetails = JSON.parse(JSON.stringify(userInterviewDetails));

  // console.log(userInterviewDetails.slots);
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
  return {
    props: {
      userDetail,
      slots: userInterviewDetails ? userInterviewDetails.slots : [],
    },
  };
}

export default PrivateRoute(UserProfile);
