import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
  
  state = {
    isEditing: false,
    text: this.props.text,
  };

  onClickEdit = (e) => {
    e.stopPropagation();
    this.setState({isEditing: true});
  }

  onClickSave = (e) => {
    e.stopPropagation();
    this.setState({ isEditing: false });
    this.props.onChange(this.state.text);
  }

  onChangeInput = (e) => {
    this.setState({ text: e.target.value });
  }

  renderItem = () => {
    let cls = 'list-group-item list-group-item-action d-flex justify-content-between';
    if (this.props.isActive) {
      cls += ' list-group-item-primary';
    }
    return (
      <li
        className={cls}
        onClick={this.props.onSelect}
      >
        {this.state.text}
        <span>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={this.onClickEdit}
          >
          edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={this.props.onRemove}
          >
            X
          </button>
        </span>
      </li>
    );
  }

  renderItemEditing = () => {
    return (
      <div className="input-group edit-item">
        <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeInput}/>
        <div className="input-group-append">
          <button className="btn btn-success btn-sm" type="button" onClick={this.onClickSave}>save</button>
        </div>
      </div>
    );
  }

  render() {
    return this.state.isEditing ? this.renderItemEditing() : this.renderItem();
  }
}

ListItem.defaultProps = {
  text: '',
  isActive: false,
}

ListItem.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListItem;