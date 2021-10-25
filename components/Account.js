import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { supabase } from '../utils/supabaseClient'

const session = supabase.auth.session()
session && console.log(session)

const logOut = async () => {
  await supabase.auth.signOut()
}

export default function Account() {
  const uploadImage = async (avatarFile) => {
    const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload(`private/${session.user.id}.jpg`, avatarFile, {
      cacheControl: '3600',
      upsert: false
    })
  }
  
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    uploadImage(acceptedFiles[0])
  }, [])

  const { publicURL, error } = supabase
  .storage
  .from('avatars')
  .getPublicUrl(`private/${session.user.id}`)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div>
    <img src={publicURL} />
      {JSON.stringify(session, undefined, 2)}
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>
      <button onClick={() => {logOut()}}>Sign Out</button>
    </div>
  )
}
