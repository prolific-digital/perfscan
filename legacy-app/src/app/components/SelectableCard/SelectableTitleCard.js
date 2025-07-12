import React from "react";
import SelectableCard from "./SelectableCard";


const SelectableTitleCard = (props) => {
    const {title,description,selected, image} = props;

    return (
        <SelectableCard onClick={props.onClick} selected={selected}>
          <div className="content">
            <img src={image} width={80} height={50}/>
            {/*<h1 className="title">{title}</h1>*/}
            <p className="description">{description}</p>
          </div>
        </SelectableCard>
    );
}

export default SelectableTitleCard;