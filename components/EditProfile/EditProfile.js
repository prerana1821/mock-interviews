import { useState } from "react";
import { useAuth } from "../../context";
import editProfileStyles from "./EditProfile.module.css";
import formStyles from "../../styles/Auth.module.css";
import Image from "next/image";

export const EditProfile = ({ userDetail, setEditProfile }) => {
  console.log({ userDetail });

  const [details, setDetails] = useState({
    fullName: userDetail.fullName,
    portfolio: userDetail.portfolio,
    interviewDone: userDetail.interviewDone,
  });

  const { authState, authDispatch } = useAuth();

  const editUserDetails = async (e) => {
    e.preventDefault();
    console.log({ userDetail });
    console.log(details);
    const response = await fetch(`/api/userDetail/${userDetail._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify({
        fullName: details.fullName,
        portfolio: details.portfolio,
        interviewDone: details.interviewDone,
      }),
    });

    const data = await response.json();
    console.log({ data });
    if (data.success) {
      // setUser({
      //   ...user,
      //   portfolio: data.portfolio,
      //   fullName: data.fullName,
      //   interviewDone: data.interviewDone,
      // });
      authDispatch({
        type: "UPDATE_USER",
        payload: {
          portfolio: data.data.portfolio,
          fullName: data.data.fullName,
          interviewDone: data.data.interviewDone,
        },
      });
      setEditProfile(false);
    }
  };

  return (
    <div className={editProfileStyles.editProfile}>
      <form
        onSubmit={editUserDetails}
        className={editProfileStyles.editProfileForm}
      >
        <button
          onClick={() => setEditProfile(false)}
          className={editProfileStyles.closeBtn}
        >
          <Image src='/images/close.png' width='38px' height='38px' />
        </button>
        <div className={formStyles.inputBox}>
          <input
            type='text'
            value={details.fullName}
            className={formStyles.input}
            placeholder='Enter your Full Name'
            onChange={(e) =>
              setDetails((state) => ({ ...state, fullName: e.target.value }))
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
            className={formStyles.input}
            onChange={(e) =>
              setDetails((state) => ({
                ...state,
                interviewDone: e.target.value,
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
