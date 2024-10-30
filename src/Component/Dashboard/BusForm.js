import React, { useState } from "react";
import { saveOrUpdateBus,fetchBusMasterData} from '../../Services/api'; // Import the function
import './Dashboard.css'


function BusForm() {
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [ EditModal,setEditModal] = useState(false); 

  const [showSearchModal, setShowSearchModal] = useState(false); // State to control the search modal visibility

  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const [busId ,setBusId] = useState(null); 
  

  const [busDetails, setBusDetails] = useState({
    registration_no: "MH31EX5544",
    registration_year: "2004",
    engine_no: "",
    chesis_no: "",
    battery_no: "",
    manufacturer: "",
    model: "",
    In_use: "False",
    last_use_date: "",
    puc_no: "",
    insert_by: "607",
  });

   const [errors,setErrors] = useState({});
   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate registration_no
    if (!busDetails.registration_no.trim()) {
      formErrors.registration_no = "Registration number is required.";
      isValid = false;
    }

    // Validate registration_year
    if (!busDetails.registration_year.trim()) {
      formErrors.registration_year = "Registration year is required.";
      isValid = false;
    } else if (!/^\d{4}$/.test(busDetails.registration_year)) {
      formErrors.registration_year = "Registration year must be a 4-digit number.";
      isValid = false;
    }

    setErrors(formErrors); // Update the errors state
    return isValid; // Return the validation result
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }


    // Prepare the data to be sent
    const payload = {
      bus_registration_id: isEditMode ? busId : "",
      school_id:770,
      registration_no: busDetails.registration_no,
      registration_year: busDetails.registration_year,
      engine_no: busDetails.engine_no,
      chesis_no: busDetails.chesis_no,
      battery_no: busDetails.battery_no,
      manufacturer: busDetails.manufacturer,
      model: busDetails.model,
      last_use_date: busDetails.last_use_date,
      puc_no: busDetails.puc_no,
      insert_by: 607,
      In_use: "False",
    };

    console.log(payload)

    try {
      const savedData = await saveOrUpdateBus(payload); // Call the save function
      console.log('Bus details saved:', savedData);

      if(isEditMode){
        setEditModal(true); // Show the modal on successful save
      }
      else{
        setShowModal(true); // Show the modal on successful save
      }
      
      
      // Optionally, reset the form or redirect
      setBusDetails({
        registration_no: "",
        registration_year: "",
        engine_no: "",
        chesis_no: "",
        battery_no: "",
        manufacturer: "",
        model: "",
        In_use: "false",
        last_use_date: "",
        puc_no: "",
      });
      setIsEditMode(false); // Reset to save mode
    }
     catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'saving'}bus details:`, error);
    alert(`Failed to ${isEditMode ? 'update' : 'save'} bus details. Please try again.`);
    }
  };
  const handleSearchClick = async () => {
    setShowSearchModal(true);
    setLoading(true);
    setError(null);
    try {
      const response = await fetchBusMasterData({
        "school_id": 770
      });
      console.log(response.bus_data)
      setBusData(response.bus_data);
    } catch (err) {
      setError('Error fetching bus data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowSelect = (bus) => {
    console.log(bus,"bus")
    setBusDetails({
      registration_no: bus.registration_no || "",
      registration_year: bus.registration_year || "",
      engine_no: bus.engine_no || "",
      chesis_no: bus.chesis_no || "",
      battery_no: bus.battery_no || "",
      manufacturer: bus.manufacturer || "",
      model: bus.model || "",
      In_use: bus.In_use || "False",
      last_use_date: bus.last_use_date || "",
      puc_no: bus.puc_no || "",
    });
    setShowSearchModal(false);
    setIsEditMode(true);
    setBusId(bus.id); 
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
  };



 

  return (
    <div className="bus-form">
      <div className="headingRow d-flex justify-content-between mb-4">
        <h2>Bus Master</h2>
        <div className="form-actions">
          <button type="button" >New</button>
          <button type="submit" onClick={handleSubmit}>{isEditMode ? "Update" : "Save"}</button>
          <button type="button">Delete</button>
          <button type="button" onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}> 
        <div className="form-row">
          <label>Registration No <span className="mandate">*</span></label>
          <input
            type="text"
            name="registration_no"
            value={busDetails.registration_no}
            onChange={handleChange}
            placeholder="Registration no"
          />
          {errors.registration_no && <p className="error">{errors.registration_no}</p>}
          
          <label>Year <span className="mandate">*</span></label>
          <input
            type="text"
            name="registration_year"
            value={busDetails.registration_year}
            onChange={handleChange}
            placeholder="Year"
          />
          {errors.registration_year && <p className="error">{errors.registration_year}</p>}
        </div>

        <div className="form-row engineDiv">
          <label>Engine No</label>
          <input
            type="text"
            name="engine_no"
            value={busDetails.engine_no}
            onChange={handleChange}
            placeholder="Engine no"
          />
          {errors.engine_no && <p className="error">{errors.engine_no}</p>}
          </div>

          <div className="form-row chasisDiv">
          <label>Chesis No</label>
          <input
            type="text"
            name="chesis_no"
            value={busDetails.chesis_no}
            onChange={handleChange}
            placeholder="Chesis no"
          />
          {errors.chesis_no && <p className="error">{errors.chesis_no}</p>}
        </div>

        <div className="form-row batteryDiv">
          <label>Battery No</label>
          <input
            type="text"
            name="battery_no"
            value={busDetails.battery_no}
            onChange={handleChange}
            placeholder="Battery no"
          />
          {errors.battery_no && <p className="error">{errors.battery_no}</p>}
          </div>

          <div className="form-row ManufacturerDiv">
          <label>Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={busDetails.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />
          {errors.manufacturer && <p className="error">{errors.manufacturer}</p>}
        </div>

        <div className="form-row modelDiv">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={busDetails.model}
            onChange={handleChange}
            placeholder="Model"
          />
          {errors.model && <p className="error">{errors.model}</p>}
        </div>

        <div className="form-row inUseDiv">
          <label>In Use</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="In_use"
                value="yes"
                checked={busDetails.In_use === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            &nbsp;
            <label>
              <input
                type="radio"
                name="In_use"
                value="no"
                checked={busDetails.In_use === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-row dateDiv">
          <label>Last Use Date</label>
          <input
            type="date"
            name="last_use_date"
            value={busDetails.last_use_date}
            onChange={handleChange}
          />
 </div>
 
 <div className="form-row dateDiv">
          <label>PUC No</label>
          <input
            type="text"
            name="puc_no"
            value={busDetails.puc_no}
            onChange={handleChange}
            placeholder="PUC no"
          />
          {errors.puc_no && <p className="error">{errors.puc_no}</p>}
        </div>
      </form>
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">

              <div className="modal-body ">
                
                <p className="mt-4">Bus registered successfully!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

{EditModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">

              <div className="modal-body ">
                
                <p className="mt-4">Bus Updated Successfully!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseEditModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

{showSearchModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search Bus Details</h5>
                <button type="button" className="close" onClick={() => setShowSearchModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {loading && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Registration No</th>
                          <th>Year</th>
                          <th>Engine No.</th>
                          <th>Chesis No</th>
                          <th>Battery No</th>
                          <th>Manufacturer</th>
                          <th>Model</th>
                          <th>PUC No</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {busData.filter(bus =>
                          bus.registration_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.model.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((bus, index) => (
                          <tr key={index}>
                            <td>{bus.registration_no}</td>
                            <td>{bus.registration_year}</td>
                            <td>{bus.engine_no}</td>
                            <td>{bus.chesis_no}</td>
                            <td>{bus.battery_no}</td>
                            <td>{bus.manufacturer}</td>
                            <td>{bus.model}</td>
                            <td>{bus.puc_no}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleRowSelect(bus)}
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSearchModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default BusForm;
