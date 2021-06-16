import { useState } from "react";
import { useAuth, useInterviewSlot } from "../context";

export const AddInterviewSlot = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const { user, token } = useAuth();
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();

  const addInterviewSlot = async (e) => {
    e.preventDefault();
    console.log({ dateAndTime });
    const response = await fetch(`/api/interviewSlot/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        dateAndTime,
      }),
    });

    const { data } = await response.json();
    console.log({ data });
    console.log(data.slots);
    if (data.success) {
      interviewSlotDispatch({
        type: "ADD_INTERVIEW_SLOT",
        payload: { slots: data.slots },
      });
    }
  };

  return (
    <div>
      <h1>Add New Interview Slot</h1>
      <form onSubmit={addInterviewSlot}>
        <input
          type='datetime-local'
          value={dateAndTime}
          onChange={(e) => setDateAndTime(() => e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};
