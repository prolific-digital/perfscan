import React from "react";

const CoverTemplate5 = (props) => {
	const { logo, report_title, system, report_period, period1, period2, report_date, report_name, width, height, Primary, Secondary, logo_s, logoX, logoY } = props;

	return (
		<svg width={width} height={height} viewBox="0 0 793.70081 1122.5197" version="1.1" id="svg14348" xmlSpace="preserve" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
			<defs id="defs14345">
				<linearGradient id="swatch6">
					<stop style={{ stopColor: "#3edb00", stopOpacity: "1" }} offset="0" id="stop7" />
				</linearGradient>
				<radialGradient xlinkHref="#linearGradient36" id="radialGradient38" cx="51.72604" cy="95.911453" fx="51.72604" fy="95.911453" r="40.878124" gradientTransform="matrix(5.0338715,-0.09897022,0.08238392,4.95885,125.7386,219.73222)" gradientUnits="userSpaceOnUse" />
				<linearGradient id="linearGradient36">
					<stop style={{ stopColor: "#f9f9f9", stopOpacity: "1" }} offset="0" id="stop37" />
					<stop style={{ stopColor: "#cccccc", stopOpacity: "1" }} offset="0.55414832" id="stop40" />
					<stop style={{ stopColor: "#cccccc", stopOpacity: "1" }} offset="0.70643967" id="stop39" />
					<stop style={{ stopColor: "#333333", stopOpacity: "0" }} offset="1" id="stop38" />
				</linearGradient>
			</defs>
			<g id="layer1">
				<path id="rect1" style={{ fill: "#297f97", fillOpacity: "0.797267", stroke: "none", strokeWidth: "3.44823", strokeLineCap: "round", strokeLineJoin: "round", strokeOpacity: "0.980392" }} d="m -2.2312407,878.10116 0.685169,-154.39345 796.5333517,-221.36307 0.32093,155.3996 z" />
				<path d="M 794.88973,0.0487023 H 68.917775 A 697.6099,289.28882 0 0 0 758.02707,246.29602 a 697.6099,289.28882 0 0 0 36.86266,-1.00174 z" style={{ fill:Primary, fillOpacity:"1", strokeWidth:"4.438", strokeLineCap:"round", strokeLineJoin:"round" }} id="path9"/>
				<text xmlSpace="preserve" style={{ fontStyle: "normal", fontVariant: "normal", fontWeight: "bold", fontStretch: "normal", fontSize: "52.8377px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", whiteSpace: "pre", inlineSize: "419.734", display: "inline", fill: "#ffffff", fillOpacity: "1", stroke: "none", strokeWidth: "0.990704", strokeOpacity: "1" }} x="560.34692" y="81.869911" id="report_title" transform="matrix(0.99284614,0,0,1.0072054,-203.64675,-2.1213203)">
					<tspan x="800" y="81.869911" style={{ textAlign: "center", textAnchor: "middle" }} id="tspan2">Period Vs Period</tspan>
					<tspan x="745" y="147.91704" style={{ textAlign: "center", textAnchor: "middle" }} id="tspan4">Analysis Report</tspan>
				</text>
				<circle style={{ fill: "url(#radialGradient38)", fillOpacity: "1", stroke: "none", strokeWidth: "3.83583", strokeLineCap: "round", strokeLineJoin: "round", strokeDashArray: "none", strokeOpacity: "1" }} id="path36" cx="394.02231" cy="690.22284" r="150.90971" />
				<image width="102.95409" height="102.95409" preserveAspectRatio="none" style={{ imageRendering: "optimizeQuality" }} xlinkHref={logo_s} id="app_logo" x="658.36316" y="1007.5536" />
				<text xmlSpace="preserve" style={{ fontStyle: "normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "43.9274px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fill: "#1a1a1a", fillOpacity: "1", stroke: "#000000", strokeWidth: "1.02954", strokeOpacity: "1" }} x="11.836232" y="267.07184" id="system_name">
					<tspan id="tspan4577" x="11.836232" y="267.07184">{system}</tspan>
				</text>
				<text xmlSpace="preserve" style={{ fontStyle: "normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "43.9274px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fill: "#1a1a1a", stroke: "#000000", strokeWidth: "1.02954", strokeOpacity: "1" }} x="11.836232" y="373.40414" id="report_title-8" >
					<tspan id="tspan2589-2" x="11.836232" y="373.40414">Period Vs Period Analysis</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "30.1998px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fill: "#1a1a1a", fillOpacity: "1", stroke: "#030000", strokeWidth: "1.02954", strokeOpacity: "1" }} x="12.84162" y="443.38904" id="report_period">
					< tspan id="tspan4581" x="12.84162" y="443.38904">Period Analyzed</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "27.4544px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", textAlign: "start", writingMode: "lr-tb", direction: "ltr", textAnchor: "start", fill: "#1a1a1a", fillOpacity: "0.797267", stroke: "#1a1a1a", strokeWidth: "1.02954", strokeLineCap: "round", strokeLineJoin: "round" }} x="13.042693" y="495.65686" id="period1" >
					<tspan id="tspan1" x="13.042693" y="495.65686">{period1}</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "27.4544px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", textAlign: "start", writingMode: "lr-tb", direction: "ltr", textAnchor: "start", fill: "#1a1a1a", fillOpacity: "0.797267", stroke: "#1a1a1a", strokeWidth: "1.02954", strokeLineCap: "round", strokeLineJoin: "round" }} x="13.042693" y="549.94885" id="period2" >
					<tspan id="tspan2-8" x="13.042693" y="549.94885">{period2}</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "32.9456px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fill: "#1a1a1a", fillOpacity: "1", stroke: "#000000", strokeWidth: "1.02954", strokeOpacity: "0" }} x="18.331758" y="918.21442" id="report_name">
					< tspan id="tspan6919" x="18.331758" y="918.21442">Doug's Executive Report</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "32.9456px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fill: "#1a1a1a", fillOpacity: "1", stroke: "#030000", strokeWidth: "1.02954", strokeOpacity: "1" }} x="18.170855" y="979.61389" id="report_date">
					< tspan id="tspan6915" x="18.170855" y="979.61389"> Report Date: {report_date}</tspan>
				</text >
				<text xmlSpace="preserve" style={{ fontStyle: " normal", fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "21.9635px", fontFamily: 'Trebuchet MS', fontVariantLigatures: "normal", fontVariantCaps: "normal", fontVariantNumeric: "normal", fontVariantEastAsian: "normal", display: "inline", fill: "#03527c", fillOpacity: "1", stroke: "#03527c", strokeWidth: "1.02954", strokeOpacity: "1" }} x="16.214592" y="1102.7352" id="copyright">
					< tspan id="tspan6935" x="16.214592" y="1102.7352" >© 2025 PerfScan.All rights reserved.</tspan>
				</text >
				<image width="102.95409" height="102.95409" preserveAspectRatio="none" style={{ imageRendering: "optimizeQuality" }} xlinkHref={logo} id="client_logo" x="347.58603" y="646.91034" />
			</g >
		</svg >)
}

export default CoverTemplate5;
