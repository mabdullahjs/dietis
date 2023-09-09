import React from "react";

const ProcessTop: React.FC = () => {
  return (
    <div>
      <p className="processbody-title">Define protocol</p>
      <div className="processbody-theme">
        <p className="processbody-theme-name">Theme</p>
        <div className="processbody-theme-add">
          <select className="processbody-theme-select">
            <option>Punctuality</option>
          </select>
          <p className="processbody-theme-btn">+ Add theme</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessTop;