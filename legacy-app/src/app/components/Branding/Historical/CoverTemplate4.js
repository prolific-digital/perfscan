import React from "react";
import { APP_URL } from "../../../../typeCodes";

const CoverTemplate4 = (props) => {
  const { logo, report_title, system, report_period, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;   
  return (
    <svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg14348" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" >
      <g id="layer1">
        <path style={{ fill:Secondary, fillOpacity:"1", strokeWidth:"2.75527", strokeLineCap:"round", strokeLineJoin:"round", strokeOpacity:"0.995781" }} d="M 1.7595299,123.67833 793.8929,123.37545 793.73213,267.98588 470.89306,454.41806 -0.37698699,453.44584 Z" id="colorSecondary" />
        <path style={{ fill:Primary, fillOpacity:"1", strokeWidth:"2.91086", strokeLineCap:"round", strokeLineJoin:"round", strokeOpacity:"0.995781" }} d="m 480.83053,454.35311 312.87054,-178.44999 0.0227,178.41082 z" id="colorPrimary_2" />
        <rect style={{ fill:Primary, fillOpacity:"1", strokeWidth:"3.0016", strokeLineCap:"round", strokeLineJoin:"round", strokeOpacity:"0.995781" }} id="colorPrimary_1" width="469.50671" height="454.18439" x="1.4203727" y="0.22454648" rx="0" ry="0" />
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"20.6994px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#03527c", fillOpacity:"1", stroke:"#03527c", strokeWidth:"0.970285", strokeOpacity:"1" }} x="10.181613" y="1107.3779" id="text6937">
          <tspan id="tspan6935" x="25" y="1107.3779">© 2025 PerfScan. All rights reserved.</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"41.3989px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#ffffff", fillOpacity:"1", stroke:"#042c62", strokeWidth:"0.970285", strokeOpacity:"1" }} x="233.07744" y="281.7254" id="report_title">
          <tspan id="tspan2589" x="75" y="281">Historical Data</tspan>
          <tspan style={{ textAlign:"center", textAnchor:"center", fill:"#ffffff", strokeWidth:"0.970285" }} id="tspan3" x="75" y="320">Analysis Report</tspan>
        </text>
        <rect style={{ display:"inline", fill:"#ffffff", fillOpacity:"0.797267", stroke:"none", strokeWidth:"1.21645", strokeLineCap:"round", strokeLineJoin:"round" }} id="logo_holder" width="794.9801" height="122.93159" x="0.019908831" y="-1.7131164e-06" transform="matrix(1,8.6048064e-5,-1.6195049e-4,0.99999999,0,0)" ry="0" />
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal",fontSize:"48px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeOpacity:"1" }} x="35.183178" y="691.43866" id="report_title-9">
          <tspan id="tspan2589-4" x="25" y="691.43866">Historical Analysis Report</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", ontSize:"42.6667px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"1" }} x="34.502518" y="521.3219" id="system_name">
          <tspan id="tspan4577" x="25" y="521.3219">Perfscan Demo System</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"29.3333px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"1" }} x="36.355049" y="734.73767" id="report_period">
          <tspan id="tspan4581" x="25" y="734.73767" >January 1-30, 2025</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1",stroke:"#000000",strokeOpacity:"1" }} x="31.57173" y="990.19824" id="report_date">
          <tspan id="tspan6915" x="25" y="990.19824" >Report Date : 01/30/2025</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", ontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"0" }} x="35.840931" y="876.06384" id="report_name">
          <tspan id="tspan6919" x="25" y="876.06384">Doug's Executive Report</tspan>
        </text>
        <image height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo} id="client_logo" x="25" y="11.499996" />
        <image width="100" height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012" />
      </g>
    </svg>
  )
}

export default CoverTemplate4;