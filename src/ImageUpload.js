import React  , {useState} from 'react' ;
import {Button} from '@material-ui/core';
import firebase from 'firebase';
import {storage , db} from './firebase';
import './ImageUpload.css' ; 

export const ImageUpload = ({username}) => {
    const [image,setImage] =  useState(null);
    const [progress,setProgress] = useState(0);
    const [caption,setCaption] = useState('');

    // When file is chosen to be uploaded
    const handleChange = (e) => {
        if (e.target.files[0]){ //only one file at a time
            setImage(e.target.files[0]); 
        }
    };

    //When file is uploaded
    const handleUpload = () => {
        //Create ref to selected image in the database (images folder)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed', //When upload status changed 
            (snapshot)=>{
                //Find upload progress
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress); //update progress
            },
            (error)=>{
                //Error function
                console.log(error);
                alert(error.message);
            },
            //Complete function (when uplaod done)
            ()=>{
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image inside database
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                setProgress(0); //Reset progress 
                setCaption(''); //Reset caption
                setImage(null); //Reset Image
                })
            }
            )
    };

    return (
        <div className='imageupload'>
            <progress className='imageupload__progress' 
                      value={progress} 
                      max='100'
            />
            <input type="text" placeholder="Enter a caption..."
            value={caption} 
            onChange={(event)=>setCaption(event.target.value)}
            />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload;