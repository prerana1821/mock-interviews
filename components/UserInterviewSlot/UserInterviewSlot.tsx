import computedClassName from "classnames";
import { useAuth, useInterviewSlot } from "../../context";
import { formatTime } from "../../utils";
import userInterviewSlot from "./UserInterviewSlot.module.css";
import { deleteInterviewSlot } from "../../serviceCalls";
import Image from "next/image";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";
import { UserDetails } from "../../context/Auth/Auth.types";
import { Slots } from "../../context/InterviewSlot/InterviewSlot.types";
import { useTheme } from "../../context/Theme/Theme";

const pastTime = (item, date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(date) < new Date(yesterday) && !item.slot;
};

type UserInterviewSlotProps = {
  userDetail: UserDetails;
};

export const UserInterviewSlot = ({
  userDetail,
}: UserInterviewSlotProps): JSX.Element => {
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const { authState } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
      <div className={userInterviewSlot.interviewSlots}>
        {interviewSlotState?.userInterViewSlots?.slots
          ?.sort(
            (a: Slots, b: Slots): number =>
              +new Date(a.slot) - +new Date(b.slot)
          )
          .map((item: Slots) => {
            return (
              <div
                key={item._id}
                className={computedClassName({
                  [userInterviewSlot.greenInterviewSlot]: item.partner,
                  [userInterviewSlot.redInterviewSlot]: !item.partner,
                  // [userInterviewSlot.greyInterviewSlot]:
                  //   item.slot === null || pastTime(item, formatDate(item.slot)),
                })}
                style={{ boxShadow: theme.primaryBoxShadow, ...theme }}
              >
                {/* {!pastTime(item, formatDate(item.slot)) && ( */}
                <button
                  className='btnIcon'
                  onClick={() =>
                    deleteInterviewSlot({
                      slotId: item._id,
                      authState,
                      interviewSlotDispatch,
                    })
                  }
                >
                  <Image
                    src='/images/delete.png'
                    width='30'
                    height='30'
                    alt=''
                  />
                </button>
                <div
                  className={computedClassName({
                    [userInterviewSlot.greenInterviewSlotHR]: item.partner,
                    [userInterviewSlot.redInterviewSlotHR]: !item.partner,
                  })}
                >
                  <h3>@{userDetail?.username}</h3>
                  <p>{formatTime(item.slot)}</p>
                  <p>{formatDate(item.slot)}</p>
                  {item.partner && (
                    <div>
                      <h3>Partner:</h3>
                      <p>Discord Id: @{item.partner.username}</p>
                      <p>{item.partner.fullName}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
