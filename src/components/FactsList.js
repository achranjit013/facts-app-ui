import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

// css
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
  font-family: "Coiny", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  padding: 3px 10px 0 10px;
  border-radius: 100px;
`;
// end css

export const FactsList = ({ getFacts, factsList, response }) => {
  return (
    <ul>
      {response !== "" && <Alert variant="danger">{response}</Alert>}
      {factsList?.map((item, i) => (
        <FactLi key={i}>
          <p>
            {/* {item.votesInteresting + item.votesMindblowing < item.votesFalse ? (
              <span className="disputed">[⛔️ DISPUTED]</span>
            ) : (
              ""
            )} */}
            {item.fact}
            <FactSource href={item.source} target="_blank">
              (Source)
            </FactSource>
          </p>
          <FactCategory
          // style={{
          //   background: categories.find((cat) => cat.name === item.category)
          //     .color,
          // }}
          >
            {item.category}
          </FactCategory>
          {/* <div className="vote-buttons">
            <button
              onClick={() =>
                handleVotes(item.votesInteresting, item.id, "votesInteresting")
              }
            >
              👍 {item.votesInteresting}
            </button>
            <button
              onClick={() =>
                handleVotes(item.votesMindblowing, item.id, "votesMindblowing")
              }
            >
              🤯 {item.votesMindblowing}
            </button>
            <button
              onClick={() =>
                handleVotes(item.votesFalse, item.id, "votesFalse")
              }
            >
              👎 {item.votesFalse}
            </button>
          </div> */}
        </FactLi>
      ))}
    </ul>
  );
};
