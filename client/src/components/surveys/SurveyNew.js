import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
  // shortcut, no need for constructor code with CRA
  state = { showFormReview: false }

  showFormReview() {
    this.setState({ showFormReview: !this.state.showFormReview })
  }

  renderContent() {
    return this.state.showFormReview
      ? <SurveyFormReview onCancel={this.showFormReview.bind(this)} />
      : <SurveyForm onSurveySubmit={this.showFormReview.bind(this)} />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: true,
})(SurveyNew)
