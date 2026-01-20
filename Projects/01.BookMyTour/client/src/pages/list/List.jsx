/*eslint-disable*/
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  console.log(location); //after re-routing everyting from re-route request will come
  //into this:
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  console.log(destination);
  console.log("the dates are:", dates);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  console.log(import.meta.env.VITE_BACKEND_API);
  const { data, loading, error, reFetch } = useFetch(
    `${import.meta.env.VITE_BACKEND_API}/hotels?city=${destination}&min=${
      min || 500
    }&max=${max || 25000}`
  );
  console.log(data);

  const handleClick = () => {
    console.log("Destination is:", destination);
    reFetch(
      `${import.meta.env.VITE_BACKEND_API}/hotels?city=${destination}&min=${
        min || 500
      }&max=${max || 25000}`
    );
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check In Data</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                {/* 1st option item */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Minimum Price<small>per nigth</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                {/*2nd Option item  */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Maximum Price<small>per nigth</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                {/*3rd Option Item  */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>

                {/* 4th option item */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>

                {/* 3rd Option item */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
              {/*end of class lsOptions*/}
            </div>
            {/*end of  class lsItem */}
            <button onClick={handleClick}>Search</button>
          </div>
          {/*end of  class lsSearch */}
          <div className="listResult">
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
        {/*end of  class lsWrapper*/}
      </div>
      {/*end of  class lsContainer*/}
    </div> //end of parent div tag
  );
};

export default List;
