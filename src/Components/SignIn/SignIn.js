import React, { Component } from 'react'
import style from './signIn.scss'
import FormField from '../Widgets/FormFields/FormFields'
import {firebase} from '../../firebase'

export class SignIn extends Component {

    state={
        registerError: '',
        loading: false,
        formData:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:"email_input",
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:"password_input",
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        // Take in the current state, which represents the form being rendered on the screen. 
        const newFormData = {
            ...this.state.formData
        }
        // Create a variable for the element being changed. This is either the username or password field. 
        // This is passing in the newFormData variable, which is the represenation of the state. 
        // This specific element is declared via the element ID, which is being passed in from the component props. 
        
        const newElement = {
            // This variable is the specific object reflecting the email or password
            ...newFormData[element.id]
        }
        // NewElement.Value is set to '' initially, and then is set to the Element.event.target.value, which is email or password
        
        newElement.value = element.event.target.value;

        if(element.blur){
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }

        newElement.touched = element.blur
        // A new key is declared, password: and is set to new Element
        newFormData[element.id] = newElement
        
        this.setState({
            // The Form Data state is updated with the newFormData on every change. 
            formData:newFormData
        })
        
    }

    validate = (element) => {

        let error = [ true, ''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value)
            const message = `${!valid ? 'Must Be a Valid Email' : ''}`
            error = !valid ? [valid, message] : error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This Field is Required' : ''}`
            error = !valid ? [valid, message] : error
        }

        if(element.validation.password){
            
            const valid = element.value.length >= 5
            const message = `${!valid ? 'Must Be Greater than 5' : ''}`
            error = !valid ? [valid, message] : error
        }

        return error

    }

    submitForm = (event, type) => { 
        event.preventDefault();

        if(type !== null) {
            let dataToSubmit = {};
            let formIsValid = true

            for(let key in this.state.formData){
                dataToSubmit[key] = this.state.formData[key].value
            }
            for(let key in this.state.formData){
                formIsValid = this.state.formData[key].valid && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                   firebase.auth()
                   .signInWithEmailAndPassword(
                    dataToSubmit.email, 
                    dataToSubmit.password
                   ).then(()=> {
                    this.props.history.push('/')
                   })
                   .catch((error) =>{
                    this.setState({
                        loading:false,
                        registerError:error.message
                    })
                })
                } else {

                   firebase.auth()
                   .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
                   .then(()=>{
                       this.props.history.push('/')
                   })
                   .catch((error) =>{
                       this.setState({
                           loading:false,
                           registerError:error.message
                       })
                   })
                }
            }
        }


    }

    renderSubmitButton = () => (
        this.state.loading ? 
        'Loading ...' 
        : 
        <div> 
            <button onClick={(event) => this.submitForm(event, false)} > Register Now</button>
            <button onClick={(event) => this.submitForm(event, true)}> Log In </button>
        </div>

    )

    renderErrorMessage = () => (
        this.state.registerError !== '' ? 
        <div className='showError'> {this.state.registerError}</div>
        : ''
    )



    render() {
        return (
            <div className={style.logContainer}>
                <form onSubmit={(event) => this.submitForm(event, null)}>
                    <h2>Register / Log In </h2>
                    <FormField
                    id={'email'}
                    formData={this.state.formData.email}
                    change={(element)=>this.updateForm(element)}/>

                    <FormField
                    id={'password'}
                    formData={this.state.formData.password}
                    change={(element)=>this.updateForm(element)}/>

                </form>
                {this.renderSubmitButton()}
                {this.renderErrorMessage()}
            </div>
        )
    }
}

export default SignIn
