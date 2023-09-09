import React from "react";

const MainCreateRessort: React.FC = () => {
  return (
    <div className="maincreate-ressort">
      <div>
        <p className="maincreate-ressort-title">
          No ressorts created yet. Click below to create a new ressort with
          teams.
        </p>
        <button className="maincreate-ressort-btn btn">Create Ressort</button>
      </div>
    </div>
  );
};

export default MainCreateRessort;
