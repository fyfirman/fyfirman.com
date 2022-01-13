import {
  formatDateDifference,
  formatTimeStampToDateDifference,
  formatTimeStampToFullDate,
} from "~/helpers/date-helper";

describe("date-helper", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2021-01-23 9:00:00").getTime());
  });

  describe("formatTimeStampToFullDate", () => {
    it("should return correct full date with format (dd-MM-yyyy H:mm)", () => {
      expect(formatTimeStampToFullDate(1642095748989) === "14-01-2022 0:42").toBeTruthy();
      expect(formatTimeStampToFullDate(1642092748989) === "13-01-2022 23:52").toBeTruthy();
    });
  });

  describe("formatDateDifference", () => {
    it.each`
      input                    | expected
      ${"2021-01-23 9:00:00"}  | ${"Just now"}
      ${"2021-01-23 9:00:10"}  | ${"Just now"}
      ${"2021-01-23 9:01:00"}  | ${"Just now"}
      ${"2021-01-23 9:02:00"}  | ${"2 minutes ago"}
      ${"2021-01-23 9:59:00"}  | ${"59 minutes ago"}
      ${"2021-01-23 10:00:00"} | ${"About an hour ago"}
      ${"2021-01-23 10:05:00"} | ${"About an hour ago"}
      ${"2021-01-23 11:00:00"} | ${"2 hours ago"}
      ${"2021-01-23 18:00:00"} | ${"9 hours ago"}
      ${"2021-01-24 8:59:59"}  | ${"23 hours ago"}
      ${"2021-01-24 9:00:00"}  | ${"One day ago"}
      ${"2021-01-24 18:00:00"} | ${"One day ago"}
      ${"2021-01-25 9:00:00"}  | ${"2 days ago"}
      ${"2021-01-26 9:00:00"}  | ${"3 days ago"}
      ${"2021-01-29 9:00:00"}  | ${"6 days ago"}
      ${"2021-01-30 9:00:00"}  | ${"One week ago"}
      ${"2021-01-31 9:00:00"}  | ${"One week ago"}
      ${"2021-02-06 9:00:00"}  | ${"2 weeks ago"}
      ${"2021-02-13 9:00:00"}  | ${"3 weeks ago"}
      ${"2021-02-23 9:00:00"}  | ${"23-02-2021 9:00"}
    `("should return '$expected' when '$input' is provided", ({ input, expected }) => {
      expect(formatDateDifference(new Date(input as string))).toBe(expected);
    });
  });

  describe("formatTimeStampToDateDifference", () => {
    it.each`
      input                    | expected
      ${"2021-01-23 9:00:00"}  | ${"Just now"}
      ${"2021-01-23 9:00:10"}  | ${"Just now"}
      ${"2021-01-23 9:01:00"}  | ${"Just now"}
      ${"2021-01-23 9:02:00"}  | ${"2 minutes ago"}
      ${"2021-01-23 9:59:00"}  | ${"59 minutes ago"}
      ${"2021-01-23 10:00:00"} | ${"About an hour ago"}
      ${"2021-01-23 10:05:00"} | ${"About an hour ago"}
      ${"2021-01-23 11:00:00"} | ${"2 hours ago"}
      ${"2021-01-23 18:00:00"} | ${"9 hours ago"}
      ${"2021-01-24 8:59:59"}  | ${"23 hours ago"}
      ${"2021-01-24 9:00:00"}  | ${"One day ago"}
      ${"2021-01-24 18:00:00"} | ${"One day ago"}
      ${"2021-01-25 9:00:00"}  | ${"2 days ago"}
      ${"2021-01-26 9:00:00"}  | ${"3 days ago"}
      ${"2021-01-29 9:00:00"}  | ${"6 days ago"}
      ${"2021-01-30 9:00:00"}  | ${"One week ago"}
      ${"2021-01-31 9:00:00"}  | ${"One week ago"}
      ${"2021-02-06 9:00:00"}  | ${"2 weeks ago"}
      ${"2021-02-13 9:00:00"}  | ${"3 weeks ago"}
      ${"2021-02-23 9:00:00"}  | ${"23-02-2021 9:00"}
    `("should return '$expected' when '$input' is provided", ({ input, expected }) => {
      expect(formatTimeStampToDateDifference(new Date(input as string).getTime())).toBe(expected);
    });
  });
});
