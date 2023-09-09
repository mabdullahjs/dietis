import React from "react";

const ProtocolSidebarSub: React.FC = () => {
  return (
    <div className="sidebarsub">
      <div className="sidebarsub-top">
        <p className="sidebarsub-title">Person</p>
        <div className="sidebarsub-top-flex">
          <p className="sidebarsub-top-btn sidebarsub-top-btn__search">
            Search
          </p>
          <p className="sidebarsub-top-btn  sidebarsub-top-btn__sort">Sort</p>
        </div>
      </div>
      <div className="sidebarsub-items">
        <div>
          <p className="sidebarsub-item">Bock Irene</p>
          <p className="sidebarsub-item">Zbinden Sonja</p>
          <p className="sidebarsub-item">Binder Ingo</p>
          <p className="sidebarsub-item">Bock Irene</p>
          <p className="sidebarsub-item">Zbinden Sonja</p>
          <p className="sidebarsub-item">Binder Ingo</p>
          <p className="sidebarsub-item">Bock Irene</p>
          <p className="sidebarsub-item">Zbinden Sonja</p>
          <p className="sidebarsub-item">Bock Irene</p>
        </div>
      </div>
    </div>
  );
};

export default ProtocolSidebarSub;
