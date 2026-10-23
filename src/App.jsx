
import { useState } from 'react'
import './App.css'

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  qualification: '',
  institute: '',
  educationStatus: '',
  course: '',
  learningMode: '',
  reason: '',
}

const steps = ['Personal', 'Education', 'Course', 'Review']

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))
  }

  function validateStep() {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required.'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.'
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = 'Please enter a valid email address.'
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.'
      } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.'
      }
    }

    if (currentStep === 2) {
      if (!formData.qualification) {
        newErrors.qualification = 'Please select your qualification.'
      }

      if (!formData.institute.trim()) {
        newErrors.institute = 'Institute name is required.'
      }

      if (!formData.educationStatus) {
        newErrors.educationStatus = 'Please select your education status.'
      }
    }

    if (currentStep === 3) {
      if (!formData.course) {
        newErrors.course = 'Please select a course.'
      }

      if (!formData.learningMode) {
        newErrors.learningMode = 'Please select a learning mode.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validateStep()) {
      setCurrentStep((step) => step + 1)
      setErrors({})
    }
  }

  function handleBack() {
    setCurrentStep((step) => step - 1)
    setErrors({})
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  function renderFieldError(fieldName) {
    return errors[fieldName] ? (
      <span className="field-error">{errors[fieldName]}</span>
    ) : null
  }

  function renderReviewRow(label, value) {
    return (
      <div className="review-row" key={label}>
        <span>{label}</span>
        <strong>{value || 'Not provided'}</strong>
      </div>
    )
  }

  if (submitted) {
    return (
      <main className="app">
        <div className="registration-container">
          <div className="form-card success-card">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1>Registration Submitted!</h1>
            <p>
              Thank you, {formData.fullName}. Your registration form
              has been completed successfully.
            </p>
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setFormData(initialFormData)
                setCurrentStep(1)
                setErrors({})
                setSubmitted(false)
              }}
            >
              Start New Registration
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="app">
      <div className="registration-container">
        <header className="form-header">
          <h1>Student Course Registration</h1>
          <p>
            Complete the steps below to register for your desired course.
          </p>
        </header>

        <section className="progress-section" aria-label="Form progress">
          <p>Step {currentStep} of 4</p>

          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax="4"
            aria-valuenow={currentStep}
          >
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <div className="step-labels">
            {steps.map((step, index) => (
              <span
                key={step}
                className={currentStep === index + 1 ? 'active-step' : ''}
              >
                {step}
              </span>
            ))}
          </div>
        </section>

        <form
          className="form-card"
          onSubmit={(event) => {
            event.preventDefault()

            if (currentStep < 4) {
              handleNext()
            } else {
              handleSubmit(event)
            }
          }}
          noValidate
        >
          {currentStep === 1 && (
            <>
              <div className="section-heading">
                <h2>Personal Information</h2>
                <p>Let's start with your basic details.</p>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {renderFieldError('fullName')}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {renderFieldError('email')}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {renderFieldError('phone')}
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="section-heading">
                <h2>Education Details</h2>
                <p>Tell us about your educational background.</p>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="qualification">Highest Qualification</label>
                  <select
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.qualification)}
                  >
                    <option value="">Select your qualification</option>
                    {[
                      'Matriculation',
                      'Intermediate',
                      'Diploma',
                      "Bachelor's",
                      "Master's",
                      'Other',
                    ].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {renderFieldError('qualification')}
                </div>

                <div className="form-group">
                  <label htmlFor="institute">Institute Name</label>
                  <input
                    id="institute"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    placeholder="Enter your school, college or university"
                    aria-invalid={Boolean(errors.institute)}
                  />
                  {renderFieldError('institute')}
                </div>

                <fieldset className="form-group radio-group">
                  <legend>Education Status</legend>
                  {['Currently Studying', 'Graduated'].map((item) => (
                    <label className="radio-option" key={item}>
                      <input
                        type="radio"
                        name="educationStatus"
                        value={item}
                        checked={formData.educationStatus === item}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                  {renderFieldError('educationStatus')}
                </fieldset>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="section-heading">
                <h2>Course Selection</h2>
                <p>Choose the course that interests you most.</p>
              </div>

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="course">Select Course</label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.course)}
                  >
                    <option value="">Choose a course</option>
                    {[
                      'Web Development',
                      'Python Programming',
                      'Graphic Design',
                      'UI/UX Design',
                      'Digital Marketing',
                      'Data Science',
                    ].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {renderFieldError('course')}
                </div>

                <fieldset className="form-group radio-group">
                  <legend>Learning Mode</legend>
                  {['Online', 'On-site'].map((item) => (
                    <label className="radio-option" key={item}>
                      <input
                        type="radio"
                        name="learningMode"
                        value={item}
                        checked={formData.learningMode === item}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                  {renderFieldError('learningMode')}
                </fieldset>

                <div className="form-group">
                  <label htmlFor="reason">
                    Why do you want to join? <span>(Optional)</span>
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us a little about your goals..."
                    rows="4"
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="section-heading">
                <h2>Review Your Information</h2>
                <p>Please check your details before submitting.</p>
              </div>

              <section className="review-section">
                <h3>Personal Information</h3>
                {renderReviewRow('Full Name', formData.fullName)}
                {renderReviewRow('Email Address', formData.email)}
                {renderReviewRow('Phone Number', formData.phone)}
              </section>

              <section className="review-section">
                <h3>Education Details</h3>
                {renderReviewRow('Qualification', formData.qualification)}
                {renderReviewRow('Institute', formData.institute)}
                {renderReviewRow('Education Status', formData.educationStatus)}
              </section>

              <section className="review-section">
                <h3>Course Details</h3>
                {renderReviewRow('Course', formData.course)}
                {renderReviewRow('Learning Mode', formData.learningMode)}
                {renderReviewRow('Reason', formData.reason || 'Not provided')}
              </section>

              <p className="review-note">
                Need to change anything? Go back to the relevant step before submitting.
              </p>
            </>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button
                className="secondary-button"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button className="primary-button" type="submit">
                Next Step
              </button>
            ) : (
              <button className="primary-button" type="submit">
                Submit Registration
              </button>
            )}
          </div>
        </form>

        <p className="footer-note">
          Please make sure your information is correct before submitting.
        </p>
      </div>
    </main>
  )
}

export default App
