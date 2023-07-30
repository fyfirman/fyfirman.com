import React from "react";
import styled from "styled-components";

const Container = styled.a`
  background: none;
  cursor: pointer;
  width: 100%;
  border: 1px solid var(--border-card);
  font-family: var(--base-font);
  padding: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const TitleText = styled.span`
  color: var(--text-body);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 31px;
`;
const DescriptionText = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
`;
const UrlText = styled.span`
  color: var(--text-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  margin-top: 8px;
`;

interface BookmarkProps {
  title?: string;
  description?: string;
  url: string;
  icoUrl?: string;
  isLoading?: boolean;
  style?: React.CSSProperties;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, description, url, icoUrl, isLoading = true, style }) => {
  if (isLoading) {
    return (
      <Container style={style}>
        <TitleText>Loading...</TitleText>
      </Container>
    );
  }

  if (!title) {
    return (
      <Container style={style}>
        <TitleText>{url}</TitleText>
      </Container>
    );
  }

  return (
    <Container href={url} target="_blank" style={style}>
      <TitleContainer>
        {icoUrl ? <img alt={`${title} icon`} src={icoUrl} width={24} height={24} /> : undefined}
        <TitleText>{title}</TitleText>
      </TitleContainer>
      <DescriptionText>{description}</DescriptionText>
      <UrlText>{url}</UrlText>
    </Container>
  );
};

export default Bookmark;
