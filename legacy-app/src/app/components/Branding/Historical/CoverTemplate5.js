import React from "react";
import { APP_URL } from "../../../../typeCodes";

const CoverTemplate5 = (props) => {
  const { logo, report_title, system, report_period, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;
   
   
    return (
      <svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg14348" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <defs id="defs14345">
        <linearGradient id="linearGradient36">
          <stop style={{ stopColor:"#f9f9f9", stopOpacity:"1" }} offset="0" id="stop37"/>
          <stop style={{ stopColor:"#cccccc", stopOpacity:"1" }} offset="0.55414832" id="stop40"/>
          <stop style={{ stopColor:"#cccccc", stopOpacity:"1" }} offset="0.70643967" id="stop39"/>
          <stop style={{ stopColor:"#333333", stopOpacity:"0" }}  offset="1" id="stop38"/>
        </linearGradient>
        <linearGradient id="swatch6">
          <stop style={{ stopColor:"#3edb00", stopOpacity:"1" }}  offset="0" id="stop7"/>
        </linearGradient>
        <radialGradient xlinkHref="#linearGradient36" id="radialGradient38" cx="51.72604" cy="95.911453" fx="51.72604" fy="95.911453" r="40.878124" gradientTransform="matrix(5.0035264,-0.09837361,0.08188728,4.9289572,130.18391,218.17217)" gradientUnits="userSpaceOnUse"/>
      </defs>
      <g id="layer1">
        <path id="secondary" style={{ fill:Secondary, fillOpacity:"0.797267", stroke:"none", strokeWidth:"3.42745", strokeLineCap:"round", strokeLineJoin:"round", strokeOpacity:"0.980392" }} d="M 0.99755861,872.57236 1.6786069,719.10961 793.41036,499.08095 l 0.31895,154.46284 z"/>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"21.0077px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#03527c", fillOpacity:"1", stroke:"#03527c", strokeWidth:"0.984733", strokeOpacity:"1" }} x="5.7855344" y="1103.7125" id="text6937" transform="scale(0.99284615,1.0072054)">
          <tspan id="tspan6935" x="5.7855344" y="1103.7125" style={{ strokeWidth:"0.984733" }}>
            © 2025 PerfScan. All rights reserved.
          </tspan>
        </text>
        <path d="M 795.30134,-0.1870658 H 73.705622 A 693.40459,287.54494 0 0 0 758.66089,244.57584 a 693.40459,287.54494 0 0 0 36.64045,-0.99571 z" style={{ fill:Primary, fillOpacity:"1", strokeWidth:"4.41123", strokeLineCap:"round", strokeLineJoin:"round" }} id="Primary"/>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"bold", fontStretch:"normal", fontSize:"52.5191px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#ffffff", fillOpacity:"1", stroke:"none", strokeWidth:"0.984733", strokeOpacity:"1"}} x="562.2099" y="81.142593" id="report_title" transform="scale(0.99284615,1.0072054)">
          <tspan id="tspan2589" x="325" y="81.142593">Historical Data</tspan>
          <tspan id="tspan2590" x="325" y="146.79147">Analysis Report</tspan>			
        </text>
        <circle style={{ fill:"url(#radialGradient38)", fillOpacity:"1", stroke:"none", strokeWidth:"3.81271", strokeLineCap:"round",strokeLineJoin:"round", strokeDashArray:"none", strokeOpacity:"1" }} id="path36" cx="396.8504" cy="685.82666" r="150"/>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"1" }} x="61.154095" y="299.1228" id="system_name">
          <tspan id="tspan4577" x="63" y="299.1228">{system}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"48px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeOpacity:"1" }} x="61.834759" y="469.23956" id="report_title-9">
          <tspan id="tspan2589-4" x="63" y="469.23956">{report_title}</tspan>
        </text>		
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"29.3333px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeOpacity:"1" }} x="63.006634" y="512.53857" id="report_period">
          <tspan id="tspan4581" x="63" y="512.53857">{report_period}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeOpacity:"1" }} x="58.223309" y="970.23163" id="report_date">
          <tspan id="tspan6915" x="63" y="970.23163">Report Date : {report_date}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"0" }} x="61.078289" y="912.66577" id="report_name">
          <tspan id="tspan6919-8" x="63" y="912.66577">{report_name}</tspan>
        </text>
        <image width="200" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality", maxHeight:"200px" }} xlinkHref={logo} id="client_logo" x={logoX} y={logoY}/>
        <image width="100" height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012"/>
      </g>
    </svg>)
}

export default CoverTemplate5;
