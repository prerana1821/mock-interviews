import { Dispatch, SetStateAction } from "react";
import { UserState } from "../context/Auth.types";
import { InterviewSlotAction } from "../context/Interview.types";

type ConnectWithUserParams = {
  interviewId: string;
  authState: UserState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
  setShowLoginAlert: Dispatch<SetStateAction<boolean>>;
  gapi: any;
  CLIENT_ID: string;
  API_KEY: string;
  SCOPES: string;
};

let GoogleAuth;
const CLIENT_ID =
  "863578440757-fb81u1g8ht6flj68aau1op47k6rj1msl.apps.googleusercontent.com";
const API_KEY = "AIzaSyADkO_oXckoz7YIjM9BXZQDi69oGruLcsc";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const event = {
  summary: "Awesome Event 2!",
  location: "Mumbai, India",
  description: "Really great refreshments",
  start: {
    dateTime: "2022-11-05T09:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: "2022-11-05T17:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  attendees: [
    { email: "snehalnawar8263@gmail.com" },
    { email: "prerananawar1@gmail.com" },
  ],
  conferenceData: {
    createRequest: {
      requestId: "zzz",
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

export const connectWithUser = async ({
  interviewId,
  authState,
  interviewSlotDispatch,
  setShowLoginAlert,
  gapi,
  CLIENT_ID,
  API_KEY,
  SCOPES,
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

      // const response = await fetch(
      //   `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${interviewId}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: authState.token,
      //     },
      //     body: JSON.stringify({ partner: authState.user._id }),
      //   }
      // );
      // const data = await response.json();

      window.gapi.load("client:auth2", () => {
        console.log("loaded client");
        window.gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            plugin_name:
              "App Name that you used in google developer console API",
          })
          .then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.isSignedIn.listen(updateSigninStatus);
            setSigninStatus();

            window.gapi.client.load("calendar", "v3", () => {
              const user = GoogleAuth.currentUser.get();
              const isAuthorized = user.hasGrantedScopes(SCOPES);
              if (isAuthorized) {
                createEvent();
              } else {
                GoogleAuth.signIn().then(() => {
                  const user = GoogleAuth.currentUser.get();
                  const isAuthorized = user.hasGrantedScopes(SCOPES);
                  if (isAuthorized) {
                    createEvent();
                  }
                });
              }
            });
          });
      });
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
  const isAuthorized = user.hasGrantedScopes(SCOPES);
  if (isAuthorized) {
    console.log("Signed In");
  } else {
    console.log("Signed Out");
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

function createEvent() {
  const request = window.gapi.client.calendar?.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: "1",
  });
  request.execute((reqEvent: any) => {
    console.log(reqEvent);
    console.log("SUCCESSFUL");
  });
}
