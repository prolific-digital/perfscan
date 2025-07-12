import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {Button} from 'primereact/button'

// Templates 
import CoverTemplate1 from "../../../components/Branding/CapacityAnalysis/CoverTemplate1";
//import CoverTemplate2 from "../../../components/Branding/Historical/CoverTemplate2";
//import CoverTemplate3 from "../../../components/Branding/Historical/CoverTemplate3";
//import CoverTemplate4 from "../../../components/Branding/Historical/CoverTemplate4";
//import CoverTemplate5 from "../../../components/Branding/Historical/CoverTemplate5";
// End Templates 

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'

function CapacityTemplates({setTemplate, template, colorPrimary, colorSecondary, selLogoPrimary, selLogoSecondary}) {
  return (
    <>
        <Swiper navigation={true} modules={[Navigation]}  slidesPerView={3}>
                                    <SwiperSlide>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <CoverTemplate1 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Capacity Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                        <span style={{marginTop:"20px"}}>{template === 'Template1' ? 'SELECTED' :  <Button label="Choose Template 1" onClick={()=>setTemplate("Template1")}/>}</span>
                                        </div>
                                    </SwiperSlide>
                                    {/*
                                    <SwiperSlide>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <CoverTemplate2 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorSecondary} Secondary={colorPrimary} width="300" />
                                        <span style={{marginTop:"20px"}}>{template ==="Template2" ? 'SELECTED' : <Button label="Choose Template 2" onClick={()=>setTemplate("Template2")}/>}</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <CoverTemplate3 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                            <span style={{marginTop:"20px"}}>{template === 'Template3' ? 'SELECTED' : <Button label="Choose Template 3" onClick={()=>setTemplate("Template3")}/>}</span>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <CoverTemplate4 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                            <span style={{marginTop:"20px"}}>{template === 'Template4' ? 'SELECTED' : <Button label="Choose Template 4" onClick={()=>setTemplate("Template4")}/>}</span>
                                        </div>
                                    </SwiperSlide>
                                    
                                    <SwiperSlide>
                                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <CoverTemplate5 
                                            logo = {selLogoPrimary}
                                            logo_s = {selLogoSecondary}
                                            report_name = "Historical Analysis Report"
                                            system = "Greymine"
                                            report_period = "April 1-30, 2022"
                                            report_date = "02/25/2023"
                                            client_name = "Doug's Golf Supply"
                                            Primary={colorPrimary} Secondary={colorSecondary} width="300" />
                                            <span style={{marginTop:"20px"}}>{template === 'Template5' ? 'SELECTED' : <Button label="Choose Template 5" onClick={()=>setTemplate("Template5")}/>}</span>
                                        </div>
                                    </SwiperSlide>*/}
                                </Swiper>
    </>
  )
}

export default CapacityTemplates;