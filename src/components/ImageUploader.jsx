import React, { useState } from 'react';
import { uploadImage } from '../services/uploadService';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image!');

    const result = await uploadImage(image);
    setUploadedUrl(result.imageUrl);
  };

  return (
    <div>
      <h2>Upload Image</h2>

      <input type="file" onChange={handleFileChange} />

      {preview && (
        <img src={preview} alt="preview" style={{ width: 150, marginTop: 10 }} />
      )}

      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Uploaded Successfully!</p>
          <img src={uploadedUrl} alt="uploaded" style={{ width: 150 }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
