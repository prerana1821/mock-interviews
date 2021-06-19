import { useState } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import formStyles from "../../styles/Auth.module.css";

export const AddInterviewSlot = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  const addInterviewSlot = async (e) => {
    e.preventDefault();
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: { loading: "Adding interview slot..." },
        },
      });
      const response = await fetch(`/api/interviewSlot/${authState.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          dateAndTime,
        }),
      });
      const data = await response.json();
      if (data.success) {
        interviewSlotDispatch({
          type: "ADD_USER_INTERVIEW_SLOT",
          payload: { slot: data.data.slot },
        });
        setDateAndTime("");
      }
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: { error: "Couldn't add interview slot! Try again later" },
        },
      });
    }
  };

  return (
    <div>
      <h1>Add New Interview Slot</h1>
      <form onSubmit={addInterviewSlot}>
        <input
          type='datetime-local'
          required
          className={formStyles.input}
          value={dateAndTime}
          onChange={(e) => setDateAndTime(() => e.target.value)}
        />
        <br />
        <button className='btnPrimary' type='submit'>
          Add Slot
        </button>
      </form>
    </div>
  );
};
