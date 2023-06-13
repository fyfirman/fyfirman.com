import React, { useState } from "react";
import Head from "@components/template/head";
import { Heading1, Heading2 } from "~/components/atomic/typography/typography";
import UrlServices from "~/services/url.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/utils/query-client";
import styled from "styled-components";

const CreateButton = styled.button`
  width: 100%;
  color: var(--text-button);
  font-family: var(--base-font);
  font-weight: 700;
  background-color: var(--bg-button);
  font-size: 0.875rem;
  border: none;
  padding: 8px;
  letter-spacing: 2px;
  box-shadow: 6px 6px var(--shadow-ava);
  transition: all 0.2s;
  border: 0.5px solid var(--shadow-ava);

  &:hover {
    transform: translateX(-6px) translateY(-6px);
    box-shadow: 12px 12px var(--shadow-ava);
    cursor: pointer;
  }

  &:active,
  &:focus {
    transform: translateX(3px) translateY(3px);
    box-shadow: 3px 3px var(--shadow-ava);
  }
`;

const Input = styled.input`
  width: 100%;
  color: var(--text-body);
  font-family: var(--base-font);
  font-weight: 500;
  font-size: 0.875rem;
  padding: 8px;
  background: none;
  appearance: none;
  border: 0.25px solid var(--border-input);
  border-radius: 0px;
  box-shadow: 0px 0px var(--shadow-ava);
  transition: all 0.2s;
`;

const ShortUrlInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

const ShortUrlManagement = () => {
  const [shortSlugUrl, setShortSlugUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, data } = useQuery({ queryKey: ["urls"], queryFn: UrlServices.getAllUrls });
  const mutation = useMutation({
    mutationFn: UrlServices.createShortUrl,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  const handleCreate = async () => {
    try {
      await mutation.mutateAsync({
        shortSlugUrl,
        longUrl,
      });
      setLongUrl("");
      setShortSlugUrl("");
    } catch (error: unknown) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div>
      <Head title="Short URL Management" />
      <Heading1>Short URL Management</Heading1>

      <Input
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="https://twitter.com/fyfirman/status/1477299863532412928"
        type="text"
      />
      <ShortUrlInputContainer>
        fyfirman.com/
        <Input onChange={(e) => setShortSlugUrl(e.target.value)} placeholder="short" type="text" />
      </ShortUrlInputContainer>
      {errorMessage}
      {mutation.isSuccess ? <span>URL Created</span> : null}
      <CreateButton disabled={mutation.isLoading} onClick={handleCreate}>
        Create
      </CreateButton>

      <Heading2>List</Heading2>

      {!isLoading && data ? (
        <table>
          <thead>
            <td>Short URL</td>
            <td>Long URL</td>
          </thead>
          {Object.entries(data).map(([shortUrl, longUrl]) => (
            <tr key={shortUrl}>
              <td>{shortUrl}</td>
              <td>
                <a href={longUrl} target="__blank">
                  {longUrl}
                </a>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <div> Loading</div>
      )}
    </div>
  );
};

export default React.memo(ShortUrlManagement);
