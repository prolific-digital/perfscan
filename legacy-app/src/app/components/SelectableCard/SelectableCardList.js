import React from "react";
import SelectableTitleCard from "./SelectableTitleCard";

class SelectableCardList extends React.Component {

    constructor(props) {
      super(props);
      var selected = props.multiple ? [] : -1;
      var initialState = {
        selected: selected,
        url:null
      };
      this.state = initialState;
    }
  
    onItemSelected(index, url) {
      this.setState((prevState, props) => {
        if (props.multiple) {
          var selectedIndexes = prevState.selected;
          var selectedIndex = selectedIndexes.indexOf(index);
          if (selectedIndex > -1) {
            selectedIndexes.splice(selectedIndex, 1);
            props.onChange(selectedIndexes);
          } else {
            if (!(selectedIndexes.length >= props.maxSelectable)) {
              selectedIndexes.push(index);
              props.onChange(selectedIndexes);
            }
          }
          return {
            selected: selectedIndexes
          };
        } else {
          props.onChange(index, url);
          return {
            selected: index,
            url : url
          }
        }
      });
    }
  
    render() {
      var {
        contents,
        multiple
      } = this.props;
      var content = contents.map((cardContent, i) => {
        var {
          url,
          //title,
          //description,
          name,
          selected
        } = cardContent;
        var selected = multiple ? this.state.selected.indexOf(i) > -1 : this.state.selected == i;
        return (
          <SelectableTitleCard key={i} 
            image={url}
            //title={title} 
            description={name}
            selected={selected} 
            onClick={(e) => this.onItemSelected(i, url)} />
        );
      });
      return (<div className="cardlist">{content}</div>);
    }
  }

  export default SelectableCardList;