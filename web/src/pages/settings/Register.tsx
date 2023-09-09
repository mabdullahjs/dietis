import React from "react";
import HeaderSidebar from "../../components/HeaderSidebar";
import RegisterCompo from "../../components/settings/Register";

const Register: React.FC = () => {
  return (
    <div>
      <HeaderSidebar headerMenuShow={false}>
        <div className="process-page-body-container container">
          <RegisterCompo />
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default Register;
