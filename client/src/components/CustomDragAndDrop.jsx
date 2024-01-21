import React, { useState } from 'react';

const DragAndDropPhoto = ({ sendImage , style }) => {
    const [image, setImage] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            const imageData = new FormData();
            imageData.append('photo', file);

            sendImage(imageData)
            
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={'border-[2px] border-dashed border-[#ccc] p-[20px] text-center cursor-pointer flex items-center justify-center overflow-hidden  '+ style}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className='hidden'
                id="fileInput"
            />
            <label htmlFor="fileInput">
                {image ? (
                    <img
                        src={image}
                        alt="Dropped"
                        className='max-w-full max-h-full'
                    />
                ) : (
                    <p className='cursor-pointer'>Click to choose or drag and drop a photo here</p>
                )}
            </label>
        </div>
    );
};

export default DragAndDropPhoto;
