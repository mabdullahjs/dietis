import React from "react";
import { Link } from "react-router-dom";
import HeaderSidebar from "../components/HeaderSidebar";

const NotFound404: React.FC = () => {
  return (
    <HeaderSidebar headerMenuShow={false}>
      <div className="pagenotfound">
        <div>
          <p className="pagenotfound-text">Page not found</p>
          <Link to="/" className="pagenotfound-go-back">
            Go back to home page
          </Link>
        </div>
      </div>
    </HeaderSidebar>
  );
};

export default NotFound404;
