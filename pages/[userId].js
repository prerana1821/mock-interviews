import PrivateRoute from "../components/PrivateRoute";
import dbConnect from "../middlewares/db.connect";
// import UserCredential from "../models/UserCredential";

const UserProfile = ({ userDetail }) => {
  console.log({ userDetail });
  return (
    <div>
      <h2>UserDetail</h2>
    </div>
  );
};

// export const getStaticProps = async () => {

// }

export async function getServerSideProps({ params }) {
  await dbConnect();

  // let userDetail = await UserCredential.findById(params.userId).lean();
  // userDetail = JSON.parse(JSON.stringify(userDetail));

  // console.log(userDetail);

  console.log({ params });
  const authToken = localStorage.getItem("token");
  // console.log({ context });

  let response = await fetch(`/api/userDetail/${params.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  });
  const data = await response.json();
  console.log({ data });
  return { props: { userDetail: data.userDetail } };
  // return { props: { userDetail: {} } };
}

export default PrivateRoute(UserProfile);
