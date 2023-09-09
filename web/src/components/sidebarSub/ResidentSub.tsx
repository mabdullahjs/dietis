import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import baseurl from "../../app/apiMethods/apiMethod";

interface Props {
  func: any;
}

const ResidentSub: React.FC<Props> = (props) => {
  const [people, setPeople] = useState<any>(null);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const dataFromRedux = useSelector((a: any) => a.Resident);


  // Get people
  useEffect(() => {
    if (shouldFetch) {
      axios.get(baseurl + 'api/v1/getPatient')
        .then((res) => {
          const filter = res.data.filter((item: any, index: number) => {
            return item.assigned === false
          })
          setPeople(filter);
          setShouldFetch(false);
        });
    }
  }, [shouldFetch]);

  useEffect(() => {
    setShouldFetch(true);
  }, [dataFromRedux])


  function ButtonPair({ item }: { item: any }) {
    const [button1Value, setButton1Value] = useState(false);
    const [button2Value, setButton2Value] = useState(false);

    const changeTimeNoon = () => {
      const newValue = item.arrivalNoon === true ? false : true;
      setButton1Value(newValue);
      // setButton2Value(!newValue);

      axios.patch(baseurl + `api/v1/updatePatient/${item._id}`, {
        arrivalNoon: newValue,
        arrivalMorning : false
        // arrivalMorning: !newValue
      })
        .then((res) => {
          console.log(res);
          setShouldFetch(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const changeTimeMorning = () => {
      const newValue = item.arrivalMorning === true ? false : true;
      setButton2Value(newValue);
      // setButton1Value(!newValue);

      axios.patch(baseurl + `api/v1/updatePatient/${item._id}`, {
        arrivalMorning: newValue,
        arrivalNoon: false,
      })
        .then((res) => {
          console.log(res);
          setShouldFetch(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div draggable onDragStart={(e) => handleOnDrag(e, e.target, item)} className="sidebarsub-resident">
        <p onClick={changeTimeMorning} style={{ background: item.arrivalMorning === true ? '#61b273' : '#f6f5ff' }} className="sidebarsub-resident-first">V</p>
        <p className="">{item.firstName}</p>
        <p onClick={changeTimeNoon} style={{ background: item.arrivalNoon === true ? '#61b273' : '#f6f5ff' }} className="sidebarsub-resident-first sidebarsub-resident-first__last">N</p>
      </div>
    );
  }

  // Drag and drop
  function handleOnDrag(e: any, patientType: any, patient: any) {
    props.func(e, patientType, patient);
  }

  return (
    <div className="sidebarsub">
      <p className="sidebarsub-title">People not scheduled</p>
      {people ? people.map((item: any, index: number) => {
        return <ButtonPair key={index} item={item} />
      }) : <h1>No People Found</h1>}
    </div>
  );
};

export default ResidentSub;
