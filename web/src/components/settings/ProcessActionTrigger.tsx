import React, { useState } from "react";

const ProcessActionTrigger: React.FC = () => {
  const [state, setState] = useState(false);

  const showHandler = (): any => {
    setState(!state);
  };

  return (
    <div className="actiontrigger">
      <div>
        <div className="processbody-main-tag-input">
          <p className="processbody-main-tag-input-title">Action name</p>
          <input type="text" className="processbody-theme-select" />
        </div>
        <div>
          <p className="processbody-main-tag-input-title">
            What should the action trigger?
          </p>
          <div className="actiontrigger-items">
            <input
              type="radio"
              className="actiontrigger-input"
              onChange={showHandler}
            />
            <p className="actiontrigger-input-msg">Chat message</p>
          </div>
          <div className="actiontrigger-items">
            <input
              type="radio"
              className="actiontrigger-input"
              onChange={showHandler}
            />
            <p className="actiontrigger-input-msg">E-Mail</p>
          </div>
          <div className="actiontrigger-items">
            <input
              type="radio"
              className="actiontrigger-input"
              onChange={showHandler}
            />
            <p className="actiontrigger-input-msg">Push notification only</p>
          </div>
        </div>
      </div>
      {state && (
        <>
          {" "}
          <div className="processbody-main-tag-input">
            <p className="processbody-main-tag-input-title">Recipient</p>
            <input
              type="text"
              className="processbody-theme-select processbody-theme-select__trigger-recipient"
              value="[TeamleaderID]"
            />
          </div>
          <div>
            <div className="processbody-main-tag-input">
              <p className="processbody-main-tag-input-title">Chat message</p>
              <input
                type="text"
                className="processbody-theme-select"
                value="[Client]  is on time on [datetime] .
            appeared for work. Please check if
            got up."
              />
            </div>
            <div className="processbody-text-block">
              <p className="processbody-main-tag-input-title">Text blocks</p>
              <div className="processbody-text-block-items">
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Client]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Clients name
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [Date / time]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Date and Time
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [TeamName]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Name des Teams
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [department name]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    name of department
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [Team leader]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Team leader name
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [TeamleaderID]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Team leader ID
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Year]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    year as a number
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Month]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    month as text
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Weekday]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Day of the week as text
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProcessActionTrigger;