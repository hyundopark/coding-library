import React from "react";
import { Link } from "react-router-dom";

function LeaderboardList(props) {
  const leaderboardItems = props.leaders.map(leader => {
    return (
      <tr key={leader._id}>
        <td>
          <Link to={"/user-profile/" + leader._id}>
            {leader.userInformation.length > 0 &&
            leader.userInformation[0].firstName
              ? leader.userInformation[0].firstName +
                " " +
                leader.userInformation[0].lastName
              : "No Name"}
          </Link>
        </td>
        <td>Points: {leader.totalPoints}</td>
        <td>
          {leader.dogInformation.length > 0 && leader.dogInformation[0].name
            ? leader.dogInformation[0].name
            : "No Name"}
        </td>
        <td>
          {leader.dogInformation.length > 0 && leader.dogInformation[0].breed
            ? leader.dogInformation[0].breed
            : "No breed"}
        </td>
        <td>... deleted for sensitivity ...</td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Points</strong>
            </td>
            <td>
              <strong>Dog Name</strong>
            </td>
            <td>
              <strong>Breed</strong>
            </td>
          </tr>
        </thead>
        <tbody>{leaderboardItems}</tbody>
      </table>
    </div>
  );
}

export default LeaderboardList;
