import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
import "./CustomDropdown.css"; // Create this file for custom styles

const CustomDropdown = ({
  startDate,
  endDate,
  handleDateChange,
  statusFilter,
  handleStatusChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);
  return (
    <div className="custom-dropdown">
      <button onClick={toggleOpen} className="custom-dropdown-button">
        Filter Options
      </button>
      {open && (
        <div className="custom-dropdown-content">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText="Select Date Range"
            className="date-picker"
          />
          <Dropdown onSelect={handleStatusChange}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="status-dropdown"
            >
              {statusFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu className="all-drop" onClick={close}>
              <Dropdown.Item className="item-status" eventKey="All">
                All
              </Dropdown.Item>
              <Dropdown.Item className="item-status" eventKey="active">
                active
              </Dropdown.Item>
              <Dropdown.Item className="item-status" eventKey="ended">
                ended
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;