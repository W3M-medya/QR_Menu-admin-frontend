import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, previewUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null, null);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Box>
      {preview && (
        <Box mb={1}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }} />
        </Box>
      )}
      <Button variant="contained" component="label">
        Görsel Seç
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={handleFileChange}
        />
      </Button>
      {preview && (
        <Button variant="text" color="error" sx={{ ml: 2 }} onClick={handleClear}>
          Temizle
        </Button>
      )}
      {!preview && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          Henüz görsel seçilmedi.
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
