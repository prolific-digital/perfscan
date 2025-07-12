import React from "react";
import SelectableCardList from "./SelectableCardList";

import "./selectableCard.scss";

class Example extends React.Component {
    onListChanged(selected, url) {
      this.setState({
        selected: selected,
        url : url
      });
      //this.props.getSelected(this.state.url);
    }
    submit() {
      window.alert("Selected: " + this.state.selected);
    }
    render() {
      
      return (
        <div className="column">
            <h1 className="title">{this.props.title}</h1>
            <SelectableCardList 
              multiple={this.props.multiple}
              maxSelectable={this.props.maxSelectable}
              contents={this.props.cardContents}
              onChange={this.onListChanged.bind(this)}/>
            <button className="card-selectable" onClick={(e) => this.submit() }>
              Get selected
      </button>
        </div>);
    }
  }

  export default Example;