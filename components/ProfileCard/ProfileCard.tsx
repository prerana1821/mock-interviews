import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UserDetails } from "../../context/Auth/Auth.types";
import { useTheme } from "../../context/Theme/Theme";
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
  const { theme } = useTheme();

  return (
    <>
      <div className={profileCardStyles.cardHeader}>
        <h1 style={theme}>Profile</h1>
        <div>
          <button
            onClick={() => setEditProfile(!editProfile)}
            className='btnIcon'
          >
            <Image
              src='/images/edit.png'
              width='30'
              height='30'
              alt='edit button'
            />
          </button>
        </div>
      </div>
      <h3 style={{ color: theme.lightText }}>
        Name: {userDetail?.fullName ? userDetail.fullName : "You Full Name"}
      </h3>
      <p style={{ color: theme.lightText }}>
        Discord Id: {userDetail?.username}
      </p>
      <p style={{ color: theme.lightText }}>Email: {userDetail?.email}</p>
      <p style={{ color: theme.lightText }}>
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

      <p style={{ color: theme.lightText }}>
        Interviews Done: {userDetail?.interviewDone}
      </p>
    </>
  );
};
