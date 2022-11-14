import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UserDetails } from "../../context/Auth/Auth.types";
import { formatedUrl } from "../../utils";
import profileCardStyles from "./ProfileCard.module.css";

type ProfileCardProps = {
  userDetail: UserDetails;
  editProfile: boolean;
  setEditProfile: Dispatch<SetStateAction<boolean>>;
};

export const ProfileCard = ({
  userDetail,
  editProfile,
  setEditProfile,
}: ProfileCardProps): JSX.Element => {
  return (
    <>
      <div className={profileCardStyles.cardHeader}>
        <h1>Profile</h1>
        <div>
          <button
            onClick={() => setEditProfile(!editProfile)}
            className='btnIcon'
          >
            <Image src='/images/edit.png' width='30' height='30' alt='' />
          </button>
        </div>
      </div>
      <h3>
        Name: {userDetail?.fullName ? userDetail.fullName : "You Full Name"}
      </h3>
      <p>Discord Id: {userDetail?.username}</p>
      <p>Email: {userDetail?.email}</p>
      <p>
        Portfolio:{" "}
        {userDetail?.portfolio ? (
          <a
            target='_blank'
            className='blueTxt'
            href={`${userDetail.portfolio}`}
          >
            {formatedUrl(userDetail.portfolio)}
          </a>
        ) : (
          "Your Portfolio Link"
        )}
      </p>

      <p>Interviews Done: {userDetail?.interviewDone}</p>
    </>
  );
};
