import React from "react";
import { Button } from "react-bootstrap";
import { styled } from "styled-components";

const SideBar = styled.ul``;

const CategoryList = styled.li`
  margin-bottom: 16px;
`;

const BtnAllCategory = styled(Button)`
  border: none;
  border-radius: 100px;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  line-height: 1;
  text-transform: uppercase;
  font-size: 17px;
  padding: 16px 0 13px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  margin-bottom: 16px;
  width: 100%;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

const BtnCategory = styled(Button)`
  border: none;
  border-radius: 100px;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  line-height: 1;
  text-transform: uppercase;
  font-size: 17px;
  padding: 16px 0 13px;
  background-image: linear-gradient(135deg, #3b82f6, #16a34a, #ef4444, #eab308);
  transition: 0.3s;

  width: 100%;
  background-image: none;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

export const Category = ({ categories, handleOnClick }) => {
  return (
    <aside>
      <SideBar>
        <CategoryList>
          <BtnAllCategory onClick={() => handleOnClick("all")}>
            All
          </BtnAllCategory>
        </CategoryList>

        {categories.map((item, i) => (
          <CategoryList key={i}>
            <BtnCategory
              style={{ background: item.color }}
              onClick={() => handleOnClick(item.name)}
            >
              {item.name}
            </BtnCategory>
          </CategoryList>
        ))}
      </SideBar>
    </aside>
  );
};
