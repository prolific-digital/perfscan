import React from "react";
import { APP_URL } from "../../../../typeCodes";

const CoverTemplate3 = (props) => {
    const { logo, report_title, system, report_period, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;
    return (
        <svg width={width} height={height} viewBox="0 0 793.701 1122.52" version="1.1" id="svg14348" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" >        
        <g id="layer1">
            <rect style={{ display:"inline", fill:Primary, fillOpacity:"1", stroke:"none", strokeWidth:"1.12388", strokeOpacity:"1" }} id="color_primary" width="641.48163" height="288.53296" x="153.18903" y="0"/>
            <rect style={{ display:"inline", fill:Secondary, fillOpacity:"1", stroke:"none", strokeWidth:"1.30839", strokeOpacity:"1" }} id="colorSecondary" width="152.78883" height="1086.5968" x="0" y="0"/>
            <rect style={{ display:"inline", opacity:1, fill:"#ffffff", fillOpacity:"1", stroke:"none", strokeWidth:"1.21645", strokeLinecap:"round", strokeLinejoin:"round" }} id="logo_holder" width="794.9801" height="123" x="0" y="29.999998" transform="matrix(1,8.6048064e-5,-1.6195049e-4,0.99999999,0,0)" ry="0"/>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"20.5803px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#03527c", fillOpacity:"1", stroke:"#03527c", strokeWidth:"0.964689", strokeOpacity:"1" }} x="25" y="1110.5847" id="copyright">
                <tspan id="tspan6935" x="25" y="1110.5847" style={{ strokeWidth:"0.964689" }}>© 2025 PerfScan. All rights reserved.</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"48px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeOpacity:"1" }} x="182.80052" y="589.41638" id="report_title">
                <tspan id="tspan2589" x="165" y="589.41638">{report_title}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1",  stroke:"#000000", strokeOpacity:"1" }} x="182.11986" y="419.29959" id="system_name">
                <tspan id="tspan4577" x="165" y="419.29959">{system}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"29.3333px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeOpacity:"1" }} x="183.9724" y="632.71539" id="report_period">
                <tspan id="tspan4581" x="165" y="632.71539">{report_period}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeOpacity:"1" }} x="179.18907" y="888.1759" id="report_date">
                <tspan id="tspan6915" x="165" y="888.1759">Report Date : {report_date}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"0" }} x="183.45827" y="774.0415" id="report_name">
                <tspan id="tspan6919" x="165" y="774.0415">{report_name}</tspan>
            </text>
            <image height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo} id="client_logo" x="25" y="42"/>
            <image width="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012"/>
        </g>
    </svg>
    )
}

export default CoverTemplate3;
