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
  console.log({ gapi, CLIENT_ID, API_KEY, SCOPES });

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

      // console.log({ data });

      console.log(1, { window });

      // window.triggerGoogleLoaded = function () {
      console.log("Cool");

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
            // window.gapi.client.load("calendar", "v3", () =>
            //   console.log("bam!")
            // );
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(updateSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.)
            const user = GoogleAuth.currentUser.get();
            setSigninStatus();

            window.gapi.client.load("calendar", "v3", () => {
              console.log("bam!");
              const isAuthorized = user.hasGrantedScopes(SCOPES);
              console.log({ isAuthorized });
              if (isAuthorized) {
                const request = window.gapi.client.calendar?.events.insert({
                  calendarId: "primary",
                  resource: event,
                  conferenceDataVersion: "1",
                });

                console.log({ request });

                request.execute((reqEvent: any) => {
                  console.log(reqEvent);
                  console.log("SUCCESSFUL");
                  // window.open(reqEvent.htmlLink);
                });
              } else {
                console.log("NEWS");
                GoogleAuth.signIn().then(() => {
                  const user = GoogleAuth.currentUser.get();
                  console.log({ user });

                  const isAuthorized = user.hasGrantedScopes(SCOPES);
                  console.log(2, { isAuthorized });
                  if (isAuthorized) {
                    const request = window.gapi.client.calendar?.events.insert({
                      calendarId: "primary",
                      resource: event,
                      conferenceDataVersion: "1",
                    });

                    console.log({ request });

                    request.execute((reqEvent: any) => {
                      console.log(reqEvent);
                      console.log("SUCCESSFUL");
                      // window.open(reqEvent.htmlLink);
                    });
                  }
                });
              }
            });

            // else {
            //   GoogleAuth.signIn();
            // }
            // Call handleAuthClick function when user clicks on
            //      "Sign In/Authorize" button.
            // $("#sign-in-or-out-button").click(function () {
            //   handleAuthClick();
            // });
            // $("#revoke-access-button").click(function () {
            //   revokeAccess();
            // });
          });

        // window.gapi.client.load("calendar", "v3", () => console.log("bam!"));

        // window.gapi.auth2
        //   .getAuthInstance()
        //   .signIn()
        //   .then(() => {
        //     const event = {
        //       summary: "Awesome Event 2!",
        //       location: "Mumbai, India",
        //       description: "Really great refreshments",
        //       start: {
        //         dateTime: "2022-11-05T09:00:00-07:00",
        //         timeZone: "America/Los_Angeles",
        //       },
        //       end: {
        //         dateTime: "2022-11-05T17:00:00-07:00",
        //         timeZone: "America/Los_Angeles",
        //       },
        //       attendees: [
        //         { email: "snehalnawar8263@gmail.com" },
        //         { email: "prerananawar1@gmail.com" },
        //       ],
        //       conferenceData: {
        //         createRequest: {
        //           requestId: "zzz",
        //           conferenceSolutionKey: {
        //             type: "hangoutsMeet",
        //           },
        //         },
        //       },
        //       reminders: {
        //         useDefault: false,
        //         overrides: [
        //           { method: "email", minutes: 24 * 60 },
        //           { method: "popup", minutes: 10 },
        //         ],
        //       },
        //     };

        //     const request = window.gapi.client.calendar?.events.insert({
        //       calendarId: "primary",
        //       resource: event,
        //       conferenceDataVersion: "1",
        //     });

        //     request.execute((reqEvent: any) => {
        //       console.log(reqEvent);
        //       if (data.success && reqEvent.htmlLink) {
        //         console.log("Nice");
        //         interviewSlotDispatch({
        //           type: "UPDATE_INTERVIEW_SLOTS",
        //           payload: { interviewSlot: data.data },
        //         });
        //       }
        //       // window.open(reqEvent.htmlLink);
        //     });
        //   });
      });
      // };
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

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus() {
  const user = GoogleAuth.currentUser.get();
  const isAuthorized = user.hasGrantedScopes(SCOPES);
  if (isAuthorized) {
    console.log("Signed In");
    // window.gapi.client.load("calendar", "v3", () => console.log("bam!"));
    // $("#sign-in-or-out-button").html("Sign out");
    // $("#revoke-access-button").css("display", "inline-block");
    // $("#auth-status").html(
    //   "You are currently signed in and have granted " + "access to this app."
    // );
  } else {
    // GoogleAuth.signIn();
    console.log("Signed Out");

    // $("#sign-in-or-out-button").html("Sign In/Authorize");
    // $("#revoke-access-button").css("display", "none");
    // $("#auth-status").html(
    //   "You have not authorized this app or you are " + "signed out."
    // );
  }
}

function updateSigninStatus() {
  setSigninStatus();
}
