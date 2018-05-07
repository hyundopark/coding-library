import React from "react";
import * as validationHelper from "../../helpers/validation.helper";
import * as dogOwnerService from "../../services/dogOwner.service";
import SubscriptionRadio from "../SubscriptionRadio";

class DogOwnerForm extends React.Component {
  constructor(props) {
    super(props);
    const formData = this.convertPropsToFormData(props);

    this.state = {
      dogOwners: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const dogOwner = props.formData && props.formData._id ? props.formData : {};

    const initializedDogOwner = {
      _id: dogOwner._id || "",
      name: dogOwner.name || "",
      lastName: dogOwner.lastName || "",
      zipCode: dogOwner.zipCode || "",
      email: dogOwner.email || "",
      phone: dogOwner.phone || "",
      dogs: dogOwner.dogs || "",
      subscriptionLevel: dogOwner.subscriptionLevel || ""
    };

    let formData = {
      _id: {
        originalValue: initializedDogOwner._id,
        value: initializedDogOwner._id,
        valid: true,
        validation: {},
        touched: false
      },
      name: {
        originalValue: initializedDogOwner.name,
        value: initializedDogOwner.name,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      lastName: {
        originalValue: initializedDogOwner.lastName,
        value: initializedDogOwner.lastName,
        valid: true,
        validation: {
          required: true,
          maxLength: 50
        },
        touched: false
      },
      zipCode: {
        originalValue: initializedDogOwner.zipCode,
        value: initializedDogOwner.zipCode,
        valid: true,
        validation: {
          maxLength: 50,
          required: true,
          zipCode: true
        },
        touched: false
      },
      email: {
        originalValue: initializedDogOwner.email,
        value: initializedDogOwner.email,
        valid: true,
        validation: {
          maxLength: 50,
          email: true
        },
        touched: false
      },
      phone: {
        originalValue: initializedDogOwner.phone,
        value: initializedDogOwner.phone,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      dogs: {
        originalValue: initializedDogOwner.dogs,
        value: initializedDogOwner.dogs,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      },
      subscriptionLevel: {
        originalValue: initializedDogOwner.subscriptionLevel,
        value: initializedDogOwner.subscriptionLevel,
        valid: true,
        validation: {
          maxLength: 50
        },
        touched: false
      }
    };

    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }
    return formData;
  }

  onSave(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      name: this.state.formData.name.value,
      lastName: this.state.formData.lastName.value,
      zipCode: this.state.formData.zipCode.value,
      email: this.state.formData.email.value,
      phone: this.state.formData.phone.value,
      dogs: this.state.formData.dogs.value,
      subscriptionLevel: this.state.formData.subscriptionLevel.value
    };
    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      dogOwnerService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      dogOwnerService
        .create(item)
        .then(data => {
          this.setState(prevState => {
            const field = { ...prevState.formData._id, _id: data };
            const formData = { ...prevState.formData, _id: field };
            return { ...prevState, formData: formData };
          });
          that.props.onSave({ ...item, _id: data.item });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="widget-body">
          <form id="dogOwnerForm" method="post">
            <fieldset>
              <legend>Dog Owner</legend>

              <div
                className={
                  !this.state.formData.name.valid &&
                  this.state.formData.name.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">First Name:</label>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={this.state.formData.name.value}
                      onChange={this.onChange}
                    />
                    <i
                      className={
                        !this.state.formData.name.valid &&
                        this.state.formData.name.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      style={
                        !this.state.formData.name.touched
                          ? { display: "none" }
                          : null
                      }
                    />
                    {!this.state.formData.name.valid &&
                    this.state.formData.name.touched ? (
                      <small className="help-block">
                        First Name is required
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.lastName.valid &&
                  this.state.formData.lastName.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">Last Name:</label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="form-control"
                      value={this.state.formData.lastName.value}
                      onChange={this.onChange}
                    />
                    <i
                      className={
                        !this.state.formData.lastName.valid &&
                        this.state.formData.lastName.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      style={
                        !this.state.formData.lastName.touched
                          ? { display: "none" }
                          : null
                      }
                    />
                    {!this.state.formData.lastName.valid &&
                    this.state.formData.lastName.touched ? (
                      <small className="help-block">
                        Last Name is required
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.zipCode.valid &&
                  this.state.formData.zipCode.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">Zip Code:</label>

                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      className="form-control"
                      value={this.state.formData.zipCode.value}
                      onChange={this.onChange}
                    />
                    <i
                      className={
                        !this.state.formData.zipCode.valid &&
                        this.state.formData.zipCode.touched
                          ? "form-control-feedback glyphicon glyphicon-remove"
                          : "form-control-feedback glyphicon glyphicon-ok"
                      }
                      style={
                        !this.state.formData.zipCode.touched
                          ? { display: "none" }
                          : null
                      }
                    />
                    {!this.state.formData.zipCode.valid &&
                    this.state.formData.zipCode.touched ? (
                      <small className="help-block">
                        Please enter a valid zip code.
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.email.valid &&
                  this.state.formData.email.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">E-mail:</label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={this.state.formData.email.value}
                      onChange={this.onChange}
                    />

                    {!this.state.formData.email.valid &&
                    this.state.formData.email.touched ? (
                      <small className="help-block">
                        You must enter valid e-mail
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.phone.valid &&
                  this.state.formData.phone.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">Phone:</label>

                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      className="form-control"
                      value={this.state.formData.phone.value}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.dogs.valid &&
                  this.state.formData.dogs.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12 has-feedback">
                    <label htmlFor="name">Dogs:</label>

                    <input
                      type="dogs"
                      name="dogs"
                      id="dogs"
                      className="form-control"
                      value={this.state.formData.dogs.value}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  !this.state.formData.subscriptionLevel.valid &&
                  this.state.formData.subscriptionLevel.touched
                    ? "form-group has-error"
                    : "form-group"
                }
              >
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="subscriptionLevel">
                      Subscription Level:
                    </label>
                  </div>

                  <div className="col-md-12">
                    <SubscriptionRadio
                      onChange={this.onChange}
                      selectOption={this.state.formData.subscriptionLevel.value}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="form-actions">
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      onClick={this.onSave}
                      className="btn btn-primary btn-sm"
                      disabled={!this.state.formValid}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={this.props.onCancel}
                      className="btn btn-default btn-sm"
                    >
                      Cancel
                    </button>
                    {this.state.formData._id.value ? (
                      <button
                        type="button"
                        onClick={() => this.props.onDelete(this.state.formData)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default DogOwnerForm;
