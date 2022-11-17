import { useEffect, useState } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import { EditProfile, ScheduledInterviewSlot } from "../../components";
import { AddInterviewSlot } from "../../components";
import { UserInterviewSlot, Alert } from "../../components";
import { ProfileCard } from "../../components";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import profileStyles from "../../styles/Profile.module.css";
import { scheduledSlots } from "../../utils";
import { GetServerSideProps } from "next";
import { Slots } from "../../context/InterviewSlot/InterviewSlot.types";
import { useTheme } from "../../context/Theme/Theme";

const UserProfile = ({ slots }: { slots: Slots }) => {
  const [editProfile, setEditProfile] = useState(false);
  const { authState } = useAuth();
  const { theme } = useTheme();
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const [showUsernameAlert, setShowUsernameAlert] = useState(false);

  const scheduledInterviews = scheduledSlots(
    interviewSlotState.interviewSlots,
    authState.user?._id
  );

  useEffect(() => {
    if (slots && typeof slots !== null) {
      if (typeof slots === "string") {
        interviewSlotDispatch({
          type: "SET_STATUS",
          payload: {
            status: { success: "You haven't scheduled any interview slot!" },
          },
        });
      } else {
        interviewSlotDispatch({
          type: "LOAD_USER_INTERVIEW_SLOTS",
          payload: { slots },
        });
      }
    } else {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: { status: { error: "Couldn't load user interview slot!" } },
      });
    }
  }, [slots]);

  return (
    <section style={{ padding: "0 15%", ...theme }}>
      {showUsernameAlert && (
        <Alert
          title='Ohh No!'
          description='Hey, you need to fill your discord id before scheduling interviews!'
          actions={
            <button
              className='btnSecondary'
              onClick={() => setShowUsernameAlert(false)}
            >
              Cancel
            </button>
          }
        />
      )}
      <div className={profileStyles.profile}>
        <div
          className={profileStyles.profileCard}
          style={{ boxShadow: theme.primaryBoxShadow, ...theme }}
        >
          {editProfile && (
            <EditProfile
              setEditProfile={setEditProfile}
              userDetail={authState.user}
            />
          )}

          <ProfileCard
            userDetail={authState.user}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
        </div>
        <div
          className={profileStyles.interviewSlotForm}
          style={{ boxShadow: theme.primaryBoxShadow, ...theme }}
        >
          <AddInterviewSlot setShowUsernameAlert={setShowUsernameAlert} />
        </div>
      </div>
      <div>
        {interviewSlotState.userInterViewSlots.slots.length === 0 ? (
          <h1 className='textCenter'>You haven't added any slots yet!</h1>
        ) : (
          <UserInterviewSlot userDetail={authState.user} />
        )}
      </div>
      <div>
        {scheduledInterviews.length === 0 ? (
          <h1 className='textCenter'>
            Your interview slots have not matched with anyone yet!
          </h1>
        ) : (
          <ScheduledInterviewSlot />
        )}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.cookies.token;

  let userInterviewDetails = null;
  try {
    let response = await fetch(
      `${process.env.API_URL}api/interviewSlot/${context.params.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );
    const data = await response.json();
    if (data.statusCode === 200) {
      userInterviewDetails =
        data?.data && JSON.parse(JSON.stringify(data?.data?.slots));
    } else {
      if (data.statusCode === 202) {
        userInterviewDetails = data?.data;
      }
    }
  } catch (error) {
    console.log({ error });
  }

  return {
    props: {
      slots: userInterviewDetails,
    },
  };
};

export default PrivateRoute(UserProfile);
