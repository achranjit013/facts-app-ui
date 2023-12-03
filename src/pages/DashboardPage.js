import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { FactsList } from "../components/FactsList";
import { Category } from "../components/Category";
import { styled } from "styled-components";
import { getAllFacts, getAllFactsByUserId } from "../helper/axiosHelper";
import { CustomFactModal } from "../components/CustomFactModal";
import { FactPostForm } from "../components/FactPostForm";

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const DashboardBody = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 48px;
  height: calc(100vh - 160px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    height: calc(100vh - 215px);
  }
`;

export const DashboardPage = () => {
  const [factsList, setFactsList] = useState([]);
  const [filteredFact, setFilteredFact] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editFormObj, setEditFormObj] = useState({});

  useEffect(() => {
    getFacts();
  }, []);

  const getFacts = async () => {
    const userJson = sessionStorage.getItem("user");
    const userObj = JSON.parse(userJson);

    if (userObj) {
      const { status, result } = await getAllFactsByUserId();

      if (status === "success") {
        setFilteredFact(result);
        setFactsList(result);
      }
    } else {
      const { status, result } = await getAllFacts();

      if (status === "success") {
        setFilteredFact(result);
        setFactsList(result);
      }
    }
  };

  const handleOnClick = (catName) => {
    setCurrentCategory("");
    let filteredList = [];

    if (catName === "all") {
      filteredList = factsList;
    } else {
      filteredList = factsList.filter((item) => item.category === catName);
    }

    setFilteredFact(filteredList);
    setCurrentCategory(catName);
  };

  const handleOnEdit = (editObj) => {
    setIsEdit(true);
    setEditFormObj(editObj);
    setModalShow(true);
  };

  return (
    <>
      <CustomFactModal
        isedit={isEdit ? "true" : "false"}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setIsEdit(false);
        }}
      >
        <FactPostForm
          hideModal={() => setModalShow(false)}
          categories={categories}
          getFacts={getFacts}
          isEdit={isEdit}
          editFormObj={editFormObj}
        />
      </CustomFactModal>

      <DashboardHeader
        categories={categories}
        getFacts={getFacts}
        showModal={() => setModalShow(true)}
      />
      <DashboardBody>
        <Category categories={categories} handleOnClick={handleOnClick} />
        <FactsList
          getFacts={getFacts}
          factsList={filteredFact}
          categories={categories}
          currentCategory={currentCategory}
          handleOnEdit={handleOnEdit}
        />
      </DashboardBody>
    </>
  );
};
