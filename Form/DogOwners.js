import React from "react";
import * as dogOwnerService from "../../services/dogOwner.service";
import DogOwnerForm from "./DogOwnersForm";
import WizardGrid from "../widgets/WidgetGrid";
import JarvisWidget from "../widgets/JarvisWidget";
import PageHeader from "../PageHeader";
import headerObject from "../../constants/page-header.js";
import { connect } from "react-redux";
import { addDogOwner } from "../../actions/dogOwners";

class DogOwners extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogOwners: []
    };
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
    this.props.onAddDogOwner(item);
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.dogOwners.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.dogOwners.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.dogOwners.concat(updatedFormData);
      }
      return {
        dogOwners: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    dogOwnerService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.dogOwners.filter(item => {
            return item._id !== formData._id;
          });
          return { dogOwners: updatedItems };
        });
        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    dogOwnerService.readAll().then(data => {
      this.setState({ dogOwners: data.items });
    });
  }

  render() {
    const dogOwners = this.state.dogOwners ? (
      this.state.dogOwners.map(dogOwner => (
        <tr key={dogOwner._id} onClick={this.onSelect.bind(this, dogOwner)}>
          <td>
            Name:{dogOwner.firstName}" "{dogOwner.lastName}
          </td>
          <td>Age: {dogOwner.age}</td>
        </tr>
      ))
    ) : (
      <React.Fragment />
    );
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-title="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>

          <ol className="breadcrumb">
            <li>Home</li>
            <li>DogOwners</li>
          </ol>
        </div>

        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.dogOwnersCrud.pageHeader}
            subtitle={headerObject.dogOwnersCrud.subTitle}
          />
          <WizardGrid>
            <div className="row">
              <article className="col-sm-12 col-md-12 col-lg-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-user" />
                      {"  "}Dog Owners
                    </span>
                  }
                >
                  <DogOwnerForm
                    formData={this.state.formData}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    onCancel={this.onCancel}
                  />
                </JarvisWidget>
              </article>

              <article className="col-sm-12 col-md-12 col-lg-6">
                <JarvisWidget
                  title={
                    <span>
                      <i className="fa fa-user" />
                      {"  "}List of Dog Owners
                    </span>
                  }
                >
                  <ul className="list-unstyled">{dogOwners}</ul>
                </JarvisWidget>
              </article>
            </div>
          </WizardGrid>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddDogOwner: dogOwner => {
    dispatch(addDogOwner(dogOwner));
  }
});

export default connect(null, mapDispatchToProps)(DogOwners);
