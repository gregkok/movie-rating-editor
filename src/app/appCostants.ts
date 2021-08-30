export const ratingRange = ["1", "2", "3", "4", "5"];
export const rootUrl = "http://localhost:3000/movies";
export const spaceCode = "%20";
export const backslash = "/";
export const queryCode = "?q=";
export const rating = "rating="
export const and = "&";
export const questionMark = "?"
export const errorMessage = "Something went wrong, please try again";

export interface DialogData {
    id: number;
    name: string;
    year: string;
    genre: string
    rating: string;
    cast?: [];
  }