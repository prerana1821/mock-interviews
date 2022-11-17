import {
  InterviewSlotAction,
  InterviewSlotState,
} from "../context/InterviewSlot/InterviewSlot.types";
import { interviewSlotReducer } from "./interviewSlotReducer";

describe("should test interview slot reducer", () => {
  test("should load interview slots", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "LOAD_INTERVIEW_SLOTS",
      payload: {
        interviewSlots: [
          {
            _id: "123",
            slots: [
              {
                partner: {},
                slot: new Date("12-11-2022"),
              },
            ],
            userId: {
              email: "",
              fullName: "",
              uid: "1",
              username: "",
              portfolio: "",
              interviewDone: "",
              _id: "1",
            },
          },
        ],
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [
        {
          _id: "123",
          slots: [
            {
              partner: {},
              slot: new Date("12-11-2022"),
            },
          ],
          userId: {
            email: "",
            fullName: "",
            uid: "1",
            username: "",
            portfolio: "",
            interviewDone: "",
            _id: "1",
          },
        },
      ],
      userInterViewSlots: { slots: [] },
      status: {},
    });
  });

  test("should update interview slots", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [
        {
          _id: "123",
          _v: 1,
          slots: [
            {
              _id: "123",
              slot: new Date("12-11-2022"),
            },
          ],
          userId: {
            email: "",
            fullName: "",
            uid: "1",
            username: "",
            portfolio: "",
            interviewDone: 0,
            _id: "1",
          },
        },
      ],
      userInterViewSlots: { slots: [] },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "UPDATE_INTERVIEW_SLOTS",
      payload: {
        interviewSlot: {
          _id: "123",
          _v: 1,
          slots: [
            {
              _id: "123",

              slot: new Date("12-11-2022"),
            },
          ],
          userId: {
            email: "",
            fullName: "",
            uid: "1",
            username: "",
            portfolio: "",
            interviewDone: 0,
            _id: "1",
          },
        },
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [
        {
          _id: "123",
          _v: 1,
          slots: [
            {
              _id: "123",
              slot: new Date("12-11-2022"),
            },
          ],
          userId: {
            email: "",
            fullName: "",
            uid: "1",
            username: "",
            portfolio: "",
            interviewDone: 0,
            _id: "1",
          },
        },
      ],
      userInterViewSlots: { slots: [] },
      status: {},
    });
  });

  test("should load user interview slots", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "LOAD_USER_INTERVIEW_SLOTS",
      payload: {
        slots: [
          {
            slot: new Date("12-11-2022"),
            _id: "098",
          },
        ],
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [],
      userInterViewSlots: {
        slots: [
          {
            slot: new Date("12-11-2022"),
            _id: "098",
          },
        ],
      },
      status: {},
    });
  });

  test("should add user interview slot", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: {
        slots: [
          { slot: new Date("12-11-2022"), _id: "111" },
          { slot: new Date("12-11-2022"), _id: "222" },
        ],
      },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "ADD_USER_INTERVIEW_SLOTS",
      payload: {
        slot: {
          slot: new Date("12-11-2022"),
          _id: "333",
        },
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [],
      userInterViewSlots: {
        slots: [
          { slot: new Date("12-11-2022"), _id: "111" },
          { slot: new Date("12-11-2022"), _id: "222" },
          { slot: new Date("12-11-2022"), _id: "333" },
        ],
      },
      status: {},
    });
  });

  test("should delete user interview slot", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: {
        slots: [
          { slot: new Date("12-11-2022"), _id: "111" },
          { slot: new Date("12-11-2022"), _id: "222" },
          { slot: new Date("12-11-2022"), _id: "333" },
        ],
      },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "DELETE_USER_INTERVIEW_SLOTS",
      payload: {
        interviewSlotId: "222",
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [],
      userInterViewSlots: {
        slots: [
          { slot: new Date("12-11-2022"), _id: "111" },
          { slot: new Date("12-11-2022"), _id: "333" },
        ],
      },
      status: {},
    });
  });

  test("should remove user interview slot", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: {},
    };
    const action: InterviewSlotAction = {
      type: "REMOVE_USER_INTERVIEW_SLOTS",
      payload: {},
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: null,
    });
  });
  test("should set status", () => {
    const initialState: InterviewSlotState = {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: {
        error: "",
        success: "",
        loading: {
          actionType: "",
        },
      },
    };
    const action: InterviewSlotAction = {
      type: "SET_STATUS",
      payload: {
        status: {
          loading: {
            actionType: "Loading interview slots data",
          },
        },
      },
    };

    const state = interviewSlotReducer(initialState, action);

    expect(state).toEqual({
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: {
        loading: {
          actionType: "Loading interview slots data",
        },
      },
    });
  });
});
