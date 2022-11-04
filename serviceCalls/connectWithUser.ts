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

        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          plugin_name: "App Name that you used in google developer console API",
        });

        window.gapi.client.load("calendar", "v3", () => console.log("bam!"));

        window.gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
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

            const request = window.gapi.client.calendar?.events.insert({
              calendarId: "primary",
              resource: event,
              conferenceDataVersion: "1",
            });

            request.execute((reqEvent: any) => {
              console.log(reqEvent);
              window.open(reqEvent.htmlLink);
            });
          });
      });
      // };

      // if (data.success) {
      //   interviewSlotDispatch({
      //     type: "UPDATE_INTERVIEW_SLOTS",
      //     payload: { interviewSlot: data.data },
      //   });
      // }
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
