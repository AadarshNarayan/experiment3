import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PATTERNS = {
  name: /^[A-Za-z ]{3,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobile: /^[6-9]\d{9}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    dept: "",
    password: "",
    tracks: [],
    queries: "",
  });

  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tracks: checked
          ? [...prev.tracks, value]
          : prev.tracks.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const newSuccesses = {};

    // Name
    if (!PATTERNS.name.test(formData.fullname.trim())) {
      newErrors.fullname = "Enter a valid name (3-50 alphabetic characters).";
    } else {
      newSuccesses.fullname = "✓ Valid";
    }

    // Email
    if (!PATTERNS.email.test(formData.email.trim())) {
      newErrors.email = "Enter a valid institutional email address.";
    } else {
      newSuccesses.email = "✓ Valid";
    }

    // Mobile
    if (!PATTERNS.mobile.test(formData.mobile.trim())) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number starting with 6-9.";
    } else {
      newSuccesses.mobile = "✓ Valid";
    }

    // DOB
    if (!formData.dob) {
      newErrors.dob = "Please select your date of birth.";
    } else {
      const [y, m, d] = formData.dob.split("-").map(Number);
      const birthDate = new Date(y, m - 1, d);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      )
        age--;
      if (age < 15) {
        newErrors.dob = "You must be at least 15 years old.";
      } else {
        newSuccesses.dob = "✓ Valid";
      }
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    } else {
      newSuccesses.gender = "✓ Valid";
    }

    // Department
    if (!formData.dept) {
      newErrors.dept = "Please select a department.";
    } else {
      newSuccesses.dept = "✓ Valid";
    }

    // Password
    if (!PATTERNS.password.test(formData.password)) {
      newErrors.password = "Min 8 chars, at least 1 letter and 1 number.";
    } else {
      newSuccesses.password = "✓ Valid";
    }

    // Tracks
    if (formData.tracks.length === 0) {
      newErrors.tracks = "Select at least one track.";
    } else {
      newSuccesses.tracks = "✓ Valid";
    }

    setErrors(newErrors);
    setSuccesses(newSuccesses);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/registration-success", { state: { name: formData.fullname } });
    }
  };

  const fieldClass = (field) => {
    if (errors[field]) return "invalid";
    if (successes[field]) return "valid";
    return "";
  };

  return (
    <section>
      <h3>Participant Registration</h3>
      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            value={formData.fullname}
            onChange={handleChange}
            className={fieldClass("fullname")}
          />
          {errors.fullname && <small className="error">{errors.fullname}</small>}
          {successes.fullname && (
            <small className="success">{successes.fullname}</small>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">College Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your institutional email"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass("email")}
          />
          {errors.email && <small className="error">{errors.email}</small>}
          {successes.email && (
            <small className="success">{successes.email}</small>
          )}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
            className={fieldClass("mobile")}
          />
          {errors.mobile && <small className="error">{errors.mobile}</small>}
          {successes.mobile && (
            <small className="success">{successes.mobile}</small>
          )}
        </div>

        {/* DOB */}
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={fieldClass("dob")}
          />
          {errors.dob && <small className="error">{errors.dob}</small>}
          {successes.dob && <small className="success">{successes.dob}</small>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <small className="error">{errors.gender}</small>}
          {successes.gender && (
            <small className="success">{successes.gender}</small>
          )}
        </div>

        {/* Department */}
        <div className="form-group">
          <label htmlFor="dept">Department</label>
          <select
            id="dept"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className={fieldClass("dept")}
          >
            <option value="">-- Choose Department --</option>
            <option value="CSE">Computer Science &amp; Engineering</option>
            <option value="ECE">Electronics &amp; Communication</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EE">Electrical Engineering</option>
          </select>
          {errors.dept && <small className="error">{errors.dept}</small>}
          {successes.dept && (
            <small className="success">{successes.dept}</small>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Min 8 chars (1 letter, 1 number)"
            value={formData.password}
            onChange={handleChange}
            className={fieldClass("password")}
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
          {successes.password && (
            <small className="success">{successes.password}</small>
          )}
        </div>

        {/* Tracks */}
        <div className="form-group">
          <label>Tracks to Compete In</label>
          <div className="checkbox-group">
            {["Hackathon", "RoboWars", "Speed Debugging"].map((track) => (
              <label key={track}>
                <input
                  type="checkbox"
                  name="tracks"
                  value={track}
                  checked={formData.tracks.includes(track)}
                  onChange={handleChange}
                />{" "}
                {track}
              </label>
            ))}
          </div>
          {errors.tracks && <small className="error">{errors.tracks}</small>}
          {successes.tracks && (
            <small className="success">{successes.tracks}</small>
          )}
        </div>

        {/* Queries */}
        <div className="form-group">
          <label htmlFor="queries">Requests / Notes</label>
          <textarea
            id="queries"
            name="queries"
            rows="3"
            placeholder="Hardware requirements..."
            value={formData.queries}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary">
          Submit Registration
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;
