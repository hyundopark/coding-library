import React from "react";
import classNames from "classnames";
import * as breedService from "../services/breed.service";
import "./BreedDropdown.css";

class BreedsDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      breeds:[]
    };
    this.selectBreed = this.selectBreed.bind(this);
  }

  selectBreed(e) {
    this.setState({ selectValue: e.target.value });
    this.props.onChange(e);
    this.setState({ isSelected: true });
  }

  componentDidMount() {
    breedService.readAll().then(breeds => {
      this.setState({ breeds: breeds.data.items });
    });
  }

  render() {
    const infowizardSelectClass = classNames({
      infowizard:
        this.props.placeholder === "InfoWizard" &&
        this.state.isSelected === false,
      "form-control": this.props.placeholder === "InfoWizard",
      "input-lg": this.props.placeholder === "InfoWizard",
      "infowizard-selected":
        this.props.placeholder === "InfoWizard" && this.state.isSelected
    });
    const infowizardOptionClass = classNames({
      "infowizard-selected": this.props.placeholder === "InfoWizard",
      "form-control": this.props.placeholder === "InfoWizard",
      "input-lg": this.props.placeholder === "InfoWizard"
    });
    const breeds = this.state.breeds ? (
      this.state.breeds.map(breed => {
        return (
          <option
            className={infowizardOptionClass}
            key={breed._id}
            value={breed._id}
          >
            {breed.name}
          </option>
        );
      })
    ) : (
      <React.Fragment />
    );
    return (
      <select
        type="text"
        className={infowizardSelectClass}
        value={this.props.value}
        onChange={this.selectBreed}
        name="dogBreedId"
      >
        <option>Dog Breed</option>
        {breeds}
      </select>
    );
  }
}

export default BreedsDropdown;