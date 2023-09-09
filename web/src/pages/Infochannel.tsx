import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import baseurl from "../app/apiMethods/apiMethod";
import HeaderSidebar from "../components/HeaderSidebar";
import ProtocolChart from "../components/protocol/ProtocolChart";
import ProtocolScheduleTop from "../components/protocol/ProtocolScheduleTop";
import ScheduleTop from '../components/shedule/ScheduleTop';

const Infochannel: React.FC = () => {
  const [resident, setResident] = useState<any>(null);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [shouldFetchfunc, setShouldFetchfunc] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [residentItem, setResidentItem] = useState<any>(null);
  const [residentProtocols, setResidentProtocols] = useState<any>(null);
  const [firstchart, setFirstchart] = useState<any>(0);
  const [secondchart, setSecondchart] = useState<any>(0);
  const [thirdchart, setThirdchart] = useState<any>(0);
  const [fourthchart, setFourthchart] = useState<any>(0);
  const [totalVal, setTotalVal] = useState<any>(0);
  const [sortBtn, setSortBtn] = useState<boolean>(false);

  //current date function
  const currentDateFunc = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  useEffect(() => {
    if (shouldFetch) {
      axios.get(baseurl + 'api/v1/getPatient')
        .then((res) => {
          console.log(res.data);
          setResident(res.data);
          setFiltered(res.data);
          setShouldFetch(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [shouldFetch])

  //change timestamp into normal time function
  const changeTimstamp = (timestamp: string) => {
    const dateObj = new Date(timestamp);

    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    const hours = dateObj.getHours().toString();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hours}.${minutes}`;

    const formattedTimestamp = `${formattedDate} - ${formattedTime}`;
    return (formattedTimestamp);
  }

  //date from redux
  const dataFromRedux = useSelector((a: any) => a.Date);
  // console.log(dataFromRedux);
  useEffect(() => {
    residentItem ?
      getDataResident(residentItem)
      : null
  }, [dataFromRedux])



  // get Data for resident
  const tempCounts = {
    firstchart: 0,
    secondchart: 0,
    thirdchart: 0,
    fourthchart: 0
  };
  const getDataResident = (item: any) => {
    setResidentItem(item);
    axios.get(baseurl + `api/v1/protocols/${item._id}`)
      .then((res) => {
        setShouldFetchfunc(false);
        console.log(res.data);
        const filtered = res.data.filter((item: any, index: number) => {
          let timestamp = changeTimstamp(item.timestamp);
          console.log(timestamp.split(' -')[0]);
          // console.log(currentDateFunc().split('-').reverse().join('.'));
          if (dataFromRedux.date === undefined) {
            return timestamp.split(' -')[0] === currentDateFunc().split('-').reverse().join('.')
          }
          else {
            return timestamp.split(' -')[0] === dataFromRedux.date.split('-').reverse().join('.')
          }
        })
        console.log('date item =====>', filtered);
        setResidentProtocols(filtered);
        setTotalVal(filtered.length);
        filtered.length > 0 ? filtered.forEach((protocol: any) => {
          if (protocol.protcol === "indicative") {
            tempCounts.thirdchart++;
          } else if (protocol.protcol === 'triggering') {
            tempCounts.secondchart++;
          } else if (protocol.protcol === 'others') {
            tempCounts.fourthchart++;
          } else {
            tempCounts.firstchart++;
          }
        }) : null;
        // Update the state after counting is complete
        setFirstchart(tempCounts.firstchart);
        setSecondchart(tempCounts.secondchart);
        setThirdchart(tempCounts.thirdchart);
        setFourthchart(tempCounts.fourthchart);
      })
      .catch((err) => {
        console.log(err);
      })

  }



  //search feature for resident
  const handleSearchClick = () => {
    setShowSearch(showSearch === true ? false : true);
    setFiltered(resident);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText === '') {
        setFiltered(resident);
      } else {
        const filtered = resident.filter((item: any) =>
          item.firstName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFiltered(filtered);
      }
    }, 500);
  
    // Cleanup the timer if the component unmounts or the searchText changes
    return () => clearTimeout(timer);
  }, [searchText, resident]);


  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  //resident sort method functions.
  const sortResident = () => {
    setSortBtn(preVal => preVal === true ? false : true);
  }

  const surNameFirst = () => {
    const sortedData = [...filtered];
    sortedData.sort((a, b) => a.firstName.split(' ')[0].localeCompare(b.firstName.split(' ')[0]));
    setFiltered(sortedData);
  }
  const surNameLast = () => {
    const sortedData = [...filtered];
    sortedData.sort((a, b) => b.firstName.split(' ')[0].localeCompare(a.firstName.split(' ')[0]));
    setFiltered(sortedData);
  }
  const lastNameFirst = () => {
    const sortedData = [...filtered];
    if (sortedData[0].firstName.split(' ').length > 1) {
      sortedData.sort((a, b) => a.firstName.split(' ')[1].localeCompare(b.firstName.split(' ')[1]));
      setFiltered(sortedData);
    } else {
      setFiltered(sortedData);
    }
  }
  const lastNameLast = () => {
    const sortedData = [...filtered];
    if (sortedData[0].firstName.split(' ').length > 1) {
      sortedData.sort((a, b) => b.firstName.split(' ')[1].localeCompare(a.firstName.split(' ')[1]));
      setFiltered(sortedData);
    } else {
      setFiltered(sortedData);
    }
  }




  return (
    <div>
      <HeaderSidebar headerMenuShow={false}>
        <div className="process-page-body-container">
          <div className="sidebarsub">
            <div className="sidebarsub-top">
              <p className="sidebarsub-title">Person</p>
              <div className="sidebarsub-top-flex">
                <p onClick={handleSearchClick} className="sidebarsub-top-btn sidebarsub-top-btn__search">
                  Search
                </p>
                <p onClick={sortResident} className="sidebarsub-top-btn  sidebarsub-top-btn__sort">Sort</p>
              </div>
            </div>
            {showSearch && (
              <div>
                <input
                  type="text"
                  value={searchText}
                  onChange={handleInputChange}
                  style={{ borderRadius: '0.5rem' }}
                /><br />
                {/* <button style={{ border: '0px', marginTop: '10px' }} className="sidebarsub-top-btn  sidebarsub-top-btn__sort" onClick={handleSearchSubmit}>Search</button> */}
              </div>
            )}
            <div style={{ display: sortBtn === false ? 'none' : 'flex', justifyContent: "space-evenly", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <button onClick={surNameFirst} style={{ border: '0px', marginTop: '10px' }} className="sidebarsub-top-btn  sidebarsub-top-btn__sort" >SurName A-Z</button>
              <button onClick={surNameLast} style={{ border: '0px', marginTop: '10px' }} className="sidebarsub-top-btn  sidebarsub-top-btn__sort" >LastName A-Z</button>
              <button onClick={lastNameFirst} style={{ border: '0px', marginTop: '10px' }} className="sidebarsub-top-btn  sidebarsub-top-btn__sort" >SurName Z-A</button>
              <button onClick={lastNameLast} style={{ border: '0px', marginTop: '10px' }} className="sidebarsub-top-btn  sidebarsub-top-btn__sort" >LastName Z-A</button>
            </div>
            <div className="sidebarsub-items">
              <div>
                {filtered ? filtered.map((item: any, index: number) => {
                  return <div key={index}>
                    <p onClick={() => getDataResident(item)} key={index} className="sidebarsub-item">{item.firstName}</p>
                  </div>
                }) : <h1>Loading...</h1>}
              </div>
            </div>
          </div>
          <div className="sheduleteam container">
            <ProtocolScheduleTop />

            {residentItem ? <div className="protocolschedulebody">
              <div className="">
                <div className="protocolschedulebody-flex">
                  <p className="protocolschedulebody-text-first">Stammdaten</p>
                  <p className="protocolschedulebody-text-btn">Adjust Timeline</p>
                </div>
                <p className="protocolschedulebody-text">{residentItem.firstName}</p>
                <div className="protocolschedulebody-last">
                  <p className="protocolschedulebody-text">AHV-No.: {residentItem.ahvNumber}</p>
                  <p className="protocolschedulebody-text">Care-Level: {residentItem.status ? residentItem.status : 5}</p>
                </div>
                <ScheduleTop />
              </div>
              <div className="protocolschedulebody-chat-chart">
                <div className="protocol-chat">
                  {residentProtocols && residentProtocols.length > 0 ? residentProtocols.map((protocol: any, protocolIndex: number) => {
                    return <div key={protocolIndex} className="protocol-chat-item">
                      <p className="proptocolchat-name-short">{protocol.sender.substring(0, 2).toUpperCase()}</p>
                      <div className="protocol-chat-right">
                        <button style={{ backgroundColor: protocol.protcol === "indicative" ? '#FFAF10' : protocol.protcol === 'triggering' ? '#DA4A54' : protocol.protcol === 'others' ? '#C2C3D0' : '61B373' }} className="protocol-chat-item-btn">{protocol.protcol}</button>
                        <div className="">
                          <p className="protocol-chat-com">
                            {protocol.message}
                          </p>
                          {/* <p className="protocol-chat-com-date">04.01.2022 - 7.18</p> */}
                          <p className="protocol-chat-com-date">{changeTimstamp(protocol.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  }) : <h1>No Chat found.</h1>}
                </div>
                <ProtocolChart firstchart={firstchart} secondchart={secondchart} thirdchart={thirdchart} fourthchart={fourthchart} totalVal={totalVal} />
              </div>
            </div> : <h1 style={{ marginTop: '2rem' }}>No protocols found.</h1>}
          </div>
        </div>
      </HeaderSidebar>
    </div>
  );
};

export default Infochannel;