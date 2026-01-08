import React from "react";
import styled from "styled-components";

const Fav = ({ id, isLiked, onToggleLike }) => {
  const uniqueId = `like-toggle-${id}`;

  return (
    <StyledWrapper>
      <div className="like-wrapper">
        <input
          className="check"
          type="checkbox"
          id={uniqueId}
          checked={isLiked}           // État du like
          onChange={onToggleLike}     // Toggle au clic
        />
        <label className="container" htmlFor={uniqueId}>
          {/* Coeur vide */}
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="icon inactive"
          >
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z" />
          </svg>

          {/* Coeur rempli */}
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="icon active"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>

          <div className="checkmark" />
          <span className="like-text">Like</span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .like-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #212121;
    border-radius: 0.35em;
    padding: 0.5em;
    cursor: pointer;
  }

  .check[type="checkbox"] {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .icon {
    width: 1.5em;
    height: 1.5em;
    margin-left: 0.5em;
    fill: white;
    transition: opacity 0.3s ease-in-out;
  }

  .icon.active {
    display: none;
    fill: #f52121;
  }

  .check[type="checkbox"]:checked + .container .icon.active {
    display: inline-block;
    animation: wiggle 0.5s ease-in-out;
  }

  .check[type="checkbox"]:checked + .container .icon.inactive {
    display: none;
  }

  .like-text {
    margin-left: 0.5em;
    color: white;
    font-weight: bold;
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
`;

export default Fav;
