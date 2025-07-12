import React from "react";

const CoverTemplate1 = (props) => {
    const { logo, report_title, system, report_period, period1, period2, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;
    return (
    <svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg5" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <defs id="defs2" />
        <g id="layer1">
            <rect style={{ fill:Secondary, fillOpacity:"1", stroke:"#d6d6d6", strokeWidth:"0.844307", strokeOpacity:"1" }} id="color_Secondary" width="666.73749" height="798.69598" x="-411.68396" y="192.04686" rx="22.485037" transform="rotate(-37.009861)" />
			<rect style={{ fill:Primary, fillOpacity:"1", stroke:"none", strokeWidth:"0.844307", strokeOpacity:"1"}} id="colorPrimary" width="666.73749" height="798.69598" x="-519.13702" y="158.25395" rx="22.485037" transform="rotate(-37.009861)" />
			<rect style={{ fill:"#ffffff", fillOpacity:"1", stroke:"#ffffff", strokeWidth:"0.896758", strokeOpacity:"1"}} id="content" width="708.15698" height="848.31329" x="-484.19629" y="70.421021" rx="23.88187" transform="rotate(-37.009861)" />
			<rect style={{ fill:"#f4f4f4", fillOpacity:"0.874194", stroke:"none", strokeWidth:"1.11117", strokeLinecap:"round", strokeLineJoin:"round", strokeOpacity:"1" }} id="logo_holder" width="793.94855" height="123" x="0" y="30" />            
            <image height="100" preserveAspectRatio="none" style={{imageRendering:"optimizeQuality"}} xlinkHref={logo} id="client_logo" x="25" y="42" />
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1, stroke:"#000000", strokeOpacity:"1" }} x="22.375" y="313.39145" id="system_name">
                <tspan id="tspan4577" x="22.375" y="313.39145">{system}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"42.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000",strokeOpacity:"1" }} x="22.375002" y="416.67279" id="report_title">
                <tspan id="tspan2589" x="22.375002" y="416.67279">Period Vs Period Analysis</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"29.3333px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1,stroke:"#030000", strokeOpacity:1 }} x="23.351568" y="484.64951" id="report_period">
                <tspan id="tspan4581" x="23.351568" y="484.64951">{report_period}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"26.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", textAlign:"start", writingMode:"lr-tb", direction:"ltr", textAnchor:"start", fill:"#1a1a1a", fillOpacity:"0.797267", stroke:"#1a1a1a", strokeLineCap:"round", strokeLineJoin:"round" }} x="23.546873" y="535.41766" id="period1">
                <tspan id="tspan1" x="23.546873" y="535.41766">{period1}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"26.6667px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", textAlign:"start", writingMode:"lr-tb", direction:"ltr", textAnchor:"start", fill:"#1a1a1a", fillOpacity:"0.797267", stroke:"#1a1a1a", strokeLineCap:"round", strokeLineJoin:"round" }} x="23.546873" y="588.15192" id="period2">
                <tspan id="tspan2" x="23.546873" y="588.15192">{period2}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", ill:"#1a1a1a", fillOpacity:1, stroke:"#000000", strokeOpacity:"0"}} x="23.156252" y="718.51703" id="report_name">
                <tspan id="tspan6919" x="23.156252" y="718.51703">{report_title}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"32px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeOpacity:"1" }} x="23.000002" y="778.15485" id="report_date">
                <tspan id="tspan6915" x="23.000002" y="778.15485">Report Date : {report_date}</tspan>
            </text>
            <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"21.3333px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeOpacity:"1" }} x="19.37606" y="1105.376" id="copyright">
                <tspan id="tspan6935" x="19.37606" y="1105.376">© 2025 PerfScan. All rights reserved.</tspan>
            </text>
            <image width="100" height="100" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012" />           
        </g>
    </svg>
    )
}

export default CoverTemplate1;
