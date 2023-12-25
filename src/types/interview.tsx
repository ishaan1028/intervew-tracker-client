export type Status = "pending" | "completed";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type InterviewType = {
  _id?: string;
  name: string;
  status: Status;
  feedback?: string;
  rating?: Rating;
};
