import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
  Radio
} from "reactstrap";
import { Toast } from 'primereact/toast';
import {Button} from 'primereact/button'
import { FileUpload } from 'primereact/fileupload';
import { Swiper, SwiperSlide } from "swiper/react";



import { Pagination } from "swiper";
import { Navigation } from "swiper";

import { ChromePicker } from 'react-color'
import {ReactComponent as Template} from "../../components/Branding/brand_template.svg"
import BrandTemplate from "../../components/Branding/Historical/BrandTemplate";
import ColorPicker from "../../components/common/ColorPickerF";

import SettingHeader from "./SettingHeader";
import Example from "../../components/SelectableCard/Example";
//import * as imgsall from "../../../assets"


{/**
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
 */}
 
const ManageBranding = () => {
    const [activeTabID, setActiveTabID] = useState(1);
    const [colorPrimary, setColorPrimary] = useState('#492107');
    const [colorSecondary, setColorSecondary] = useState('#B3B797');
    const toast = useRef(null);

    const importAll = (r) => {
        return r.keys().map(r);
    }

    const imgs = importAll(require.context("../../../assets", false, /\.(png|jpe?g|svg)$/));

    

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const onClick = (tpl) => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: `${tpl} Selected` });
    }
    const getColorPrimary = (color) => {
        setColorPrimary(color)
    };

    const getColorSecondary = (color) => {
        setColorSecondary(color)
    };

    var teams = [{
        title: "FC Barcelona",
        description: "Spain"
      }, {
        title: "Real Madrid",
        description: "Spain"
      }, {
        title: "Bayern Munich",
        description: "Germany"
      }, {
        title: "Juventus",
        description: "Italy"
      }];
      
      var genres = [{
        title: "Google",
        description: "Mountain View, CA"
      }, {
        title: "Apple",
        description: "Cupertino, CA"
      }, {
        title: "Microsoft",
        description: "Redmond, WA"
      }, {
        title: "Facebook",
        description: "Menlo Park, CA"
      }];

    return (
        <div>
              {
                    imgs.map(
                        
                      (image, index) => <img key={index} src={image.default} alt="info" width={100} height={100}></img>
                    )
              }
        </div>
        
    )
};

export default ManageBranding;