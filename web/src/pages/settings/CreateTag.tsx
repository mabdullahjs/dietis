import React from "react";
import HeaderSidebar from "../../components/HeaderSidebar";
// import MainCreateRessort from "../../components/MainCreateRessort";
import ProcessBody from "../../components/settings/ProcessBody";
import ProcessTop from "../../components/settings/ProcessTop";
import ProcessSub from "../../components/sidebarSub/ProcessSub";

const CreateTag: React.FC = () => {
  return (
    <div>
      <HeaderSidebar headerMenuShow={false}>
        <div className="process-page-body-container">
          <ProcessSub />
          {/* <MainCreateRessort /> */}
          <div className="container">
            <div className="processbody">
              <ProcessTop />
              <ProcessBody showup={false} previewTitle="Punctual" />
            </div>
            <ProcessBody showup={true} previewTitle="did not show up" />
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default CreateTag;