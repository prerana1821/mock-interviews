import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth, useInterviewSlot } from "../../context";
import dbConnect from "../../middlewares/db.connect";
import { EditProfile, ScheduledInterviewSlot } from "../../components";
import { AddInterviewSlot } from "../../components";
import { UserInterviewSlot } from "../../components";
import { ProfileCard } from "../../components";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import profileStyles from "../../styles/Profile.module.css";

const UserProfile = ({ slots }) => {
  const [editProfile, setEditProfile] = useState(false);
  const { authState, logoutUser } = useAuth();
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();

  console.log("19", { slots });

  useEffect(() => {
    if (slots) {
      interviewSlotDispatch({
        type: "LOAD_USER_INTERVIEW_SLOT",
        payload: { slots },
      });
    }
  }, [slots]);

  return (
    <>
      <div className={profileStyles.profile}>
        <div className={profileStyles.profileCard}>
          {editProfile && (
            <EditProfile
              setEditProfile={setEditProfile}
              userDetail={authState.user}
            />
          )}
          <button
            onClick={() => setEditProfile(!editProfile)}
            className='btnIcon'
          >
            <Image src='/images/edit.png' width='30px' height='30px' />
          </button>
          <ProfileCard userDetail={authState.user} />
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
          <UserInterviewSlot userDetail={authState.user} />
        )}
      </div>
      <div>
        {interviewSlotState.interviewSlots.length === 0 ? (
          <h1 className='textCenter'>
            You haven't scheduled any interview slots yet!
          </h1>
        ) : (
          <ScheduledInterviewSlot />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const authToken = context.req.cookies.token;

  let response = await fetch(
    `http://localhost:3000/api/interviewSlot/${context.params.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }
  );
  const data = await response.json();
  let userInterviewDetails;
  if (data.success) {
    userInterviewDetails = JSON.parse(JSON.stringify(data.data.slots));
  }

  return {
    props: {
      slots: userInterviewDetails ? userInterviewDetails : [],
    },
  };
}

export default PrivateRoute(UserProfile);
