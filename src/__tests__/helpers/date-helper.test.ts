import {
  formatDateDifference,
  formatTimeStampToDateDifference,
  formatTimeStampToFullDate,
} from "~/helpers/date-helper";

describe("date-helper", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-01-23 9:00:00").getTime());
  });

  describe("formatTimeStampToFullDate", () => {
    it("should return correct full date with format (dd-MM-yyyy H:mm)", () => {
      expect(formatTimeStampToFullDate(1642095748989) === "14-01-2022 0:42").toBeTruthy();
      expect(formatTimeStampToFullDate(1642092748989) === "13-01-2022 23:52").toBeTruthy();
    });
  });

  describe("formatDateDifference", () => {
    it.each`
      input                   | expected
      ${"2022-01-23 9:00:01"} | ${"Invalid oldDate"}
      ${"2022-01-23 9:00:00"} | ${"Just now"}
      ${"2022-01-23 8:59:10"} | ${"Just now"}
      ${"2022-01-23 8:58:01"} | ${"Just now"}
      ${"2022-01-23 8:58:00"} | ${"2 minutes ago"}
      ${"2022-01-23 8:01:00"} | ${"59 minutes ago"}
      ${"2022-01-23 8:00:00"} | ${"About an hour ago"}
      ${"2022-01-23 7:55:00"} | ${"About an hour ago"}
      ${"2022-01-23 7:00:00"} | ${"2 hours ago"}
      ${"2022-01-23 0:00:00"} | ${"9 hours ago"}
      ${"2022-01-22 9:00:01"} | ${"23 hours ago"}
      ${"2022-01-22 9:00:00"} | ${"One day ago"}
      ${"2022-01-22 0:00:00"} | ${"One day ago"}
      ${"2022-01-21 9:00:00"} | ${"2 days ago"}
      ${"2022-01-20 9:00:00"} | ${"3 days ago"}
      ${"2022-01-17 9:00:00"} | ${"6 days ago"}
      ${"2022-01-16 9:00:00"} | ${"One week ago"}
      ${"2022-01-15 9:00:00"} | ${"One week ago"}
      ${"2022-01-09 9:00:00"} | ${"2 weeks ago"}
      ${"2022-01-02 9:00:00"} | ${"3 weeks ago"}
      ${"2021-12-23 9:00:00"} | ${"23-12-2021 9:00"}
    `("should return '$expected' when '$input' is provided", ({ input, expected }) => {
      expect(formatDateDifference(new Date(input as string))).toBe(expected);
    });
  });

  describe("formatTimeStampToDateDifference", () => {
    it.each`
      input                   | expected
      ${"2022-01-23 9:00:01"} | ${"Invalid oldDate"}
      ${"2022-01-23 9:00:00"} | ${"Just now"}
      ${"2022-01-23 8:59:10"} | ${"Just now"}
      ${"2022-01-23 8:58:01"} | ${"Just now"}
      ${"2022-01-23 8:58:00"} | ${"2 minutes ago"}
      ${"2022-01-23 8:01:00"} | ${"59 minutes ago"}
      ${"2022-01-23 8:00:00"} | ${"About an hour ago"}
      ${"2022-01-23 7:55:00"} | ${"About an hour ago"}
      ${"2022-01-23 7:00:00"} | ${"2 hours ago"}
      ${"2022-01-23 0:00:00"} | ${"9 hours ago"}
      ${"2022-01-22 9:00:01"} | ${"23 hours ago"}
      ${"2022-01-22 9:00:00"} | ${"One day ago"}
      ${"2022-01-22 0:00:00"} | ${"One day ago"}
      ${"2022-01-21 9:00:00"} | ${"2 days ago"}
      ${"2022-01-20 9:00:00"} | ${"3 days ago"}
      ${"2022-01-17 9:00:00"} | ${"6 days ago"}
      ${"2022-01-16 9:00:00"} | ${"One week ago"}
      ${"2022-01-15 9:00:00"} | ${"One week ago"}
      ${"2022-01-09 9:00:00"} | ${"2 weeks ago"}
      ${"2022-01-02 9:00:00"} | ${"3 weeks ago"}
      ${"2021-12-23 9:00:00"} | ${"23-12-2021 9:00"}
    `("should return '$expected' when '$input' is provided", ({ input, expected }) => {
      expect(formatTimeStampToDateDifference(new Date(input as string).getTime())).toBe(expected);
    });
  });
});
