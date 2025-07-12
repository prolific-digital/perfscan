import React from "react";

const CoverTemplate1 = (props) => {
    const { logo, report_title, system, report_period, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;
   

    return (
        <svg width={width} height={height} viewBox="0 0 793.70101 1122.52" version="1.1" id="svg5" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" >
            <defs id="defs2"/>
            <g id="layer1">
                <rect style={{ fill:Secondary, fillOpacity:"1", stroke:{Secondary}, strokeWidth:"0.894022", strokeOpacity:1 }} id="color_Secondary" width="705.99658" height="845.72504" x="-440.63409" y="124.57043" rx="23.809008" transform="rotate(-37.009861)"/>
                <rect style={{ fill:Primary, illOpacity:"1", stroke:"none", strokeWidth:"0.894022", strokeOpacity:1 }} id="colorPrimary" width="705.99658" height="845.72504" x="-554.41425" y="88.787666" rx="23.809008" transform="rotate(-37.009861)"/>
                <rect style={{ fill:"#ffffff", fillOpacity:"1", stroke:"#ffffff", strokeWidth:"0.949561", strokeOpacity:1 }} id="rect9901" width="749.85516" height="898.26392" x="-517.41608" y="-4.2171049" rx="25.288092" transform="rotate(-37.009861)"/>
                <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"21.3333px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", troke:"#030000", strokeOpacity:"1" }} x="12.661418" y="1106.6252" id="copyright">
                    <tspan id="tspan6935" x="17" y="1106.6252">© 2025 PerfScan. All rights reserved.</tspan>
                </text>
                <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"48px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeOpacity:"1" }} x="15.075986" y="416.89383" id="report_title">
                    <tspan id="tspan2589" x="17" y="416.89383">{report_title}</tspan>
                </text>
                <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeOpacity:"1" }} x="14.395328" y="246.77705" id="system_name">
                    <tspan id="tspan4577" x="17" y="246.77705">{system}</tspan>
                </text>
                <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal" ,fontStretch:"normal",fontSize:"29.3333px", fontFamily:'Trebuchet MS',fontVariantLigatures:"normal", fontVariantCaps:"normal",fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeOpacity:"1" }} x="16.24786" y="460.19284" id="report_period">
                    <tspan id="tspan4581" x="17" y="460.19284">{report_period}</tspan>
                </text>
                <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal",fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal",fill:"#1a1a1a", fillOpacity:1,stroke:"#030000", strokeOpacity:"1" }} x="11.464541" y="715.65338" id="report_date">
                    <tspan id="tspan6915" x="17" y="715.65338">Report Date : {report_date}</tspan>
                </text>
                <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal",fontStretch:"normal",fontSize:"32px", fontFamily:'Trebuchet MS',fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal",fill:"#1a1a1a", fillOpacity:1, stroke:"#000000", strokeOpacity:0 }} x="15.733742" y="601.51898" id="report_name">
                    <tspan id="tspan6919" x="17" y="601.51898">{report_name}</tspan>
                </text>
                <rect style={{ fill:"#f4f4f4", fillOpacity:"0.874194", stroke:"none", strokeWidth:"1.11064", strokeLinecap:"round",strokeLinejoin:"round", strokeOpacity:"1" }} id="logo_holder" width="793.19952" height="123" x="0" y="30"/>
                <image height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo} id="client_logo" x="25" y="42"/>
                <image width="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012"/>
            </g>
        </svg>        
    )
}

export default CoverTemplate1;
