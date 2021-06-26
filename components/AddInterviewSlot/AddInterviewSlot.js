import { useState } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import { addInterviewSlot } from "../../serviceCalls";
import formStyles from "../../styles/Form.module.css";

export const AddInterviewSlot = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return (
    <div>
      <h1>Add New Interview Slot</h1>
      <form
        onSubmit={(e) =>
          addInterviewSlot(
            e,
            authState,
            dateAndTime,
            setDateAndTime,
            interviewSlotDispatch
          )
        }
      >
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
