import React, {useState} from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { Outlet } from "react-router-dom";

export default function RouterDemo() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        { label: 'Reports', icon: 'pi pi-list', url: '/settings/report-automation' },
        {
            label: 'Create Report',
            icon: 'pi pi-plus',
            url : '/settings/report-automation/create'
        }
    ];

    return (
        <div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <Outlet />
        </div>
    )
}
         