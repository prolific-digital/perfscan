import React from "react";

const Help = (props) => {
    const {type} = props;

    switch(type){
        case "CP": {
            return (
                <p className="m-0">
                    You would need to re-run the report only if date is changed or current system is changed, 
                    once the report is run you can change the Number of Cores Proposed and Proposed Growth, 
                    both Executive Summary and Charts will change dynamically based on these values.
                    <br /><br />
                    <strong>Potential for Growth (PfG):</strong> This indicates how much the desired workload can grow to reach the maximum possible CPW. 
                    <br /><br />
                    There are two percentage numbers displayed: Avg CPW and Peak CPW.   
                    <br /><br />
                    See example below:
                    <br />
                    <strong>Max Possible CPW:</strong> 10,000
                    <br />
                    <strong>Current Used CPW:</strong> 5,000
                    <br /><br />
                    The PfG would be 100%.
                    <br /><br />
                    In other words, the current workload can grow 100% to reach the max capacity.
                    <br /><br />
                    If the current used CPW was 9,000, the potential for growth would only be 11.11%
                    <br /><br />
                    If you have many peaks throughout the day, it's a good best practice to use the Peak CPW potential for growth percentage.
                </p>
            )
        }
        case "CP-SETTINGS": {
            return (
                <p className="m-0">
                    Help for Capacity Planning Settings.
                </p>
            )
        }
        case "CORE-METRICS": {
            return (
                <p className="m-0">
                    CORE METRICS
                </p>
            )
        }
        default : {
            return (
                <p className="m-0">
                    General Help
                </p>
            )
        }
    }
}

export default Help;