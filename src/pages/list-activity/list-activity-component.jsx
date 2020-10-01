import React, { Fragment, useEffect } from "react";
import Search from "components/search/search-component";
import Loader from "components/loader/loader-component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "pages/list-activity/list-activity-styles.scss";
import {
  deleteActivityBegin,
  fetchActivitiesBegin,
} from "redux/actions/listActivityAction";

import { toast, ToastContainer } from "react-toastify";
import { getActivityBegin } from "redux/actions/saveActivityAction";

const ListActivity = (props) => {
  useEffect(() => {
    props.fetchActivities();
  }, []);

  return (
    <div className="list-activity">
      {props.loading && <Loader />}
      <Search />
      <h2>List of activities</h2>
      <div className="activity-container">
        <div className="col">Activity Title</div>
        <div className="col">Description</div>
        <div className="col">Activity Date</div>
        <div className="col">Actions</div>
        {props.activities &&
          props.activities.map((activity) => {
            return (
              <Fragment key={activity.id}>
                <div>{activity.activity}</div>
                <div>{activity.description}</div>
                <div>{activity.date}</div>
                <div className="links">
                  <Link
                    to="#"
                    onClick={() => {
                      props.beginGetActivity(activity.id);
                      props.history.push(`/edit/${activity.id}`);
                    }}
                  >
                    Edit |{" "}
                  </Link>
                  <Link
                    to="#"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this activity?"
                        )
                      ) {
                        // Raise delete action
                        props.deleteActivity(activity.id);
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
                          toast.success("Activity deleted successfully!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }
                      }
                    }}
                  >
                    Delete
                  </Link>
                </div>
              </Fragment>
            );
          })}
      </div>
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

const mapStateToProps = ({
  listActivity: { activities, error, loading, pending },
}) => {
  return {
    activities,
    error,
    loading,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActivities() {
      dispatch(fetchActivitiesBegin());
    },
    deleteActivity(id) {
      dispatch(deleteActivityBegin(id));
    },
    beginGetActivity(id) {
      dispatch(getActivityBegin(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListActivity);
