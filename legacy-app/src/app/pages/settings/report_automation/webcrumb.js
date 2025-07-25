import React from "react";

// Don't forget to
// // download the CSS file too OR 
// // remove the following line if you're already using Tailwind 
//generated by webcrumbsjs
import "./style.css";

export const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
    	<div className="w-[800px] bg-neutral-50 rounded-lg shadow-lg p-6">
    	  <h1 className="font-title text-2xl mb-4">Report Scheduler</h1>
    	  
    	  {/* Report Selection */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Select Report</label>
    	    <select className="w-full p-2 rounded-md bg-neutral-200">
    	      <option value="report1">Report 1</option>
    	      <option value="report2">Report 2</option>
    	      <option value="report3">Report 3</option>
    	    </select>
    	  </div>
    	
    	  {/* Scheduling Component */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Schedule</label>
    	    <input type="datetime-local" className="w-full p-2 rounded-md bg-neutral-200" />
    	  </div>
    	  
    	  {/* Recipient List Component */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Recipient List</label>
    	    <textarea className="w-full p-2 rounded-md bg-neutral-200" rows="3" placeholder="Enter recipient emails, separated by commas"></textarea>
    	  </div>
    	
    	  {/* Predefined Layout for Report */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Select Predefined Layout for Report</label>
    	    <details className="relative">
    	      <summary className="p-2 bg-neutral-200 rounded-md cursor-pointer">Choose Layout</summary>
    	      <div className="absolute z-10 bg-neutral-50 rounded-lg shadow-lg p-4 mt-2">
    	        <input type="radio" name="layout" className="mr-2" /> Layout 1
    	        <br />
    	        <input type="radio" name="layout" className="mr-2" /> Layout 2
    	        <br />
    	        <input type="radio" name="layout" className="mr-2" /> Layout 3
    	      </div>
    	    </details>
    	  </div>
    	
    	  {/* Predefined Layout for Email */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Select Predefined Layout for Email</label>
    	    <details className="relative">
    	      <summary className="p-2 bg-neutral-200 rounded-md cursor-pointer">Choose Layout</summary>
    	      <div className="absolute z-10 bg-neutral-50 rounded-lg shadow-lg p-4 mt-2">
    	        <input type="radio" name="emailLayout" className="mr-2" /> Email Layout 1
    	        <br />
    	        <input type="radio" name="emailLayout" className="mr-2" /> Email Layout 2
    	        <br />
    	        <input type="radio" name="emailLayout" className="mr-2" /> Email Layout 3
    	      </div>
    	    </details>
    	  </div>
    	  
    	  {/* Report Features Toggle */}
    	  <div className="mb-6">
    	    <label className="block text-lg mb-2">Select Report Features</label>
    	    <div className="flex flex-wrap gap-4">
    	      <label className="flex items-center">
    	        <input type="checkbox" className="mr-2" /> Feature A
    	      </label>
    	      <label className="flex items-center">
    	        <input type="checkbox" className="mr-2" /> Feature B
    	      </label>
    	      <label className="flex items-center">
    	        <input type="checkbox" className="mr-2" /> Feature C
    	      </label>
    	      <label className="flex items-center">
    	        <input type="checkbox" className="mr-2" /> Feature D
    	      </label>
    	    </div>
    	  </div>
    	
    	  {/* Submit Button */}
    	  <div className="text-right">
    	    <button className="bg-primary rounded-md w-[160px] h-[40px]">Schedule Report</button>
    	  </div>
    	</div> 
    </div>
  )
}

