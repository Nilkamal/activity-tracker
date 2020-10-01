import React, { useState, useEffect } from "react";
import "pages/save-activity/save-activity-styles.scss";
import { connect } from "react-redux";
import {
  getActivityBegin,
  saveActivityBegin,
} from "redux/actions/saveActivityAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveActivity = (props) => {
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    debugger;
    if (props.activity) {
      setActivity(props.activity.activity);
      setDescription(props.activity.description);
      setDate(props.activity.date);
    } else {
      if (!props.pending) {
        props.beginGetActivity(props.match.params.id);
      }
    }
  }, [props.activity]);

  const handleActivityDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleActivityDate = (event) => {
    setDate(event.target.value);
  };

  const handleActivityTitle = (event) => {
    setActivity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.activity) {
      props.beginSaveActivity(
        { activity, description, date, id: props.activity.id },
        props.history
      );
    }

    if (!props.pending && props.error) {
      toast.error(props.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setActivity("");
      setDescription("");
      setDate("");
      toast.success("Activity saved successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="create-activity">
      {props.activity && props.activity.id ? (
        <h3>Edit an Activity</h3>
      ) : (
        <h3>Create a New Activity</h3>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={activity}
            placeholder="Enter Activity"
            onChange={handleActivityTitle}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            rows="6"
            placeholder="Enter Activity Description"
            onChange={handleActivityDescription}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            onChange={handleActivityDate}
            required
            value={date}
          />
        </div>
        <div className="form-group">
          <button>
            {props.activity && props.activity.id ? "UPDATE" : "CREATE"}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    beginSaveActivity(data, history) {
      dispatch(saveActivityBegin(data, history));
    },
    beginGetActivity(id) {
      dispatch(getActivityBegin(id));
    },
  };
};

const mapStateToProps = ({ saveActivity: { pending, error, activity } }) => {
  return {
    pending,
    error,
    activity,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveActivity);
