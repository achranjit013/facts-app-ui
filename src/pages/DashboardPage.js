import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { FactsList } from "../components/FactsList";
import { Category } from "../components/Category";
import { styled } from "styled-components";
import { getAllFacts, getAllFactsByUserId } from "../helper/axiosHelper";

const DashboardBody = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 48px;

  height: calc(100vh - 48px - 68px - 40px);
`;

export const DashboardPage = () => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  const [factsList, setFactsList] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    getFacts();
  }, [userObj]);

  const getFacts = async () => {
    if (userObj) {
      const { status, message, result } = await getAllFactsByUserId();

      status === "success" && setFactsList(result);
      status === "error" && setResponse(message);
    } else {
      const { status, message, result } = await getAllFacts();

      status === "success" && setFactsList(result);
      status === "error" && setResponse(message);
    }
  };

  return (
    <>
      <DashboardHeader userObj={userObj} setResponse={setResponse} />
      <DashboardBody>
        <Category />
        <FactsList
          getFacts={getFacts}
          factsList={factsList}
          response={response}
        />
      </DashboardBody>
    </>
  );
};
