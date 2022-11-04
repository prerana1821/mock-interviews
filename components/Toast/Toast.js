import { useEffect } from "react";
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
  const { authDispatch } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  useEffect(() => {
    let timerid = setTimeout(() => {
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

  return (
    <>
      { checkUndefined && (
        <div className={ styles.status }>
          <div className='tl-content-error'>
            <p>
              <Image src='/images/status.svg' width='30' height='30' alt='status' />
              { authStateLoading ||
                authStateError ||
                authStateSuccess ||
                interviewSlotLoading ||
                interviewSlotError ||
                interviewSlotSuccess }
            </p>
          </div>
        </div>
      ) }
    </>
  );
};
