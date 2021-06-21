import { useEffect, useState, useRef } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import styles from "./Toast.module.css";
import Image from "next/image";

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
  //     authDispatch({ type: "SET_STATUS", payload: { status: null } });
  //     interviewSlotDispatch({ type: "SET_STATUS", payload: { status: null } });
  //   }, 3000);
  //   return () => {
  //     clearTimeout(toastVisible);
  //     setToastVisibility(true);
  //   };
  // }, [
  //   authDispatch,
  //   interviewSlotDispatch,
  // authStateLoading,
  // authStateError,
  // authStateSuccess,
  // interviewSlotLoading,
  // interviewSlotError,
  // interviewSlotSuccess
  // ]);

  const toastRef = useRef(null);
  useEffect(() => {
    let timerid = setTimeout(() => {
      // toastRef.current.style.display = "none";
      authDispatch({ type: "SET_STATUS", payload: { status: null } });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: { status: null },
      });
    }, 2000);

    return () => {
      clearTimeout(timerid);
    };
  }, [
    authDispatch,
    interviewSlotDispatch,
    authStateLoading,
    authStateError,
    authStateSuccess,
    interviewSlotLoading,
    interviewSlotError,
    interviewSlotSuccess,
  ]);

  const checkUndefined =
    authStateLoading ||
    authStateError ||
    authStateSuccess ||
    interviewSlotLoading ||
    interviewSlotError ||
    interviewSlotSuccess;
  // console.log({ toastVisibility });
  return (
    <>
      {
        // toastVisibility &&
        checkUndefined && (
          <div
            ref={toastRef}
            className={styles.status}
            // style={{ display: msg ? "block" : "none" }}
          >
            <div className='tl-content-error'>
              <p>
                <Image src='/images/status.svg' width='30px' height='30px' />
                {authStateLoading ||
                  authStateError ||
                  authStateSuccess ||
                  interviewSlotLoading ||
                  interviewSlotError ||
                  interviewSlotSuccess}
              </p>
            </div>
          </div>
        )
      }
    </>
  );
};
