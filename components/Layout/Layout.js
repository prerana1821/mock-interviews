import { useAuth, useInterviewSlot } from "../../context";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Toast } from "../Toast/Toast";

export const Layout = ({ children }) => {
  const { authState } = useAuth();
  const { interviewSlotState } = useInterviewSlot();

  console.log(authState.status);
  console.log(interviewSlotState.status);

  return (
    <div>
      <Header />
      <main className='mainLayout'>{children}</main>
      <Toast
        authStateLoading={authState.status?.loading}
        authStateError={authState.status?.error}
        authStateSuccess={authState.status?.success}
        interviewSlotLoading={interviewSlotState.status?.loading}
        interviewSlotError={interviewSlotState.status?.error}
        interviewSlotSuccess={interviewSlotState.status?.success}
      />
      <Footer />
    </div>
  );
};
