import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import GithubContributor from "~/components/molecules/github-contributor";
import BlogServices from "~/services/blog.services";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
`;

interface HomeGithubContributorProps {}

const HomeGithubContributor: React.FC<HomeGithubContributorProps> = () => {
  const contributorQuery = useQuery(["github-contributor"], BlogServices.getGithubContribution);

  const contributorMap: Record<string, number> = {};

  contributorQuery.data?.data.data.weeks.forEach((w) =>
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
