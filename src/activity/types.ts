export interface BoredActivity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

export type Accessibility = "High" | "Medium" | "Low";
export type Price = "Free" | "Low" | "High";

export interface Activity extends Omit<BoredActivity, "accessibility" | "price"> {
  accessibility: Accessibility;
  price: Price;
}

export interface GetActivityParams {
  minprice: number;
  maxprice: number;
  minaccessibility: number;
  maxaccessibility: number;
}
