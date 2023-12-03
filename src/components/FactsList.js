import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  deleteSelectedFact,
  updateVotesByFactsId,
} from "../helper/axiosHelper";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

// css
const FactUl = styled.ul`
  overflow: scroll;
`;

const FactLi = styled.li`
  font-size: 20px;
  line-height: 1.4;
  background: #44403c;
  margin-bottom: 16px;
  padding: 16px 24px;
  letter-spacing: -1px;
  border-radius: 16px;

  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

const FactSource = styled(Link)`
  color: #a8a29e;
  text-decoration: none;
  margin-left: 12px;
  transition: 0.3s;

  &: hover {
    color: #3b82f6;
  }

  &: active {
    color: #3b82f6;
  }
`;

const FactCategory = styled.span`
  font-family: "Coiny", sans-serif !important;
  font-size: 14px;
  text-transform: uppercase;
  padding: 3px 10px 0 10px;
  border-radius: 100px;
`;

const Disputed = styled.span`
  color: red;
  font-weight: 600;
  margin-right: 10px;
`;

const VoteBtnsContainer = styled.div`
  margin-left: auto;
  flex-shrink: 0;

  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    margin-left: inherit;
  }
`;

const VoteBtns = styled(Button)`
  border: none;
  border-radius: 100px;
  background: #78716c;
  color: inherit;
  font-family: inherit;
  font-weight: 600;
  font-size: 18px;
  padding: 6px 12px;
  cursor: pointer;
  transition: 0.3s;

  &: hover {
    background: #292524;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  color: inherit;
  font-family: "Coiny", sans-serif;
  font-weight: 500;

  &:hover {
    color: white;
    transition: color 0.3s;
  }
`;
// end css

export const FactsList = ({
  getFacts,
  factsList,
  categories,
  currentCategory,
  handleOnEdit,
}) => {
  const userJson = sessionStorage.getItem("user");
  const userObj = JSON.parse(userJson);

  const handleVotes = async (factObj) => {
    const data = await updateVotesByFactsId(factObj);

    if (data.status === "success") {
      if (factObj.votesType === "votesLike") {
        data.message = "Thank you for the like!";
      } else if (factObj.votesType === "votesDislike") {
        data.message = "Oops... sorry to see that you didn't like the fact!";
      } else if (factObj.votesType === "votesMindblowing") {
        data.message = "Wow... mindblowing!";
      }

      getFacts();
    }
    toast[data.status](data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleOnDelete = async (idArr) => {
    if (
      window.confirm(
        `Are you sure to delete ${idArr.length} ${
          idArr.length === 1 ? "fact" : "facts"
        }`
      )
    ) {
      // calling api to delete
      const data = await deleteSelectedFact({ idArr });

      toast[data.status](data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      data.status === "success" && getFacts();
    }
  };

  return (
    <FactUl>
      <FactLi style={{ color: "#000", justifyContent: "space-between" }}>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {factsList?.length === 0
            ? "No facts to display!"
            : factsList?.length === 1
            ? "Displaying 1 fact!"
            : `Displaying ${factsList?.length} facts!`}
        </p>
        {factsList?.length === 0 ? (
          userObj?._id ? (
            <p>
              Please post a new fact in the{" "}
              <span style={{ textTransform: "uppercase", fontWeight: "600" }}>
                {currentCategory}
              </span>{" "}
              category.
            </p>
          ) : (
            <p>
              Please <LoginLink to="/login">login</LoginLink> to be the first
              person to post a new fact in the{" "}
              <span style={{ textTransform: "uppercase", fontWeight: "600" }}>
                {currentCategory}
              </span>{" "}
              category.
            </p>
          )
        ) : (
          userObj?._id && (
            <p style={{ display: "flex", gap: "16px", fontWeight: "500" }}>
              {/* <input type="checkbox" />
              check the box to select all to delete */}
            </p>
          )
        )}
      </FactLi>

      {factsList?.map((item, i) => (
        <FactLi key={i}>
          <p>
            {item.votesLike + item.votesMindblowing < item.votesDislike ? (
              <Disputed>
                [⛔️ DISPUTED]
                <br />
              </Disputed>
            ) : (
              ""
            )}
            {item.fact}
            <FactSource to={item.source} target="_blank">
              (Source)
            </FactSource>
          </p>
          <FactCategory
            style={{
              background: categories.find((cat) => cat.name === item.category)
                .color,
            }}
          >
            {item.category}
          </FactCategory>
          {userObj?._id ? (
            <VoteBtnsContainer>
              <VoteBtns
                id="update"
                onClick={() =>
                  handleOnEdit({
                    _id: item._id,
                    fact: item.fact,
                    source: item.source,
                    category: item.category,
                  })
                }
              >
                <RiEdit2Line style={{ color: "aqua" }} />
                <Tooltip anchorSelect="#update" style={{ background: "aqua" }}>
                  <span>click to update your fact!</span>
                </Tooltip>
              </VoteBtns>

              <VoteBtns id="delete" onClick={() => handleOnDelete([item._id])}>
                <MdOutlineDeleteForever style={{ color: "orangered" }} />
                <Tooltip
                  anchorSelect="#delete"
                  style={{ background: "orangered" }}
                >
                  <span>click to delete your fact!</span>
                </Tooltip>
              </VoteBtns>
            </VoteBtnsContainer>
          ) : (
            <VoteBtnsContainer>
              <VoteBtns
                onClick={() =>
                  handleVotes({
                    _id: item._id,
                    votesType: "votesLike",
                    votesCount: +item.votesLike + 1,
                  })
                }
              >
                👍 {item.votesLike}
              </VoteBtns>
              <VoteBtns
                onClick={() =>
                  handleVotes({
                    _id: item._id,
                    votesType: "votesMindblowing",
                    votesCount: +item.votesMindblowing + 1,
                  })
                }
              >
                🤯 {item.votesMindblowing}
              </VoteBtns>
              <VoteBtns
                onClick={() =>
                  handleVotes({
                    _id: item._id,
                    votesType: "votesDislike",
                    votesCount: +item.votesDislike + 1,
                  })
                }
              >
                👎 {item.votesDislike}
              </VoteBtns>
            </VoteBtnsContainer>
          )}
        </FactLi>
      ))}
    </FactUl>
  );
};
