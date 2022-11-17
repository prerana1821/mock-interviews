import React, { Dispatch, SetStateAction, useState } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import { addInterviewSlot } from "../../serviceCalls";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useTheme } from "../../context/Theme/Theme";

export const AddInterviewSlot = ({
  setShowUsernameAlert,
}: {
  setShowUsernameAlert: Dispatch<SetStateAction<boolean>>;
}) => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();
  const { theme } = useTheme();

  return (
    <div>
      <h1 style={{ color: theme.lightText }}>Add New Interview Slot</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (
            authState?.user?.username ||
            authState?.user?.username !== undefined
          ) {
            addInterviewSlot({
              event,
              authState,
              dateAndTime,
              setDateAndTime,
              interviewSlotDispatch,
            });
          } else {
            setShowUsernameAlert(true);
          }
        }}
      >
        <br />
        <KeyboardDateTimePicker
          variant='inline'
          ampm={true}
          label='Enter date & time for the interview'
          value={dateAndTime}
          onChange={setDateAndTime}
          disablePast
          style={{ width: "300px", color: "#fff" }}
        />
        <br />
        <button className='btnPrimary' type='submit'>
          Add Slot
        </button>
      </form>
    </div>
  );
};
