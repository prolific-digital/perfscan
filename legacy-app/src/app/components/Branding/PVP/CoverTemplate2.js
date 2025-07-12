import React from "react";

const CoverTemplate2 = (props) => {
  const { logo, report_title, system, report_period, period1, period2, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg465" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <defs id="defs462">
        <linearGradient id="g_secondary">
          <stop style={{ stopColor:Secondary, stopOpacity:"1" }} offset="0" id="stop10232" />
          <stop style={{ stopColor:"#ffffff", stopOpacity:"0" }} offset="1" id="stop10234" />
        </linearGradient>
        <linearGradient id="g_primary">
          <stop style={{ stopColor:Primary, stopOpacity:"1" }} offset="0" id="stop8613" />
          <stop style={{ stopColor:"#ffffff", stopOpacity:"0" }} offset="0.75229359" id="stop8615" />
        </linearGradient>
        <linearGradient id="linearGradient5903">
          <stop style={{ stopColor:"#042c62", stopOpacity:"1" }} offset="0" id="stop5901" />
        </linearGradient>
        <linearGradient xlinkHref="#g_primary" id="linearGradient8619" x1="63.488167" y1="205.16751" x2="76.532585" y2="253.60715" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.9848174,0,0,3.9848174,-199.93733,141.167)" />
        <linearGradient xlinkHref="#g_secondary" id="linearGradient10238" x1="58.561344" y1="249.13876" x2="59.139732" y2="278.92554" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.9848174,0,0,3.9848174,0.7723211,8.6e-4)" />
      </defs>
      <g id="layer1">
        <path style={{ display:"inline", fill:Primary, fillOpacity:"1", stroke:"none", strokeWidth:"0", strokeDashArray:"none", strokeOpacity:"1" }} d="m 482.64252,0 311.72093,497.88294 -0.003,0.20386 L 77.581582,6.65e-4 Z" id="color_primary" />
        <path style={{ display:"inline", fill:Secondary, fillOpacity:"1", stroke:"#31b900", strokeWidth:"0", strokeDashArray:"none", strokeOpacity:"1" }} d="M 502.52096,295.00925 794.50437,678.46259 794.36831,498.08673 Z" id="color_secondary" />
        <path style={{ display:"inline", mixBlendMode:"normal", fill:"url(#linearGradient8619)", fillOpacity:"1", fillRule:"nonzero", stroke:"none", strokeWidth:"1.05431" }} d="M 2.3047541,938.61155 186.68501,1114.3491 H 0 Z" id="colorPrimaryFooter" />
        <path style={{ display:"inline", fill:"url(#linearGradient10238)", fillOpacity:"1", stroke:"none", strokeWidth:"1.05431" }} d="M 56.086387,989.89226 464.60388,1114.3491 185.72875,1113.7729 Z" id="colorSecondaryFooter" />
        <rect style={{ display:"inline", fill:"#ffffff", fillOpacity:"0.25", stroke:"none", strokeWidth:"0", strokeLineCap:"round", strokeLineJoin:"round",strokeDashArray:"none" }} id="logo_holder_client" width="794.22998" height="123" x="0" y="38.458668" ry="0" />
        <image width="105.43162" height="105.43162" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo} id="client_logo" x="27.130211" y="44.282131" />

        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"44.9842px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeWidth:"1.05431", strokeOpacity:"1"}} x="22.232439" y="401.07642" id="system_name">
          <tspan id="tspan4577" x="22.232439" y="401.07642">{system}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"44.9842px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", stroke:"#000000", strokeWidth:"1.05431", strokeOpacity:"1"}} x="22.232439" y="509.96759" id="report_title">
          <tspan id="tspan2589" x="22.232439" y="509.96759">Period Vs Period Analysis</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"30.9266px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:1, stroke:"#030000", strokeWidth:"1.05431", strokeOpacity:"1"}} x="23.262026" y="581.63654" id="report_period">
          <tspan id="tspan4581" x="23.262026" y="581.63654">{report_period}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"28.1151px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", textAlign:"start", writingMode:"lr-tb", direction:"ltr", textAnchor:"start", fill:"#1a1a1a", fillOpacity:"0.797267", stroke:"#1a1a1a", strokeWidth:"1.05431", strokeLineCap:"round", strokeLineJoin:"round" }} x="23.467943" y="635.16229" id="period1">
          <tspan id="tspan1" x="23.467943" y="635.16229">{period1}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"28.1151px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", textAlign:"start", writingMode:"lr-tb", direction:"ltr", textAnchor:"start", fill:"#1a1a1a", fillOpacity:"0.797267", stroke:"#1a1a1a", strokeWidth:"1.05431", strokeLineCap:"round", strokeLineJoin:"round" }} x="23.467943" y="690.76074" id="period2">
          <tspan id="tspan2" x="23.467943" y="690.76074">{period2}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal", fontWeight:"normal",fontStretch:"normal", fontSize:"33.7382px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#000000", strokeWidth:"1.05431", strokeOpacity:"0" }} x="23.056139" y="828.20703" id="report_name">
          <tspan id="tspan6919" x="23.056139" y="828.20703">{report_title}</tspan>
        </text>
        <text xmlSpace="preserve" style={{ fontStyle:"normal",fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"33.7382px",fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", fill:"#1a1a1a", fillOpacity:"1", stroke:"#030000", strokeWidth:"1.05431", strokeOpacity:"1" }} x="22.891375" y="891.08398" id="report_date">
          <tspan id="tspan6915" x="22.891375" y="891.08398">Report Date : {report_date}</tspan>
        </text>


        <image width="105.43162" height="105.43162" preserveAspectRatio="none" style={{ imageRendering:"optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="682" y="1012" />
        <text xmlSpace="preserve" style={{ fontStyle:"normal", fontVariant:"normal", fontWeight:"normal", fontStretch:"normal", fontSize:"22.492px", fontFamily:'Trebuchet MS', fontVariantLigatures:"normal", fontVariantCaps:"normal", fontVariantNumeric:"normal", fontVariantEastAsian:"normal", display:"inline", fill:"#03527c", fillOpacity:"1", stroke:"#03527c", strokeWidth:"1.05431", strokeOpacity:"1" }} x="26.504211" y="1097.7855" id="copyright">
          <tspan id="tspan6935" x="26.504211" y="1097.7855">© 2025 PerfScan. All rights reserved.</tspan>
        </text>
        
      </g>
    </svg>
  )
}

export default CoverTemplate2;
