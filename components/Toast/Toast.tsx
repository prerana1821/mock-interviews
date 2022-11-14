import { useEffect } from "react";
import { useAuth, useInterviewSlot } from "../../context";
import styles from "./Toast.module.css";
import Image from "next/image";
import { Status } from "../../types";

type ToastProps = {
  [key in `authState${Capitalize<keyof Status>}`]: string;
} & {
  [key in `interviewSlot${Capitalize<keyof Status>}`]: string;
};

export const Toast = ({
  authStateLoading,
  authStateError,
  authStateSuccess,
  interviewSlotLoading,
  interviewSlotError,
  interviewSlotSuccess,
}: ToastProps): JSX.Element => {
  const { authDispatch } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  const statusCheck =
    authStateLoading ||
    authStateError ||
    authStateSuccess ||
    interviewSlotLoading ||
    interviewSlotError ||
    interviewSlotSuccess;

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
  }, [authDispatch, interviewSlotDispatch, statusCheck]);

  return (
    <>
      {statusCheck && (
        <div className={styles.status}>
          <div className='tl-content-error'>
            <p>
              <Image src='/images/status.svg' width='30' height='30' alt='' />
              {statusCheck}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
