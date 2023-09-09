import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProcessSub: React.FC = () => {

  const [positive, setPositive] = useState<any>(null);
  const [indicative, setIndicative] = useState<any>(null);
  const [triggering, setTriggering] = useState<any>(null);
  const [other, setOther] = useState<any>(null);

  //use selector for redux
  const dataFromRedux = useSelector((a: any) => a.Protocol);
  // console.log(dataFromRedux);

  useEffect(() => {
    const data = dataFromRedux.data;
    console.log(dataFromRedux.data);
   setTimeout(()=>{
    const filteredItemsPostive = data ? data.filter((item: any) => item.theme_status === 'positive'):null;
    setPositive(filteredItemsPostive)
    const filteredItemsIndicative = data ? data.filter((item: any) => item.theme_status === 'indicative'):null;
    setIndicative(filteredItemsIndicative)
    const filteredItemsOther = data ? data.filter((item: any) => item.theme_status === 'others'):null;
    setOther(filteredItemsOther)
    const filteredItemstrigering = data ? data.filter((item: any) => item.theme_status === 'triggering'):null;
    setTriggering(filteredItemstrigering)
   } , 1000)
  }, [dataFromRedux])

  return (
    <div className="sidebarsub">
      <div>
        <p className="sidebarsub-title">Positive logs</p>
        <div className="processlogs-items">
          {positive ? positive.map((item:any , index:number)=>{
            return <p key={index} className="processLogs-item">{item.button_text}</p>
          }):<h1>loading...</h1>}
        </div>
      </div>
      <div>
        <p className="sidebarsub-title">Indicative logs</p>
        <div className="processlogs-items">
          {/* <p className="processLogs-item processlogs-items__indicates">
            too late
          </p>
          <p className="processLogs-item processlogs-items__indicates">
            oversleep
          </p>
          <p className="processLogs-item processlogs-items__indicates">
            Behave
          </p>
          <p className="processLogs-item processlogs-items__indicates">
            relapse
          </p>
          <p className="processLogs-item processlogs-items__indicates">
            Medicine taken late
          </p> */}
            {indicative ? indicative.map((item:any , index:number)=>{
            return <p key={index} className="processLogs-item processlogs-items__indicates">{item.button_text}</p>
          }):<h1>loading...</h1>}

        </div>
      </div>
      <div>
        <p className="sidebarsub-title">Triggering logs</p>
        <div className="processlogs-items">
          {/* <p className="processLogs-item processlogs-items__trigger">
            did not show up
          </p>
          <p className="processLogs-item processlogs-items__trigger">
            Behave
          </p>
          <p className="processLogs-item processlogs-items__trigger">
            2. Relapse
          </p>
          <p className="processLogs-item processlogs-items__trigger">tbd</p>
          <p className="processLogs-item processlogs-items__trigger">tbd</p>
          <p className="processLogs-item processlogs-items__trigger">tbd</p> */}
           {triggering ? triggering.map((item:any , index:number)=>{
            return <p className="processLogs-item processlogs-items__trigger">{item.button_text}</p>
          }):<h1>loading...</h1>}
        </div>
      </div>
      <div>
        <p className="sidebarsub-title">Others logs</p>
        <div className="processlogs-items">
          {/* <p style={{ backgroundColor: '#C2C3D0' }} className="processLogs-item">others</p>
          <p style={{ backgroundColor: '#C2C3D0' }} className="processLogs-item">Tbd</p> */}
            {other ? other.map((item:any , index:number)=>{
            return <p style={{ backgroundColor: '#C2C3D0' }} className="processLogs-item">{item.button_text}</p>
          }):<h1>loading...</h1>}

        </div>
      </div>
    </div>
  );
};

export default ProcessSub;
