import { useEffect, useState } from "react";
import interviewSlotStyles from "../styles/Interviews.module.css";
import { LoginAlert, ShowInterviewSlots } from "../components";
import { useAuth, useInterviewSlot } from "../context";
import Image from "next/image";

const Interviews = ({ interviewSlots }) => {
  const { authState } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();

  useEffect(() => {
    // if (
    //   Object.entries(interviewSlots).length === 0 ||
    //   interviewSlots.length === 0
    // ) {
    //   interviewSlotDispatch({
    //     type: "SET_STATUS",
    //     payload: {
    //       status: { loading: { loadingType: "Loading interview slots" } },
    //     },
    //   });
    // } else {
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
    // }
  }, [interviewSlots]);

  let filteredSlots;
  if (authState.token) {
    filteredSlots = interviewSlotState.interviewSlots.filter(
      (interviewSlot) => {
        return authState.user._id !== interviewSlot.userId?._id;
      }
    );
  }

  return (
    <div>
      {showLoginAlert && <LoginAlert setShowLoginAlert={setShowLoginAlert} />}
      <h1 className='textCenter'>Open Interview Slots</h1>
      <p className='textCenter'>
        Use these available slots to schedule your mock interview
      </p>
      {interviewSlotState.status?.loading?.loadingType && (
        <div className='loading'>
          <Image src='/images/loading.svg' width='200px' height='200px' />
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
  );
};

export async function getServerSideProps() {
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
}

export default Interviews;
