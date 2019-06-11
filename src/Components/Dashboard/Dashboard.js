import React, { Component } from 'react'
import style from './dashboard.scss'
import FormField from '../Widgets/FormFields/FormFields'
import {firebaseTeams} from '../../firebase'

import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js' 
import {stateToHTML} from 'draft-js-export-html'

export class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
        formData:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:"author_input",
                    type:'text',
                    placeholder:'Enter your name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:"title_input",
                    type:'text',
                    placeholder:'Enter the Title'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            body:{
                element:'texteditor',
                value:'',
                valid:true
            },
            teams:{
                element:'select',
                value:'',
                config:{
                    name:"teams_input",
                    options:[]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }

    }

    componentDidMount(){
        this.loadTeamData()

    }

    loadTeamData = () =>{
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let teams = [];
            snapshot.forEach((childSnapshot)=>{
                teams.push({
                    id:childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })
        
         const newFormData = {...this.state.formData}
         const newElement = {...newFormData['teams']}

         newElement.config.options = teams
         newFormData['teams'] = newElement
         
         this.setState ({
             formData: newFormData
         })
        })
    }

    updateForm = (element, content='') => {
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
        

        if(content === ''){
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

       

        if(element.blur){
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }

        newElement.touched = element.blur
        // A new key is declared, password: and is set to new Element
        newFormData[element.id] = newElement
        console.log(newFormData)
        
        this.setState({
            // The Form Data state is updated with the newFormData on every change. 
            formData:newFormData
        })
        
    }

    validate = (element) => {
        let error = [ true, ''];
        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This Field is Required' : ''}`
            error = !valid ? [valid, message] : error
        }
        return error
    }

    renderSubmitButton = () => (
        this.state.loading ? 
        'Loading ...' 
        : 
        <div> 
            <button type='submit' > Add Post</button>
            
        </div>

    )

    submitForm = (event) => { 
        event.preventDefault();
        let dataToSubmit = {};
            let formIsValid = true

            for(let key in this.state.formData){
                dataToSubmit[key] = this.state.formData[key].value
            }
            for(let key in this.state.formData){
                formIsValid = this.state.formData[key].valid && formIsValid;
            }

      

            if(formIsValid){
                console.log('Submit Post')
            } else {
                this.setState({
                    postError:'Something Went Wrong'
                })
            }

    }



    renderErrorMessage = () => (
        this.state.registerError !== '' ? 
        <div className='showError'> {this.state.postError}</div>
        : ''
    )

    updateEditorState = (editorState) => { 

    let contentState = editorState.getCurrentContent();
       let rawState = convertToRaw(contentState)
       let html = stateToHTML(contentState)
       

        this.updateForm({id:'body'}, html)

        this.setState({
            editorState
        })
    }

    render() {
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
            <h2> Add Post</h2>
            Dashboard
                    <FormField
                    id={'author'}
                    formData={this.state.formData.author}
                    change={(element)=>this.updateForm(element)}/>

                    <FormField
                    id={'title'}
                    formData={this.state.formData.title}
                    change={(element)=>this.updateForm(element)}/>      
                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName='myEditor-wrapper'
                        editorClassName='myEditor-editor'
                        onEditorStateChange={this.updateEditorState}
                    />

                    <FormField
                    id={'teams'}
                    formData={this.state.formData.teams}
                    change={(element)=>this.updateForm(element)}/>   
                     {this.renderSubmitButton()}
                     {this.renderErrorMessage()}
            </form>
                
            </div>
        )
    }
}

export default Dashboard

