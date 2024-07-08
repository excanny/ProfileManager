import React, { useState } from 'react';
import '../index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PDFViewer from 'pdf-viewer-reactjs';

const ProfileManager = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [experiences, setExperiences] = useState([
    { company: '', position: '', startDuration: '', endDuration: '' }
  ]);
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', position: '', duration: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleRemoveResume = () => {
    setResume(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!personalInfo.fullName) newErrors.fullName = 'Full name is required';
    if (!personalInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!personalInfo.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { personalInfo, experiences, skills, resume });
     
    }
  };

  return (
    <div className="w-100 container-fluid bg-light py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="bg-white shadow-sm rounded p-4">
          <h1 className="text-center font-weight-bold ">Profile Manager</h1>
            <div className="row mt-5">
              <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title h4 font-weight-semibold">Personal Information</h2>
                    <div className="form-group">
                    <label>Full Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                        placeholder="Enter full name"
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        placeholder="Enter email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                    <label>Phone</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        placeholder="Enter phone"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </div>
                </div>
                {/* Professional Experiences */}
                <div className="card mt-4">
                  <div className="card-body">
                    <h2 className="card-title h4 font-weight-semibold">Professional Experiences</h2>
                    <div>
                      {experiences.map((exp, index) => (
                        <div key={index} className="mb-3">
                          <div className="row p-2">
                            <div className="col-md-10 mb-2">
                              <label>Company</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                placeholder="Enter company name"
                              />
                              
                              <label>Position</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={exp.position}
                                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                placeholder="Enter position"
                              />
                              <div className="row">
                                <div className="col-md-6">
                                  <label>Start Date</label>
                                  <input
                                    type="month"
                                    className="form-control"
                                    value={exp.startDuration}
                                    onChange={(e) => handleExperienceChange(index, 'startDuration', e.target.value)}
                                    placeholder="Start Date"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>End Date</label>
                                  <input
                                    type="month"
                                    className="form-control"
                                    value={exp.endDuration}
                                    onChange={(e) => handleExperienceChange(index, 'endDuration', e.target.value)}
                                    placeholder="End Date"
                                  />
                                </div>
                              </div>
                            </div>
                            {index > 0 && (
                              <div className="col-md-2 mb-2 d-flex align-items-center">
                                <ion-icon
                                  size="large"
                                  name="trash-outline"
                                  className="delete-icon cursor"
                                  onClick={() => handleRemoveExperience(index)}
                                  style={{color: 'red'}}
                                ></ion-icon>
                              </div>
                            )}
                          </div>
                          <hr style={{height: 2}}></hr>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn btn-secondary mt-3" onClick={handleAddExperience}>
                      <ion-icon name="add-outline"></ion-icon> Add Experience
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div className="card mt-4">
                  <div className="card-body">
                    <h2 className="card-title h4 font-weight-semibold">Skills</h2>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {skills.map((skill, index) => (
                        <div key={index} className="form-group d-flex">
                          <input
                            type="text"
                            className="form-control mr-2"
                            value={skill}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            placeholder="Skill"
                          />
                          <ion-icon size="large" name="trash-outline" className="delete-icon cursor" onClick={() => handleRemoveSkill(index)} style={{color: 'red'}}></ion-icon>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn btn-secondary mt-3" onClick={handleAddSkill}>Add Skill</button>
                  </div>
                </div>
                {/* Resume Upload */}
                <div className="card mt-4">
                  <div className="card-body">
                    <h2 className="card-title h4 font-weight-semibold">Resume Upload <small>(only PDF)</small></h2>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFile" onChange={handleResumeUpload} accept=".pdf" />
                      <label className="custom-file-label" htmlFor="customFile">
                        {resume ? resume.name : 'Choose file'}
                      </label>
                    </div>
                    {resume && (
                      <div className="mt-2 d-flex justify-content-between align-items-center">
                        <p className="mb-0">Uploaded: {resume.name}</p>
                       
                        <ion-icon size="large" name="trash-outline" className="delete-icon cursor" onClick={handleRemoveResume} style={{color: 'red'}}></ion-icon>
                      </div>
                    )}
                  </div>
                </div>
                </form>
              </div>
              <div className="col-lg-6">
                 {/* Profile Preview */}
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title h4 font-weight-semibold">Profile Preview</h2>
                      <div className="row">
                        <div className="col-md-5 mb-3">
                          <h3 className="h5 font-weight-medium">Personal Information</h3>
                          <p>Name: {personalInfo.fullName}</p>
                          <p>Email: {personalInfo.email}</p>
                          <p>Phone: {personalInfo.phone}</p>
                        </div>
                        <div className="col-md-7 mb-3">
                          <h3 className="h5 font-weight-medium">Experiences</h3>
                          {experiences.map((exp, index) => (
                            <div key={index}>
                              <p>{exp.position}  {exp.company} {formatDate(exp.startDuration)} - {formatDate(exp.endDuration)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="col-md-6 mb-3">
                          <h3 className="h5 font-weight-medium">Skills</h3>
                          <ul className="list-unstyled">
                            {skills.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-6 mb-3">
                          <h3 className="h5 font-weight-medium">Resume</h3>
                          {resume ?  <p>{resume.name}</p> : <p>No resume uploaded</p>}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            

             
            </div>

            {/* <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg">Save Profile</button>
            </div> */}
          

        </div>
    </div>
  );
};

export default ProfileManager;