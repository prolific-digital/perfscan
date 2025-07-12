import { Toast } from "primereact/toast";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { validateAddEvents } from "../../../../helpers/commonHelper";
import {
  getEventsTypeList,
  getEventsSubTypeList,
  createAEvent,
} from "../../../../services/apiService";
import {getAllSystems} from "../../../../services/apiService"

function AddChangeEvents() {
  let navigate = useNavigate();
  const [eventsTypeList, setEventsTypeList] = useState([]);
  const [systemsList, setSystemsList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState("");
  const [selectedEventTypeID, setSelectedEventTypeID] = useState("");
  const [eventsSubTypeList, setEventsSubTypeList] = useState([]);
  const [selectedeventsSubTypeID, setSelectedeventsSubTypeID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventsData, setEventsData] = useState({
    version: "",
    start_date: null,
    change_notes: "",
  });
  const toast = React.useRef(null);
  const { eventID, ...rest } = useParams();

  useEffect(() => {
    fetchEventsTypeList();
    fetchAllSystems();
  }, []);

  useEffect(() => {
    if (selectedEventTypeID) {
      fetchEventsSubTypeList(selectedEventTypeID);
    }
  }, [selectedEventTypeID]);

  const fetchAllSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const data = response.data || [];
        if (data.length) {
          setSystemsList(data);
        }
      }
    } catch (error) {}
  };

  const fetchEventsTypeList = async () => {
    try {
      const response = await getEventsTypeList();
      if (response.status === 200) {
        setEventsTypeList(response.data);
      }
    } catch (error) {}
  };
  const fetchEventsSubTypeList = async (id) => {
    setEventsSubTypeList([]);
    try {
      const response = await getEventsSubTypeList(id);
      if (response.status === 200) {
        setEventsSubTypeList(response.data);
      }
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setEventsData({ ...eventsData, [name]: checked });
    } else {
      setEventsData({ ...eventsData, [name]: value });
    }
  };

  const createEvents = async (method) => {
    setIsLoading(true);
    try {
      const { start_date, ...rest } = eventsData;
      const finalData = {
        sysid : +selectedSystem, 
        change_type: selectedEventTypeID,
        change_subtype: selectedeventsSubTypeID,
        start_date: start_date ? start_date : "",
        ...rest,
      };
      const errors = validateAddEvents(finalData);
      if (errors.length) {
        let errList = errors.map((err) => ({
          severity: "error",
          summary: `${err}`,
          life: 3000,
        }));
        toast.current.show(errList);
        return;
      }
      const response = await createAEvent(finalData);
        if (response.status === 201) {
        showToast("success", "Event Created", "Event Created successfully!!");
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  return (
    <div className="add-events">
      <button
        className="btn btn-icon-primary btn-icon"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left"></i>
      </button>
      <div className="sidebar-title">Add Change Events</div>
      <div className="form-options">
      <div className="form_group">
          <label className="label">Select System</label>
          <select
            className="form-control"
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
          >
            <option disabled value="">
              --Select System--
            </option>
            {systemsList.map((item) => (
              <option value={item.id} key={item.id}>
                {item.entity_name} - {item.entity_description} -{" "}
                {item.entity_data.frame.serial_number}
              </option>
            ))}
          </select>
        </div>
        <div className="form_group">
          <label className="label">Select Change Type</label>
          <select
            className="form-control"
            value={selectedEventTypeID}
            onChange={(e) => setSelectedEventTypeID(e.target.value)}
          >
            <option disabled value="">
              --Select Change type--
            </option>
            {eventsTypeList.map((item) => (
              <option value={item.id} key={item.id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>
        {eventsSubTypeList.length > 0 && (
          <div className="form_group">
            <label className="label">Select Subtype</label>
            <select
              className="form-control"
              value={selectedeventsSubTypeID}
              onChange={(e) => setSelectedeventsSubTypeID(e.target.value)}
            >
              <option disabled value="">
                --Select type--
              </option>
              {eventsSubTypeList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form_group">
          <label className="label">Notes</label>
          <input
            type="text"
            className="form-control"
            name="change_notes"
            placeholder="Enter note"
            value={eventsData.change_notes}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form_group">
          <label className="label">Version/ Release (if Applicable)</label>
          <input
            type="text"
            name="version"
            className="form-control"
            placeholder="Enter Version/Release"
            value={eventsData.version}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form_group">
          <label className="label">Start Date</label>
          <input
            type="datetime-local"
            step="1"
            className="form-control"
            name="start_date"
            format="yyyy-MM-ddThh:mm:ss"
            placeholder="Select Start Date"
            value={eventsData.start_date}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        style={{ margin: "auto" }}
        onClick={() => createEvents("POST")}
      >
        {isLoading && <i className="pi pi-spin pi-spinner"></i>} Save and Close
      </button>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
}

export default AddChangeEvents;
