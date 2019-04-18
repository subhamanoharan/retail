import React from "react";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default ({ categories, handleCategorySelect, selectedCategoryIndex, nestedList: NestedList}) => {
  return categories.map((c, i) => {
    const isSelected = selectedCategoryIndex === i;
    return (
      <div key={c}>
        <ListItem
          button
          onClick={handleCategorySelect(i)}
          selected={isSelected}
          key={c}
          divider
        >
          <ListItemText primary={c} key={c} />
          {isSelected && <ExpandMore />}
        </ListItem>
        {isSelected && <NestedList category={c} />}
      </div>
    );
  })
}
