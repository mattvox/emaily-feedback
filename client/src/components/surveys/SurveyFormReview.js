import { map as _map } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import formFields from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({
  onCancel,
  formValues,
  submitSurvey,
  history
}) => {
  const reviewFields = _map(formFields, ({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>
        {formValues[name]}
      </div>
    </div>
  ))

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className='yellow white-text darken-3 btn-flat'
        onClick={onCancel}
      >
        <i className='material-icons left'>arrow_back</i>
        Back
      </button>
      <button
        className='green white-text btn-flat right'
        onClick={() => submitSurvey(formValues, history)}
      >
        <i className='material-icons right'>done</i>
        Send Survey
      </button>
    </div>
  )
}

const mapStateToProps = ({ form: { surveyForm: { values } } }) => ({
  formValues: { ...values }
})

export default connect(
  mapStateToProps, actions)(withRouter(SurveyFormReview)
)
