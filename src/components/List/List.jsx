import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';

const List = ({items, activeItemId, selectHandler, removeHandler, changeHandler}) => (
  <ul className="list list-group">
    {
      items.map( item => (
        <ListItem
          key={item.id}
          text={item.name}
          isActive={activeItemId === item.id}
          onSelect={selectHandler(item.id)}
          onRemove={removeHandler(item.id)}
          onChange={changeHandler(item.id)}
        />
      ))
    }
  </ul>
);

List.defaultProps = {
  items: [],
}

List.propTypes = {
  items: PropTypes.array,
  activeItemId: PropTypes.string,
  selectHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
}

export default List;

