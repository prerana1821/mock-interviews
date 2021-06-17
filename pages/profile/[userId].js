import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../context";
import UserCredential from "../../models/UserCredential";
import InterviewSlot from "../../models/InterviewSlot";
import dbConnect from "../../middlewares/db.connect";
import { EditProfile } from "../../components";
import { AddInterviewSlot } from "../../components";
import { UserInterviewSlot } from "../../components";
import { ProfileCard } from "../../components";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
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
          <UserInterviewSlot slots={slots} userDetail={userDetail} />
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
  return {
    props: {
      userDetail,
      slots: userInterviewDetails ? userInterviewDetails.slots : [],
    },
  };
}

export default PrivateRoute(UserProfile);
