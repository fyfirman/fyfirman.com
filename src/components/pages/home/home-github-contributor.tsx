import React from "react";
import styled from "styled-components";
import GithubContributor from "~/components/molecules/github-contributor";
import contributorData from "~/data/github-contribution-mock.json";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
`;

interface HomeGithubContributorProps {}

const HomeGithubContributor: React.FC<HomeGithubContributorProps> = () => {
  const contributorMap: Record<string, number> = {};

  contributorData.data.user.contributionsCollection.contributionCalendar.weeks.forEach((w) =>
    w.contributionDays.forEach((d) => {
      Object.assign(contributorMap, { [d.date]: d.contributionCount });
    }),
  );

  return (
    <Container>
      <GithubContributor data={contributorMap} />
    </Container>
  );
};

export default HomeGithubContributor;
