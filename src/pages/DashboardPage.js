import React from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { FactsList } from "../components/FactsList";
import { Category } from "../components/Category";
import { styled } from "styled-components";

const DashboardBody = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 48px;

  height: calc(100vh - 48px - 68px - 40px);
`;

export const DashboardPage = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardBody>
        <Category />
        <FactsList />
      </DashboardBody>
    </>
  );
};
