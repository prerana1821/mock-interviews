export type Slots = {
  partner: Object;
  slot: Date;
  _id: string;
};

export type UserDetails = {
  fullName: string;
  userName: string;
  _id: string;
};

export type InterviewsSlots = {
  _id: string;
  _v: number;
  slots: Slots[];
  userId: UserDetails;
};

export type ErrorResponse = {
  type: string;
  message: string;
};
