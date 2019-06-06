import React from 'react'
import style from './formFields.scss'



const FormFields = ({formData, change, id}) => {

    const renderTemplate = () => {
        
        let formTemplate = null;

        switch(formData.element){
            
            case('input'):
            
            formTemplate= (
                <div> 
                  <input 
                  {...formData.config}
                  value={formData.value}
                  onBlur={(event)=>{change({event,id,blur:true})}}
                  onChange={(event)=>{change({event,id,blur:false})}}> 
                  </input>
                </div>
            )
            break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }
    
    return (
       
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormFields

