import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, MenuItem } from '@mui/material';

const GenericForm = ({ title, fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #5f2c82, #49a09d)',
        px: 2,
        
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            field.type === 'select' ? (
              <TextField
                  key={field.name}
                  select
                  label={field.label}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
              >
                  {field.options.map((option) => (
                      <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                  ))}
              </TextField>)
              : (<TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required={field.required}
              />)
            
          ))}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default GenericForm;
