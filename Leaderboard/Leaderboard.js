import React from "react";
import * as interactionService from "../services/interaction.service";
import WizardGrid from "./widgets/WidgetGrid";
import JarvisWidget from "./widgets/JarvisWidget";
import PageHeader from "./PageHeader";
import headerObject from "./../constants/page-header.js";
import LeaderboardList from "../components/LeaderboardList";
import BreedsDropdown from "./BreedsDropdown";
class Leaderboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
      leaderboardByBreedId: [],
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event) {
    event.preventDefault();
    interactionService.getLeaderboard(event.target.value).then(leaders => {
      this.setState({ leaderboardByBreedId: leaders.items });
    });
  }

  componentDidMount() {
    interactionService.getLeaderboard().then(leaders => {
      this.setState({ leaderboard: leaders.items });
    });
  }

  render() {
    const leaderboard = this.state.leaderboard;
    const leaderboardByBreedId = this.state.leaderboardByBreedId;
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-assignment" />
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Leaderboard</li>
          </ol>
        </div>
        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.leaderboardCrud.pageHeader}
            subtitle={headerObject.leaderboardCrud.subTitle}
          />
          <WizardGrid>
            <JarvisWidget
              title={
                <span>
                  <i className="fa fa-trophy" /> Leaderboard
                </span>
              }
            ><h6>Leaders All Breeds</h6>
              {this.state.leaderboard.length > 0 ? (
                <LeaderboardList leaders={leaderboard} />
              ) : (
                <React.Fragment />
              )}
              <div className="row">
              <div className="col-md-6">
              <h6>Leaders By</h6>
              <BreedsDropdown onChange={this.onSelect} />
              </div>
              </div>
              <LeaderboardList leaders={leaderboardByBreedId} />
            </JarvisWidget>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

export default Leaderboard;