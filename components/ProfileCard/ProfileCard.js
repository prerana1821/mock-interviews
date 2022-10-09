import { formatedUrl } from "../../utils";

export const ProfileCard = ({ userDetail }) => {
  return (
    <>
      <h1>Profile</h1>
      <h3>
        Name: { userDetail?.fullName ? userDetail.fullName : "You Full Name" }
      </h3>
      <p>Discord Id: { userDetail?.username }</p>
      <p>Email: { userDetail?.email }</p>
      <p>
        Portfolio:{ " " }
        { userDetail?.portfolio ? (
          <a
            target='_blank'
            className='blueTxt'
            href={ `${userDetail.portfolio}` }
          >
            { formatedUrl(userDetail.portfolio) }
          </a>
        ) : (
          "Your Portfolio Link"
        ) }
      </p>

      <p>Interviews Done: { userDetail?.interviewDone }</p>
    </>
  );
};
