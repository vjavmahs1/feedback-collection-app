import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux'; 
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';



const SurveyFormReview = (props) => {    
    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {props.formValues[field.name]}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please confirm your entreis</h5>
            {reviewFields}
            <button 
            onClick={props.onCancelClicked}
            className ="yellow darken-3 white-text btn-flat"
            >
                Back
            </button>

            <button 
                onClick={() => props.submitSurvey(props.formValues, props.history)}
                className="green btn-flat white-text right">
                <i className="material-icons right">email</i> 
                Send Survey
            </button>
        </div>
    )
}
function mapStateToProps(state) {
    console.log(state);
    
    return {formValues: state.form.surveyForm.values };
}


export default connect(mapStateToProps, actions) (withRouter (SurveyFormReview));