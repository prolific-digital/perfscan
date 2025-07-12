import React from "react";
import { APP_URL } from "typeCodes";

const CoverTemplate3 = (props) => {
    const { logo, report_name, system, report_period, report_date, client_name, width, height, Primary, Secondary, logo_s } = props;
    const cover_img = `${APP_URL}cover_3.png`;

    return (
        <svg width={width} height={height} viewBox="0 0 215.9 279.4" version="1.1" id="svg14348">
            <defs id="defs14345">
                <linearGradient id="swatch6">
                    <stop style={{stopColor:"#3edb00",stopOpacity:"1"}} offset="0" id="stop7" />
                </linearGradient>
                <linearGradient href="#swatch6" id="linearGradient7" x1="-0.32677025" y1="133.49591" x2="41.871536" y2="133.49591" gradientUnits="userSpaceOnUse" />
            </defs>
            <g id="layer1">
                <rect style={{ fill:"#ffffff", fillOpacity:"1", stroke:"#31b900", strokeWidth:"0", strokeLinecap:"round", strokeLineJoin:"round"}} id="rect27464" width="215.7168" height="12.936479" x="0.095286168" y="266.46643" />
                <image width="215.89999" height="143.93333" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} href={cover_img} id="image629" x="0" y="74.916267" />
                <rect style={{ display:"inline", fill:"#002d89", fillOpacity:"1", stroke:"none", strokeWidth:"0.306681", strokeOpacity:1}} id="colorPrimary" width="174.15865" height="79.134758" x="41.774094" y="0.13475499" />
                <rect style={{ display:"inline", fill:"#c1c9cd",fill-opacity:"0.799163",stroke:"none",strokeWidth:"0.471793",strokeOpacity:"1"}} id="rect14420-9" width="174.05904" height="187.39018" x="41.77383" y="79.084" />
                <text xml:space="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"8.46667px", fontFamily:'Trebuchet MS', display:"inline", fill:"#000000", fillOpacity:"1", stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.523094" y="236.79291" id="client_name">
                    <tspan id="tspan6919" x="42.523094" y="236.79291" style={{fill:"#000000",fillOpacity:1,stroke:"#000000",strokeWidth:"0.264583",strokeOpacity:"1"}}>
                        Doug's Golf Supply
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"8.46667px", fontFamily:'Trebuchet MS', display:"inline", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.481758" y="225.63867" id="ReportDate">
                    <tspan id="tspan6915" x="42.481758" y="225.63867" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"8.46667px", fontFamily:'Trebuchet MS', fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }}>
                        Report Date : 02/13/2023
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:bold,fontStretch:"normal",fontSize:5.64444px,fontFamily:'Trebuchet MS',textAlign:"center", textAnchor:"middle", fill:"#042c62", fillOpacity:"1", strokeWidth:1, strokeLinecap:"round", strokeLineJoin:"round" }} x="125.66023" y="179.82935" id="num_cores_growth">
                    <tspan id="tspan1" x="125.66023" y="179.82935" style="strokeWidth:1">
                        Num Cores - Growth
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:bold,fontStretch:"normal",fontSize:"5.64444px", fontFamily:'Trebuchet MS', textAlign:"center", textAnchor:"middle", fill:"#042c62", fillOpacity:"1", strokeWidth:1, strokeLinecap:"round",strokeLineJoin:"round" }} x="95.371239" y="164.09943" id="proposed_system">
                    <tspan id="tspan2-5" x="95.371239" y="164.09943" style="text-align:start,text-anchor:start,strokeWidth:1">
                        - S1022 9105-22B-78733F1</tspan>
                    <tspan x="95.371239" y="171.15498" id="tspan5" style="text-align:start,text-anchor:start,strokeWidth:1">
                        - EPGR-1 Cores(26575)
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"6.35px", fontFamily:'Trebuchet MS', fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.685917" y="164.30392" id="proposed_system_label">
                    <tspan id="tspan4581-1" x="42.685917" y="164.30392" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"6.35px", fontFamily:'Trebuchet MS',strokeWidth:"0.264583" }}>
                        Proposed System
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"bold", fontStretch:"normal", fontSize:"5.64444px", fontFamily:'Trebuchet MS', textAlign:"center", textAnchor:"middle", fill:"#042c62", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"round", strokeLineJoin:"round" }} x="96.781639" y="147.43388" id="current_system">
                    <tspan id="tspan2-1" x="96.781639" y="147.43388" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"bold", fontStretch:"normal", fontSize:5.64444px,fontFamily:'Trebuchet MS',strokeWidth:1 }}>
                        - S1022 9105-22B-78733F1
                    </tspan>
                    <tspan x="96.781639" y="154.48944" id="tspan4" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"bold", fontStretch:"normal", fontSize:"5.64444px", fontFamily:'Trebuchet MS',strokeWidth:1 }}>
                        - EPGR-1 Cores(26575)
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:6.35px,fontFamily:'Trebuchet MS',fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.98917" y="147.83047" id="current_system_label">
                    <tspan id="tspan4581-5" x="42.98917" y="147.83047" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal" ,fontSize:"6.35px", fontFamily:'Trebuchet MS', strokeWidth:"0.264583" }}>
                        Current System
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal", fontWeight:"bold", fontStretch:"normal", fontSize:"5.64444px", fontFamily:'Trebuchet MS', textAlign:"center", textAnchor:"middle", fill:"#042c62", fillOpacity:"1", strokeWidth:"1", strokeLinecap:"round", strokeLineJoin:"round" }} x="121.69353" y="134.78477" id="busy_day">
                    <tspan id="tspan2" x="121.69353" y="134.78477" style={{ strokeWidth:"1" }} >
                        - Busy Day Selected
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"6.35px", fontFamily:'Trebuchet MS',fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.782063" y="134.65248" id="busy_day_label">
                    <tspan id="tspan4581" x="42.782063" y="134.65248" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"6.35px",fontFamily:'Trebuchet MS',strokeWidth:"0.264583" }}>
                        Busy Day Selected
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"9.87777px", fontFamily:'Trebuchet MS', fill:"#1a1a1a" , stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.729115" y="119.31042" id="report_name">
                    <tspan id="tspan2589" x="42.729115" y="119.31042" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"9.87777px", fontFamily:'Trebuchet MS', fill:"#1a1a1a", strokeWidth:"0.264583" }}>
                        Capacity Planning Analysis Report
                    </tspan>
                </text>
                <text xml:space="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"11.2889px", fontFamily:'Trebuchet MS', display:"inline",fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }} x="42.958614" y="98.332504" id="System">
                    <tspan id="tspan4577" x="42.958614" y="98.332504" style={{ fill:"#1a1a1a",fillOpacity:"1", stroke:"#000000", strokeWidth:"0.264583", strokeOpacity:"1" }}>
                        Americas - Harrisburg
                    </tspan>
                </text>
                <rect style={{ display:"inline", fill:"#eeeeee",fillOpacity:"1", stroke:"none", strokeWidth:"0.184915", strokeOpacity:"1" }} id="colorSecondary" width="41.90477" height="79.135002" x="0" y="0.13500001" />
                <rect style={{ display:"inline", fill:"#eeeeee",fillOpacity:"0.702041", stroke:"none", strokeWidth:"0.284554", strokeOpacity:"1" }} id="colorSecondaryA" width="41.904999" height="187.39018" x="0" y="79.084404" />
                <rect style={{ opacity:"0.113445",fill:"url(#linearGradient7)", fillOpacity:"1", stroke:"none", strokeWidth:"0.906603", strokeLinecap:"round", strokeLineJoin:"round", strokeOpacity:"0.995781" }} id="rect1" width="42.198307" height="267.26422" x="-0.32677025" y="-0.13619792" rx="6.2064109" ry="0" />
                <rect style={{ display:"inline",opacity:1,fill:#ffffff,fillOpacity:"0.503704", stroke:"none", strokeWidth:"0.320442", strokeLinecap:"round", strokeLineJoin:"round" }} id="logo_holder" width="216.00502" height="31.395744" x="0.006777077" y="7.9375" transform="matrix(1,8.0879925e-5,-1.7229895e-4,0.99999999,0,0)" ry="0" />
                <image width="55.028954" height="10.780676" preserveAspectRatio="none" style={{ display:"inline", imageRendering:"optimizeQuality" }} href="" id="app_logo" x="159.65303" y="267.1347" />
                <text xml:space="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal", fontStretch:"normal",fontSize:"5.64444px", fontFamily:'Trebuchet MS', display:"inline", fill:"#03527c", fillOpacity:"1", stroke:"#03527c", strokeWidth:"0.264583", strokeOpacity:"1" }} x="1.8469522" y="275.47607" id="text6937">
                    <tspan id="tspan6935" x="1.8469522" y="275.47607" style={{ strokeWidth:"0.264583" }}>
                        © 2025 PerfScan. All rights reserved.
                    </tspan>
                </text>
                <image width="64.822914" height="13.229167" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} href="../backend/resources/static/assets/1/logos/perfscan_logo_nobg.png" id="image1" x="5.001359" y="17.029524" />
            </g>
        </svg>
    )
}

export default CoverTemplate3;
