import {useState,Fragment} from 'react'
import PeriodHeaderDetails from "./PeriodHeaderDetails";

function WhatChangedSummary(props) {
//   const [dataTableLoop, setDataTableLoop] = useState([...props.versionsList,'Comp']);
  /* Finding data for detailed display */



  const descriptionColumn =() => {

  };
  return (
    <div>
        <PeriodHeaderDetails props={props}/>
        <table className="table table-bordered table-striped tableAlign">
            <thead>
              <tr style={{backgroundColor:'#75c5f0'}}>
                <th>Change</th>
                <th>Status</th>
                <th>Description of Change</th>                                       
              </tr>
            </thead>
            <tbody>
                   <tr>
                     <td>Application v4.1</td>
                     <td>{
                         <span className="Info">
                         Info</span>
                       }
                     </td> {/* style={{color:"#16aaff"}} */}
                     <td className="findings_col Info">The change was implemented on 02/02/22. The last day for this version was 03/31/22. (Duration: 61 days)</td>
                   </tr>
                   <tr>
                     <td>Application v5.4</td>
                     <td>{
                         <span className="Info">
                         Info</span>
                       }
                     </td> {/* style={{color:"#16aaff"}} */}
                     <td className="findings_col Info">The change was implemented on 03/01/21. The last day for this version was 04/31/22.. (Duration 60 days)</td>
                   </tr>
            </tbody>
        </table>
    </div>
  )
}
export default WhatChangedSummary