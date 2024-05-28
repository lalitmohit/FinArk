import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Contests.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const Contests = () => {
    const [contests,setContests] = useState([]);
    const navigate = useNavigate();
    const [contestName,setContestName] = useState("");
    const [contestId,setContestId] = useState("");
    // const [errorMessage,setErrorMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrorMessage("");
    
        try {
          const response = await axios.post('http://localhost:8000/contests', {
            contestName: contestName,
            contestId: contestId,
            contestStatus: isChecked ? 'active' : 'ended',
            createdDate: selectedDate,
          });
          console.log(response);
          if (response.status === 200) {
            navigate('/products'); // Adjust this route as needed
          }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message || 'Internal Server Error');
            } else {
                console.error('Error:', error);
                console.log('An error occurred. Please try again.');
            }
        }
      };

    // const handleSubmit = ()=>{
    //     navigate('/products')
    // }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
      };

    const handleChange = (date) => {
    setSelectedDate(date);
    };

    return (
        <div className="Container-Contests">
            <h1>Contests</h1>
            <div>
                <div className="ContestName">ContestName</div>
                <input
                 type="text"
                 placeholder="contestName"
                 value={contestName}
                onChange={(e)=>setContestName(e.target.value)}
                required />
            </div>
            <div >
                <div className="ContestId">ContestId</div>
                <input type="text" placeholder="contestId"
                value={contestId}
                onChange={(e)=>setContestId(e.target.value)}
                required />
            </div>

            <div className="ContestStatus">
                <div>ContestStatus</div>
                    <label>
                    Check for active contest
                        <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        />
                        
                    </label>
            </div>
            <div className="CreatedDate">createdDate</div>
            <div>
                <DatePicker
                selected={selectedDate}
                // onChange={handleChange}
                dateFormat="dd/MM/yyyy" // Customize date format as needed
                isClearable // Enable clearing the selected date
                showYearDropdown // Show dropdown to select year
                scrollableYearDropdown 
                onChange={(date) =>
                handleChange(date)
                  }// Allow scrolling in year dropdown
                />
            </div>
            <button className="Submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Contests;
