import React, { Component } from 'react'
import {firebase} from '../../../firebase'
import FirebaseUpLoader from 'react-firebase-file-uploader'

export class FileUpLoader extends Component {

    state = { 

        name:'',
        isUpLoading:'',
        progress:0,
        fileURL:'',
    }

    handleUploadStart = () =>{ 
        this.setState({isUploading:true, progress:0})
    }

    handleUploadError = (error) => { 
        this.setState({isUploading:false})
        console.log(error)
    }

    handleProgress = (progress) => { 
        this.setState({progress})
    }

    handleUploadSuccess = (filename) =>{ 
        this.setState({
            name:filename,
            isUploading:false, 
            progress:100})

            ///
            firebase.storage().ref('images')
            .child(filename).getDownloadURL()
            .then( url => { 
                this.setState({fileURL:url})
            })

            this.props.fileName(filename)
    }




    render() {
        return (
            <div>
                <FirebaseUpLoader
                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleUploadProgress}
               />
               {this.state.isUpLoading ? 
               <p>Progress:{this.state.progress}</p>
                : null }
                {this.state.fileURL ? 
                <img style={{width:'300px'}}
                alt={this.state.fileURL}
                src={this.state.fileURL}
                /> :
                null }
            </div>
        )
    }
}

export default FileUpLoader
