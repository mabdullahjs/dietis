import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import baseurl from "../../app/apiMethods/apiMethod";
import { add } from "../../app/redux/reducer/protocolData";
import MAModal from "../my-components/MAModal";

interface Props {
  showup?: boolean
  previewTitle?: string
}

const ProcessBody: React.FC<Props> = (props: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(null);
  const [currentOption, setCurrentOption] = useState('');
  const [inputValues, setInputValues] = useState<any>([]);
  const [chatValues, setChatValues] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  //use dispatch for redux
  const dispatch = useDispatch()

  useEffect(() => {
    if (shouldFetch) {
      axios.get(baseurl + 'api/v1/protocol')
        .then((res) => {
          console.log(res.data.data);
          dispatch(add(res.data.data))
          setSelectedOptions(res.data.data);
          setShouldFetch(false);
        })
    }
  }, [shouldFetch])



  const handleOptionChange = (event: any) => {
    setCurrentOption(event.target.value);
    console.log('current option ====>', event.target.value)
  };

  const handleButtonClick = () => {
    if (currentOption && !selectedOptions.includes(currentOption)) {
      setSelectedOptions([...selectedOptions, { status_color: currentOption }]);
      console.log('selected option ====>', selectedOptions)

      setInputValues([...inputValues, '']);
      console.log('input values option ====>', inputValues)

    }
  };

  const handleInputChange = (event: any, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
    // console.log(newInputValues[index]);
  };
  const handleChatChange = (event: any, index: number) => {
    const newChatValues = [...chatValues];
    newChatValues[index] = event.target.value;
    setChatValues(newChatValues);
    // console.log(newChatValues[index]);
  };

  //send data to db function
  const sendProtocol = (item: any, index: number) => {
    axios.post(baseurl + `api/v1/protocol`, {
      button_text: inputValues[index],
      status_color: item.status_color,
      chat_text: chatValues[index],
      theme_status: item.status_color === 'Green' ? 'positive' : item.status_color === 'Yellow' ? 'indicative' : item.status_color === 'Red' ? 'triggering' : 'others',
      preview: [{
        button_text: inputValues[index],
        status_color: item.status_color,
        chat_text: chatValues[index],
        theme_status: item.status_color === 'Green' ? 'positive' : item.status_color === 'Yellow' ? 'indicative' : item.status_color === 'Red' ? 'triggering' : 'others'
      }]
    })
      .then((res) => {
        // console.log(res);
        setShouldFetch(true)
      })
      .catch((err) => {
        // console.log(err)
        setModal(true);
      })

  }
  return (
    <>
      <div style={{ marginTop: '3rem' }}>
        <p className="processbody-title">Define protocol</p>
        <div className="processbody-theme">
          <p className="processbody-theme-name">Theme</p>
          <div className="processbody-theme-add">
            <select value={currentOption} onChange={handleOptionChange} className="processbody-theme-select">
              <option value='Green'>Positive</option>
              <option value='Yellow'>Indicative </option>
              <option value='Red'>Triggering </option>
              <option value='Gray'>Others </option>
            </select>
            <p onClick={handleButtonClick} className="processbody-theme-btn">+ Add theme</p>
          </div>
        </div>
      </div>
      {selectedOptions ? selectedOptions.map((item: any, index: number) => {
        return <div className="processbody-main">
          <div>
            <p className="processbody-main-tag-title">Create tag</p>
            <div className="processbody-main-tag-input">
              <p className="processbody-main-tag-input-title">Button Text</p>
              <input
                type="text"
                className="processbody-theme-select"
                onChange={(event) => handleInputChange(event, index)}
                // value={inputValues[index]}
                value={item.button_text ? item.button_text : inputValues[index]}
                readOnly={item.preview && item.preview.length > 0 ? true : false}
              />
            </div>
            <div className="processbody-main-tag-input">
              <p className="processbody-main-tag-input-title">Status color</p>
              <input
                type="text" value={item.status_color} readOnly
              />
            </div>
            <div className="processbody-main-tag-input">
              <p className="processbody-main-tag-input-title">Chat message</p>
              <textarea
                // value="[Client] showed up for work on [date time] on time."
                className="processbody-theme-select"
                onChange={(event) => handleChatChange(event, index)}
                // value={chatValues[index]}
                value={item.chat_text ? item.chat_text : chatValues[index]}
                readOnly={item.preview && item.preview.length > 0 ? true : false}
              ></textarea>
            </div>
            <div className="processbody-text-block">
              <p className="processbody-main-tag-input-title">Text blocks</p>
              <div className="processbody-text-block-items">
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Resident]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Name of resident
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[DateTime]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Datum und Uhrzeit
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[TeamName]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Name des Teams
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Teammanager]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Name des Teamleiters
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">
                    [TeammanagerID]
                  </p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    ID des Teamleiters
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Year]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Jahr als Nummer
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Month]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Monat als Text
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Resident]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Name of resident
                  </p>
                </div>
                <div className="processbody-text-block-item">
                  <p className="processbody-text-block-item-frist">[Day]</p>
                  <p className="processbody-text-block-item-frist processbody-text-block-item-frist__sec">
                    Wochentag als Text
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="processbody-right">
            <p className="processbody-title">Preview</p>
            {item.preview && item.preview.length > 0 ? <div className="processbody-main-right-items">
              <p className="processbody-main-right-ba">BA</p>
              <div style={{ width: '15rem' }} className="processbody-main-right-item-right">
                <p
                  className={`processbody-main-right-item-right-btn`}
                  style={{ backgroundColor: `${item.preview[0].status_color === 'Yellow' ? '#FFAF10' : item.preview[0].status_color === 'Red' ? '#DA4A54' : item.preview[0].status_color === 'Gray' ? '#C2C3D0' : '61B373'}` }}
                >
                  {item.preview[0].button_text}
                </p>
                <p className="processbody-main-right-item-right-des">
                  {item.preview[0].chat_text}
                </p>
                <p className="processbody-main-right-item-right-date">
                  {item.createdAt}
                </p>
              </div>
            </div> : <h1></h1>}
          </div>
          <div className="processbody-right-action-btn">
            {/* <Link to="/settings/process/actiontrigger" className="btn">*/}
            <button style={{ visibility: item.preview && item.preview.length > 0 ? 'hidden' : 'visible' }} onClick={() => sendProtocol(item, index)} className="maincreate-ressort-btn btn">+ Add action</button>
            {/* </Link>  */}
          </div>
        </div>
      }) : <h1>Loading...</h1>}
      {/* <ProcessActionTrigger/> */}
      <MAModal open={modal}
        close={() => setModal(false)}
        modalTitle="Warning"
        width='30%'
        innerContent='Please fill the form correctly' />
    </>
  );
};

export default ProcessBody;