export interface DateAndPlaceDto {
  date: Date;
  place?: Place;
}

export interface Date {
  isDateKnown: boolean;
  isWithinARange: boolean;
  startYear: number;
  endYear: number;
  exactYear: number;
}

export interface Place {
  isPlaceKnown: boolean;
  location: string;
}
