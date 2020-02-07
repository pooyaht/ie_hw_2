import React, { Component } from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './form.module.css';
import Input from '../../components/UI/Input/Input';
import axios from 'axios'
class form extends Component {
    
    constructor(props){
        super(props);
      //  console.log(this.props.location.state)
        let nextState =this.props.location.state;
        nextState.fields.forEach(element => {
            if(!element.validation || !element.validation.required)
                element.valid =true;
            else
                element.valid = false;
            element.touched = false;
            element.value ='';
        });
      //  console.log(nextState)
        this.state ={sampleform:nextState,formIsValid: false,loading: false}
       // console.log(this.state)
    }
    componentDidMount(){
        if(this.state.sampleform.fields.find((element => element.title === 'Your Location'))){
            this.getcurrentLocation().then(data =>{
                console.log(data)
                const updatedSampleForm = [...this.state.sampleform.fields];
                let temp = updatedSampleForm.find(element => element.title === "Your Location");
                const updatedFormElement = {...temp};
                updatedFormElement.value = data;
                let index = updatedSampleForm.findIndex((element) => element.title === "Your Location")
               // console.log(index)
                updatedSampleForm.splice(index,1,updatedFormElement);
                //console.log(updatedSampleForm)
                this.setState({sampleform: {title :this.state.sampleform.title, id :this.state.sampleform.id, fields : updatedSampleForm}});
        }).catch(data=>{
            const updatedSampleForm = [...this.state.sampleform.fields];
            let temp = updatedSampleForm.find(element => element.title === "Your Location")
            const updatedFormElement = {...temp}
            updatedFormElement.value = data;
            let index = updatedSampleForm.findIndex((element) => element.title === "Your Location")
          //  console.log(index)
            updatedSampleForm.splice(index,1,updatedFormElement);
            //console.log(updatedSampleForm)
            this.setState({sampleform: {title :this.state.sampleform.title, id :this.state.sampleform.id, fields : updatedSampleForm}});
        });
    }
     }
    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
          return new Promise((resolve, reject) => {
              const options = {enableHighAccuracy : true,timeout: 1000,maximumAge:10000}
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              resolve([
                coords.latitude,
                coords.longitude
              ]
              );
            },() =>{console.log("reject")
                reject([35.68627757389,51.39068621881188])},options);
          });
        }
      }
    formHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        let temp = JSON.parse(JSON.stringify(this.state));
        console.log(temp)
        delete temp.formIsValid;
        delete temp.loading;
        temp.sampleform.fields.forEach((element)=>{
            delete element.valid;
            delete element.touched;
            delete element.messages;
            element.value = element.value.toString();
        })
        console.log(temp)
        axios.post( '//localhost:4000/api/submit_form',temp.sampleform )
            .then( response => {
                console.log(response)
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
        let message = []
        let isValid = true;
        if (!rules) {
            return [true,[]];
        }
        if (rules.required) {
            //console.log()
            isValid = value.trim() !== '' && isValid;
            if(!isValid)
                message.push('value of this field can\'t be empty');
        }
         if(rules.isName && value.trim()!==''){
            const pattern = /^[A-Za-z]+([ A-Za-z]+)*$/;
           // console.log("ojnu")
            isValid = pattern.test(value) && isValid
            if(!isValid)
                message.push('please insert a valid Name');
         }

        if (rules.isEmail && value.trim()!=='') {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
            if(!isValid)
                message.push('please insert a valid Email address');
        }

        if (rules.isAge && value.trim()!=='') {
            const pattern = /^\d{2}$/;
            isValid = pattern.test(value) && isValid
            if(!isValid)
                message.push('please insert a valid Age(age must be between [10,99])');
        }
       // console.log(this.state)
        return [isValid,message];
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSampleForm = [...this.state.sampleform.fields];
        let temp = updatedSampleForm.find(element => element.title === inputIdentifier)
        
        const updatedFormElement = {...temp}

        if(inputIdentifier === 'Your Location')
        {
           // console.log(event)
            updatedFormElement.value = [event.lat, event.lng];
        }
        else
            updatedFormElement.value = event.target.value;
        
        [updatedFormElement.valid,updatedFormElement.messages] = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        let index = updatedSampleForm.findIndex((element) => element.title === inputIdentifier)
        updatedSampleForm.splice(index,1,updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier of updatedSampleForm) {
            //console.log(inputIdentifier)
            formIsValid = inputIdentifier.valid && formIsValid;
        }
        this.setState({sampleform: {title :this.state.sampleform.title, id :this.state.sampleform.id, fields : updatedSampleForm}, formIsValid: formIsValid});
    }

    render () {
        //console.log(classes)
        const formElementsArray = JSON.parse(JSON.stringify(this.state.sampleform.fields));
        let form = (
            <form onSubmit={this.formHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.title}
                        elementName={formElement.name}
                        elementType={formElement.type}
                        elementTitle={formElement.title}
                        elementOptions={formElement.options}
                        value={formElement.value}
                        invalid={!formElement.valid}
                        shouldValidate={formElement.validation}
                        touched={formElement.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.title)}
                        messages={formElement.messages}
                         />
                ))}
                <button className = {classes.Button} disabled={!this.state.formIsValid}>SUBMIT</button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
                <div className={classes.form}>
                    <h3>{this.state.sampleform.title}</h3>
                    {form}
                </div>
        );
    }
}

export default form;