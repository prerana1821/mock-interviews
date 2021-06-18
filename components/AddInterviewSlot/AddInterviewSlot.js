import { useState } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import formStyles from "../../styles/Auth.module.css";

export const AddInterviewSlot = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  const addInterviewSlot = async (e) => {
    e.preventDefault();
    console.log({ dateAndTime });
    try {
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
      console.log({ data });
      console.log(data.data.slots);
      if (data.success) {
        interviewSlotDispatch({
          type: "ADD_INTERVIEW_SLOT",
          payload: { slots: data.data.slots },
        });
      }
    } catch (error) {
      console.log({ error });
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
