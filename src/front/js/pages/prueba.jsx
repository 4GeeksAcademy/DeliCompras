import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', 'tu_upload_preset'); // Reemplaza 'tu_upload_preset' con tu upload preset de Cloudinary

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('URL de la imagen cargada:', data.secure_url);
        } else {
          console.error('Error al cargar la imagen:', response.statusText);
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <button onClick={handleImageUpload}>Subir imagen a Cloudinary</button>
    </div>
  );
}

export default ImageUpload;
