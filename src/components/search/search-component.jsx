import React, { useState } from "react";
import { connect } from "react-redux";
import { searchActivities } from "redux/actions/listActivityAction";
import "components/search/search-styles.scss";

const Search = (props) => {
  const [activity, setActivity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };
  
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    props.filter({ activity, startDate, endDate });
  };

  return (
    <div className="search">
      <h2>Filter your activities</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="search"
            placeholder="Search by activity"
            value={activity}
            onChange={handleActivityChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Search by Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder="Search by End Date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="form-group">
          <button>Search</button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    filter(search) {
      dispatch(searchActivities(search));
    },
  };
};

export default connect(null, mapDispatchToProps)(Search);
