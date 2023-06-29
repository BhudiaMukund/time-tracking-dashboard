import React, { useEffect, useState } from "react";
import "./app.css";
import Card from "./components/Card/Card";
import data from "./data.json";
import styled from "styled-components";

const App = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData([]);
    data.forEach((set) => {
      const dataObject = {
        title: set.title,
        current:
          timeframe === "daily"
            ? set.timeframes.daily.current
            : timeframe === "weekly"
            ? set.timeframes.weekly.current
            : set.timeframes.monthly.current,
        previous:
          timeframe === "daily"
            ? set.timeframes.daily.previous
            : timeframe === "weekly"
            ? set.timeframes.weekly.previous
            : set.timeframes.monthly.previous,
      };
      setFilteredData((filteredData) => [...filteredData, dataObject]);
    });
  }, [timeframe]);

  const handleTimeframeChange = (event) => {
    const targetChange = event.target.value;
    setTimeframe(targetChange);
    const buttons = document.querySelectorAll(".menu-btn");
    buttons.forEach((button) => {
      button.classList.remove("active");
      if (button.value === targetChange) {
        button.classList.add("active");
      }
    });
  };

  return (
    <Container>
      <section className="profile-container">
        <article className="profile">
          <img src="/images/image-jeremy.png" alt="Profile of Jeremy" />
          <div className="profile-details">
            <span>Report for</span>
            <h1>Jeremy Robson</h1>
          </div>
        </article>
        <nav className="menu">
          <ul>
            <li>
              <button
                className="menu-btn"
                value="daily"
                onClick={(event) => handleTimeframeChange(event)}
              >
                Daily
              </button>
            </li>
            <li>
              <button
                className="menu-btn active"
                value="weekly"
                onClick={(event) => handleTimeframeChange(event)}
              >
                Weekly
              </button>
            </li>
            <li>
              <button
                className="menu-btn"
                value="monthly"
                onClick={(event) => handleTimeframeChange(event)}
              >
                Monthly
              </button>
            </li>
          </ul>
        </nav>
      </section>
      <section className="dashboard">
        {filteredData.map((cardData, index) => {
          return <Card cardData={cardData} timeframe={timeframe} key={index} />;
        })}
      </section>
    </Container>
  );
};

export default App;

const Container = styled.main`
  display: flex;
  flex-direction: row;
  gap: 38px;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
  .profile-container {
    width: 40%;
    .profile {
      position: relative;
      background: var(--Blue);
      padding: 38px;
      border-radius: 15px;
      img {
        border: 2px solid white;
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }
      .profile-details {
        margin: 30px 0;
        span {
          font-size: 15px;
          font-weight: 300;
        }
        h1 {
          font-size: 38px;
          width: min-content;
          font-weight: 300;
        }
      }
    }

    .profile::before {
      position: absolute;
      inset: 0;
      content: "";
      background: var(--Dark-blue);
      z-index: -1;
      border-radius: 15px 15px 0 0;
    }
    .menu {
      background: var(--Dark-blue);
      padding: 25px;
      border-radius: 0 0 10px 10px;
      ul {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .menu-btn {
        color: var(--Desaturated-blue);
        font-size: 15px;
      }
      .menu-btn.active {
        color: white;
      }
    }
    @media only screen and (max-width: 800px) {
      width: 100%;
      .profile {
        display: flex;
        align-items: center;
        gap: 25px;
        @media only screen and (max-width: 425px) {
          padding: 20px;
        }
        img {
          width: 75px;
          height: 75px;
        }
        .profile-details {
          margin: 0;
          h1 {
            width: 100%;
            font-size: 28px;
            @media only screen and (max-width: 425px) {
              font-size: 24px;
            }
          }
        }
      }
      .menu {
        ul {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 38px;
    @media only screen and (max-width: 750px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 38px 0;
    }
  }
`;
