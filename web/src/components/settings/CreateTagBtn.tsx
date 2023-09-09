import React from "react";
import { Link } from "react-router-dom";

const CreateTagBtn: React.FC = () => {
  return (
    <div className="processbody-right-action-btn">
      <Link to="/settings/process/createtag" className="btn">
        <button className="maincreate-ressort-btn btn">+ Create tag</button>
      </Link>
    </div>
  );
};

export default CreateTagBtn;