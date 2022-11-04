import { useState } from "react";
import { useAuth } from "../../context";
import editProfileStyles from "./EditProfile.module.css";
import formStyles from "../../styles/Form.module.css";
import { editUserDetails } from "../../serviceCalls";
import Image from "next/image";
import { UserDetails } from "../../context/Auth.types";

export type EditUserDetails = Omit<UserDetails, "email" | "fullName" | "_id">;

export const EditProfile = ({ userDetail, setEditProfile }) => {
  const [details, setDetails] = useState<EditUserDetails>({
    username: userDetail.username,
    portfolio: userDetail.portfolio,
    interviewDone: userDetail.interviewDone,
  });

  const { authState, authDispatch } = useAuth();

  return (
    <div className={editProfileStyles.editProfile}>
      <form
        onSubmit={(event) =>
          editUserDetails({
            event,
            authState,
            authDispatch,
            username: details.username,
            portfolio: details.portfolio,
            interviewDone: details.interviewDone,
            setEditProfile,
          })
        }
        className={editProfileStyles.editProfileForm}
      >
        <button
          onClick={() => setEditProfile(false)}
          className={editProfileStyles.closeBtn}
        >
          <Image
            src='/images/close.png'
            width='38'
            height='38'
            alt='close button'
          />
        </button>
        <div className={formStyles.inputBox}>
          <input
            type='text'
            value={details.username}
            className={formStyles.input}
            pattern={"^.{3,32}#[0-9]{4}$"}
            title='Example: john#6765'
            placeholder='Enter your username eg. Name#0000'
            onChange={(e) =>
              setDetails((state) => ({ ...state, username: e.target.value }))
            }
          />
          <span className={formStyles.focusBorder}></span>
        </div>
        <div className={formStyles.inputBox}>
          <input
            type='text'
            value={details.portfolio}
            placeholder='Enter your Portfolio link'
            className={formStyles.input}
            onChange={(e) =>
              setDetails((state) => ({ ...state, portfolio: e.target.value }))
            }
          />
          <span className={formStyles.focusBorder}></span>
        </div>
        <div className={formStyles.inputBox}>
          <input
            type='number'
            value={details.interviewDone}
            placeholder='Interviews Done'
            className={formStyles.input}
            onChange={(e) =>
              setDetails((state) => ({
                ...state,
                interviewDone: +e.target.value,
              }))
            }
          />
          <span className={formStyles.focusBorder}></span>
        </div>
        <button className='btnPrimary' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};
