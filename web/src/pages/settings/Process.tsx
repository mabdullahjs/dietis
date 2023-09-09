import React from "react";
import HeaderSidebar from "../../components/HeaderSidebar";
// import MainCreateRessort from "../../components/MainCreateRessort";
import ProcessBody from "../../components/settings/ProcessBody";
import ProcessSub from "../../components/sidebarSub/ProcessSub";

const Process: React.FC = () => {
  return (
    <div>
      <HeaderSidebar headerMenuShow={false}>
        <div className="process-page-body-container">
          <ProcessSub />
          {/* <MainCreateRessort /> */}
          <div className="container">
            <ProcessBody />
            {/* <CreateTagBtn /> */}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default Process;