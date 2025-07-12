export const ReportsService = {
    
    getReportsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                report_name: 'Auction Edge',
                report_description: 'Auction Edge Historical Report',
                logo_primary_name : 'RotoRouter',
                logo_primary: 'http://localhost:8080/api/files/1/logo/roto.jpg',
                logo_secondary_name: 'Perfscan',
                logo_secondory: 'http://localhost:8080/api/files/1/logo/perfscan_logo_nobg.png',
                color_primary: '#2a1768',
                color_secondary: '#da211c',
                report_type: 'Historical Data',
                sel_template: 'Template3',
                metrix:{"cpw": true, "cpu_ms": true, "no_of_cores": true, "faulting_rate": false, "cache_hit_perc": false, "total_disk_ops": false, "cpu_utilization": true, "read_write_ratio": false, "executing_summary": false, "disk_response_time": false, "pool_faulting_rate": false, "response_time_5250": false, "total_transactions": false, "disk_arm_utilization": false, "memory_size_faulting": false, "top_jobs_utilisation": false, "machine_pool_faulting": false, "system_specifications": false, "disk_space_utilization": false, "top_pool_faulting_rate": false, "ethernet_line_utilization": false},
                delivery:'Monday, Tuesday, Wednesday at 9am'
            },
            {
                id: '1001',
                code: 'f230fh0g4',
                report_name: 'Auction Edge 2',
                report_description: 'Roto Router Historical Report',
                logo_primary_name : 'RotoRouter',
                logo_primary: 'http://localhost:8080/api/files/1/logo/roto.jpg',
                logo_secondary_name: 'Perfscan',
                logo_secondory: 'http://localhost:8080/api/files/1/logo/perfscan_logo_nobg.png',
                color_primary: '#2a1768',
                color_secondary: '#da211c',
                report_type: 'Historical Data',
                sel_template: 'Template1',
                metrix:{"cpw": true, "cpu_ms": true, "no_of_cores": true, "faulting_rate": false, "cache_hit_perc": false, "total_disk_ops": false, "cpu_utilization": true, "read_write_ratio": false, "executing_summary": false, "disk_response_time": false, "pool_faulting_rate": false, "response_time_5250": false, "total_transactions": false, "disk_arm_utilization": false, "memory_size_faulting": false, "top_jobs_utilisation": false, "machine_pool_faulting": false, "system_specifications": false, "disk_space_utilization": false, "top_pool_faulting_rate": false, "ethernet_line_utilization": false},
                delivery:'Monday, Wednesday at 7:30pm'
            }]
    },

    getProducts() {
        return Promise.resolve(this.getReportsData());
    },
}

