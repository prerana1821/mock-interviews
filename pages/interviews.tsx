import { useEffect, useState } from "react";
import interviewSlotStyles from "../styles/Interviews.module.css";
import AlertStyles from "../components/Alert/Alert.module.css";
import { ShowInterviewSlots, SideNav, Alert } from "../components";
import { useAuth, useInterviewSlot } from "../context";
import Image from "next/image";
import React from "react";
import { GetServerSideProps } from "next";
import { InterviewsSlots } from "../context/InterviewSlot/InterviewSlot.types";
import { useTheme } from "../context/Theme/Theme";

const Interviews = ({ interviewSlots }) => {
  const { authState, login } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const { theme } = useTheme();

  useEffect(() => {
    if (
      Object.entries(interviewSlots).length === 0 ||
      interviewSlots.length === 0
    ) {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          // status: { error: interviewSlots?.message },
          status: { loading: { actionType: "Loading interview slots" } },
        },
      });
    } else {
      if (interviewSlots?.type !== "error") {
        interviewSlotDispatch({
          type: "LOAD_INTERVIEW_SLOTS",
          payload: { interviewSlots },
        });
      } else {
        interviewSlotDispatch({
          type: "SET_STATUS",
          payload: {
            status: { error: interviewSlots.message },
          },
        });
      }
    }
  }, [interviewSlots]);

  let filteredSlots: InterviewsSlots[];

  if (authState.token) {
    filteredSlots = interviewSlotState.interviewSlots.filter(
      (interviewSlot) => {
        return authState.user._id !== interviewSlot.userId?._id;
      }
    );
  }

  return (
    <div className='interviewContainer' style={theme}>
      <div className='interviewPageLeft'>
        <SideNav />
      </div>

      <div className='interviewPageRight'>
        {showLoginAlert && (
          <Alert
            title='Ohh No!'
            description='Hey, you need to fill your discord id before scheduling interviews!'
            actions={
              <div className={AlertStyles.AlertActions}>
                <button
                  className='btnSecondary'
                  onClick={() => setShowLoginAlert(false)}
                >
                  Cancel
                </button>
                <button className='btnPrimary' onClick={() => login()}>
                  Login
                </button>
              </div>
            }
          />
        )}
        <h1 className='textCenter'>Open Interview Slots</h1>
        <p className='textCenter'>
          Use these available slots to schedule your mock interview.
        </p>
        {interviewSlotState.status?.loading?.actionType && (
          <div className='loading'>
            <Image
              src='/images/loading.svg'
              width='200'
              height='200'
              alt='loading'
            />
          </div>
        )}
        <div className={interviewSlotStyles.interviewSlots}>
          {filteredSlots ? (
            <ShowInterviewSlots
              slots={filteredSlots}
              setShowLoginAlert={setShowLoginAlert}
            />
          ) : (
            <ShowInterviewSlots
              slots={interviewSlotState.interviewSlots}
              setShowLoginAlert={setShowLoginAlert}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let interviewSlots;
  try {
    let response = await fetch(`${process.env.API_URL}api/interviewSlot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      interviewSlots = data.data;
    }
  } catch (error) {
    console.log({ error });
    interviewSlots = {
      type: "error",
      message: "Couldn't load interview slots! Try again later",
    };
  }
  return { props: { interviewSlots } };
};

export default Interviews;
