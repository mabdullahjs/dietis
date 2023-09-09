import React from "react";
import SchduleTop from "../shedule/ScheduleTop";

const ProtocolScheduleBody: React.FC = () => {
  return (
    <div className="">
      <div className="protocolschedulebody-flex">
        <p className="protocolschedulebody-text-first">Stammdaten</p>
        <p className="protocolschedulebody-text-btn">Adjust Timeline</p>
      </div>
      <p className="protocolschedulebody-text">Surname Name</p>
      <div className="protocolschedulebody-last">
        <p className="protocolschedulebody-text">AHV-Nr.: 888-888-888</p>
        <p className="protocolschedulebody-text">Pflegestufe: 2</p>
      </div>
      <SchduleTop />
    </div>
  );
};

export default ProtocolScheduleBody;
