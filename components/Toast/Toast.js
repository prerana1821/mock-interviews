import { useEffect, useRef } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import styles from "./Toast.module.css";

export const Toast = ({
  authStateLoading,
  authStateError,
  authStateSuccess,
  interviewSlotLoading,
  interviewSlotError,
  interviewSlotSuccess,
}) => {
  // const [toastVisibility, setToastVisibility] = useState(true);
  const { authDispatch } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  // console.log(11, { authStateLoading });

  // useEffect(() => {
  //   const toastVisible = setTimeout(() => {
  //     setToastVisibility(false);
  //     authDispatch({ type: "SET_STATUS", payload: { status: {} } });
  //     interviewSlotDispatch({ type: "SET_STATUS", payload: { status: {} } });
  //   }, 3000);
  //   return () => {
  //     clearTimeout(toastVisible);
  //   };
  // }, []);

  const toastRef = useRef(null);
  useEffect(() => {
    let timerid = setTimeout(() => {
      toastRef.current.style.display = "none";
    }, 2000);
    authDispatch({ type: "SET_STATUS", payload: { status: null } });
    interviewSlotDispatch({ type: "SET_STATUS", payload: { status: null } });
    return () => {
      clearTimeout(timerid);
    };
  }, []);

  return (
    <>
      {/* {toastVisibility && ( */}
      <div
        ref={toastRef}
        className={styles.status}
        // style={{ display: msg ? "block" : "none" }}
      >
        <div className='tl-content-error'>
          <p>
            {authStateLoading ||
              authStateError ||
              authStateSuccess ||
              interviewSlotLoading ||
              interviewSlotError ||
              interviewSlotSuccess}
          </p>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
