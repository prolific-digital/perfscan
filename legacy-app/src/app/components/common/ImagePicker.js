import React from "react"
import styled from "styled-components";

export function InputCard({ title, checked, imgPath, points }) {
    
    return (
        <div className={checked ? "card checked" : "card"}>
            <div className="header-container">
                <span className="card-title">{title}</span>
                <img src={imgPath} alt="regular focus"></img>
            </div>
            <ul>
                {points.map((point) =>
                    <li key={point.toString()}>{point}</li>
                )}
            </ul>
        </div >
    );
}