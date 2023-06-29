import React, { useEffect } from "react";
import styled from "styled-components";

const Card = ({ cardData, timeframe }) => {
  const imgUrl = `/images/icon-${cardData.title.replace(" ", "-")}.svg`;
  const previousTimeframeTitle = () => {
    if (timeframe === "daily") {
      return "Yesterday";
    } else if (timeframe === "weekly") {
      return "Last Week";
    } else {
      return "Last Month";
    }
  };
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    const colors = [
      " hsl(15, 100%, 70%)",
      " hsl(195, 74%, 62%)",
      " hsl(348, 100%, 68%)",
      " hsl(145, 58%, 55%)",
      " hsl(264, 64%, 52%)",
      " hsl(43, 84%, 65%)",
    ];
    cards.forEach((card, index) => {
      card.style.background = colors[index];
    });
  }, []);
  return (
    <Container className="card">
      <div className="background-image">
        <img src={imgUrl} alt={`Background for ${cardData.title}`} />
      </div>
      <div className="card-details">
        <div className="header">
          <h2>{cardData.title}</h2>
          <button>
            <img src="/images/icon-ellipsis.svg" alt="Menu" />
          </button>
        </div>
        <div className="main">
          <h1>{cardData.current}hrs</h1>
          <span>
            {previousTimeframeTitle()} - {cardData.previous}hrs
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Card;

const Container = styled.article`
  position: relative;
  width: 225px;
  border-radius: 12px;
  height: 75%;
  @media only screen and (max-width: 750px) {
    height: 100%;
    width: 100%;
  }
  .background-image {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    width: 100%;
    height: 50px;
    img {
      width: 65px;
    }
  }

  .card-details {
    position: relative;
    padding: 20px;
    z-index: 10;
    height: 100%;
    border-radius: 12px;
    background: var(--Dark-blue);
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 18px;
        font-weight: 400;
      }
      button {
        img {
          width: 20px;
        }
      }
    }
    h1 {
      font-size: 45px;
      font-weight: 300;
      margin-top: 18px;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 425px) {
      .main {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h1 {
        font-size: 38px;
      }
    }
  }
`;
