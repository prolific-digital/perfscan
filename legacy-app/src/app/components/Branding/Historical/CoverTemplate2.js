import React from "react";
import { APP_URL } from "../../../../typeCodes";

const CoverTemplate2 = (props) => {
  const { logo, report_title, system, report_period, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;       
    return (
    <svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg465" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" >
      <defs id="defs462">
        <linearGradient id="g_secondary">
          <stop style={{ stopColor:{Secondary}, stopOpacity:"1" }} offset="0" id="stop10232" />
          <stop style={{ stopColor:"#ffffff", stopOpacity:"0"  }} offset="1" id="stop10234" />
        </linearGradient>
        <linearGradient id="g_primary">
          <stop style={{ stopColor:Primary, stopOpacity:"1" }} offset="0" id="stop8613" />
          <stop style={{ stopColor:"#ffffff" , stopOpacity:"0" }} offset="0.75229359" id="stop8615" />
        </linearGradient>
        <linearGradient id="linearGradient5903">
          <stop style={{ stopColor:"#042c62", stopOpacity:"1" }} offset="0" id="stop5901"/>
        </linearGradient>
        <linearGradient xlinkHref="#g_primary" id="linearGradient8619" x1="63.488167" y1="205.16751" x2="76.532585" y2="253.60715" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.6498022,0,0,3.9934108,-182.41111,143.65723)"/>
        <linearGradient xlinkHref="#g_secondary" id="linearGradient10238" x1="58.561344" y1="249.13876" x2="59.139732" y2="278.92554" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.6498022,0,0,3.9934108,1.4242954,2.1866678)"/>
      </defs>
      <g id="layer1">
        <path style={{ display:"inline", fill:Primary,fillOpacity:"1", stroke:"#31b900", strokeWidth:"0", strokeDasharray:"none", strokeOpacity:"1" }} d="M 524.4108,299.11031 793.1443,683.39059 793.01962,503.5821 Z" id="colorPrimary"/>
        <path style={{ display:"inline", mixBlendMode:"normal", fill:"url(#linearGradient8619)", fillOpacity:"1", fillRule:"nonzero", stroke:"none", strokeWidth:"1.01011" }} d="M 0.50928631,942.43514 167.6492,1123.1888 0.33049255,1122.0295 Z" id="colorPrimaryFooter"/>
        <path style={{ display:"inline", fill:"url(#linearGradient10238)", fillOpacity:1, stroke:"none", strokeWidth:"1.01011" }} d="M 47.837153,994.01972 425.48738,1122.4159 H 162.1361 Z" id="colorSecondaryFooter"/>
        <path style={{ display:"inline", fill:Secondary, fillOpacity:"1", stroke:"none", strokeWidth:0, strokeDasharray:"none", strokeOpacity:"1" }} d="M 505.65709,0.732312 793.28847,503.99271 792.67105,503.58206 133.01126,1.2794763 Z" id="colorSecondary"/>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"21.549px", fontFamily:'Trebuchet MS',  fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#1a1a1a", fillOpacity:"1", stroke:"#1a1a1a", strokeWidth:"1.01011",strokeOpacity:"1" }} x="17" y="1061.5697" id="copyright" transform="scale(0.95601052,1.0460136)">
          <tspan id="tspan6935" x="17" y="1061.5697" style={{ fill:"#1a1a1a",stroke:"#1a1a1a",strokeWidth:"1" }}>© 2025 PerfScan. All rights reserved.</tspan>
        </text>
        <g id="layer2">
          <rect style={{ display:"inline",fill:"#ffffff", fillOpacity:"0.797267", stroke:"none", strokeWidth:"0", strokeLinecap:"round", strokeLinejoin:"round", strokeDasharray:"none" }} id="logo_holder_client" width="792.3028" height="123" x="0" y="30" ry="0"/>
          <image height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo} id="client_logo" x="25" y="42"/>
          <image width="100" height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012"/>
        </g>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"48px", fontFamily:'Trebuchet MS',  fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeOpacity:"1" }} x="17" y="549.26117" id="report_title">
          <tspan id="tspan2589" x="17" y="549.26117">{report_title}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"1" }} x="17" y="379.14435" id="system_name">
          <tspan id="tspan4577" x="17" y="379.14435">{system}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"29.3333px", fontFamily:'Trebuchet MS', fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal",fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeOpacity: 1}} x="17" y="592.56018" id="report_period">
          <tspan id="tspan4581" x="17" y="592.56018">{report_period}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal",fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeOpacity:1 }} x="17" y="848.02069" id="report_date">
          <tspan id="tspan6915" x="17" y="848.02069">Report Date : {report_date}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",fontStretch:"normal",fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:0 }} x="17" y="733.88629" id="report_name">
          <tspan id="tspan6919" x="17" y="733.88629">{report_name}</tspan>
        </text>
      </g>
    </svg>
    )
}

export default CoverTemplate2;
