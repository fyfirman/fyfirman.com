import { add, format, startOfWeek, sub } from "date-fns";
import React from "react";
import styled from "styled-components";
import { dayNames, getMonthsAndWeeksForLastYearToNow } from "~/helpers/date-helper";

const Container = styled.table`
  table-layout: fixed;
  border-spacing: 3px;

  font-size: 12px;
  line-height: 13px;
`;

const TableHeaderRow = styled.tr``;

const TableHeaderData = styled.td``;

const TableBodyRow = styled.tr`
  height: 15px;
`;
const TableBodyData = styled.td<{ level: number }>`
  width: 15px;
  aspect-ratio: 1;
  background-color: ${({ level }) => `rgba(0, 0, 0,${level})`};
`;

interface GithubContributorProps {
  data: Record<string, number>;
}

const colSize = 54;

const GithubContributor: React.FC<GithubContributorProps> = ({ data }) => {
  return (
    <Container>
      <thead>
        <TableHeaderRow>
          {[{ monthName: "", weeks: 1 }, ...getMonthsAndWeeksForLastYearToNow()].map(({ monthName, weeks }, i) => {
            if (i === 0) {
              return <TableHeaderData key={monthName} colSpan={1} />;
            }
            return (
              <TableHeaderData key={`${monthName}_${i}`} colSpan={weeks}>
                {monthName}
              </TableHeaderData>
            );
          })}
        </TableHeaderRow>
      </thead>
      <tbody>
        {[...Array(7)].map((_, row) => {
          return (
            <TableBodyRow key={row}>
              {[...Array(colSize)].map((_a, col) => {
                if (col === 0) {
                  return (
                    <TableBodyData key={`${row}_${col}`} level={0}>
                      {row % 2 === 1 ? dayNames[row] : ""}
                    </TableBodyData>
                  );
                }

                const gridDate = add(
                  sub(
                    startOfWeek(new Date(), {
                      weekStartsOn: 1,
                    }),
                    { years: 1, weeks: 1 },
                  ),
                  {
                    days: col * 7 + row,
                  },
                );

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --- could be undefined
                const contributionCount = data[format(gridDate, "yyyy-MM-dd")] ?? 0;
                let level = gridDate.getTime() > new Date().getTime() ? 0 : 0.05;

                if (contributionCount > 20) {
                  level = 1;
                } else if (contributionCount > 15) {
                  level = 0.8;
                } else if (contributionCount > 10) {
                  level = 0.6;
                } else if (contributionCount >= 1) {
                  level = 0.25;
                }

                return <TableBodyData key={col} data-date={format(gridDate, "yyyy-MM-dd")} level={level} />;
              })}
            </TableBodyRow>
          );
        })}
      </tbody>
    </Container>
  );
};

export default GithubContributor;
