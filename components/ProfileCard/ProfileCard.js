export const ProfileCard = ({ userDetail }) => {
  console.log(2, { userDetail });

  return (
    <>
      <h1>Profile</h1>
      <h3>
        Name: {userDetail?.fullName ? userDetail.fullName : "You Full Name"}
      </h3>
      <p>Discord: {userDetail?.username}</p>
      <p>Email: {userDetail?.email}</p>
      <p>
        Portfolio:{" "}
        {userDetail?.portfolio ? userDetail.portfolio : "Your Portfolio Link"}
      </p>
      <p>Interviews Done: {userDetail?.interviewDone}</p>
    </>
  );
};
