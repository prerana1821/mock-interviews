import { v4 } from "uuid";
import { Dispatch, SetStateAction } from "react";
import { getTimeFormatGMT } from "../utils/clientUtils/getTimeFormatGMT";
import { getInterviewEndTime } from "../utils/clientUtils/getInterviewEndTime";
import { UserState } from "../context/Auth/Auth.types";
import {
  InterviewSlotAction,
  InterviewsSlots,
  Slots,
} from "../context/InterviewSlot/InterviewSlot.types";

type ConnectWithUserParams = {
  slot: Slots;
  interviewSlot: InterviewsSlots;
  authState: UserState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
  setShowLoginAlert: Dispatch<SetStateAction<boolean>>;
  gapi: any;
};

let GoogleAuth;

export const connectWithUser = async ({
  slot,
  interviewSlot,
  authState,
  interviewSlotDispatch,
  setShowLoginAlert,
  gapi,
}: ConnectWithUserParams): Promise<void> => {
  if (authState.token) {
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            loading: { actionType: "Scheduling the interview slot...!" },
          },
        },
      });

      const response = await fetch(
        `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${slot._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify({
            partner: authState.user._id,
            // meetLink: reqEvent.hangoutLink,
          }),
        }
      );
      const data = await response.json();
      console.log({ data });
      if (data.success) {
        interviewSlotDispatch({
          type: "UPDATE_INTERVIEW_SLOTS",
          payload: { interviewSlot: data.data },
        });
      }

      // window.gapi.load("client:auth2", () => {
      //   console.log("loaded client");
      //   window.gapi.client
      //     .init({
      //       apiKey: process.env.NEXT_PUBLIC_API_KEY,
      //       clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      //       scope: process.env.NEXT_PUBLIC_SCOPES,
      //       plugin_name:
      //         "App Name that you used in google developer console API",
      //     })
      //     .then(function () {
      //       GoogleAuth = window.gapi.auth2.getAuthInstance();
      //       GoogleAuth.isSignedIn.listen(updateSigninStatus);
      //       setSigninStatus();

      //       window.gapi.client.load("calendar", "v3", () => {
      //         const user = GoogleAuth.currentUser.get();
      //         const isAuthorized = user.hasGrantedScopes(
      //           process.env.NEXT_PUBLIC_SCOPES
      //         );
      //         if (isAuthorized) {
      //           createEvent({
      //             slot,
      //             authState,
      //             interviewSlot,
      //             interviewSlotDispatch,
      //           });
      //         } else {
      //           GoogleAuth.signIn().then(() => {
      //             createEvent({
      //               slot,
      //               authState,
      //               interviewSlot,
      //               interviewSlotDispatch,
      //             });
      //           });
      //         }
      //       });
      //     });
      // });
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: { status: { error: "Couldn't connect! Try again later" } },
      });
    }
  } else {
    setShowLoginAlert(true);
  }
};

function setSigninStatus() {
  const user = GoogleAuth.currentUser.get();
  const isAuthorized = user.hasGrantedScopes(process.env.NEXT_PUBLIC_SCOPES);
  if (isAuthorized) {
    console.log("Signed In");
  } else {
    console.log("Signed Out");
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

function createEvent({
  slot,
  interviewSlot,
  authState,
  interviewSlotDispatch,
}) {
  const event = {
    summary: `Mock Interview with ${interviewSlot.userId.fullName}`,
    location: "Google Meet",
    description: "Need good copy for description",
    start: {
      dateTime: getTimeFormatGMT(slot.slot),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: getInterviewEndTime(slot.slot),
      timeZone: "Asia/Kolkata",
    },
    attendees: [
      {
        email: `${interviewSlot.userId.email}`,
      },
      {
        email: `${authState.user.email}`,
      },
    ],
    conferenceData: {
      createRequest: {
        requestId: v4(),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  const request = window.gapi.client.calendar?.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: "1",
    sendUpdates: "all",
  });
  request.execute(async (reqEvent: any) => {
    console.log(reqEvent);
    console.log(reqEvent.hangoutLink);
    console.log("SUCCESSFUL");
    const response = await fetch(
      `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${slot._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
        body: JSON.stringify({
          partner: authState.user._id,
          meetLink: reqEvent.hangoutLink,
        }),
      }
    );
    const data = await response.json();
    console.log({ data });
    if (data.success && reqEvent) {
      interviewSlotDispatch({
        type: "UPDATE_INTERVIEW_SLOTS",
        payload: { interviewSlot: data.data },
      });
    }
  });
}
