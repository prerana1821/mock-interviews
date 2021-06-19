export const formatedUrl = (url) => {
  const formatedUrl = url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0];
  console.log({ formatedUrl });
  return formatedUrl;
};

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
