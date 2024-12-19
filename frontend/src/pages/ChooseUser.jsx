import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, School, Group } from '@mui/icons-material';

const profiles = [
  { type: 'Admin', icon: <AccountCircle fontSize="large" />, path: '/login', description: 'Login as an administrator to access the dashboard to manage app data.' },
  { type: 'Student', icon: <School fontSize="large" />, path: '/login', description: 'Login as a student to explore course materials and assignments.' },
  { type: 'Teacher', icon: <Group fontSize="large" />, path: '/login', description: 'Login as a teacher to create courses, assignments, and track student progress.' },
];

export default function ChooseUser() {
  const navigate = useNavigate();

  return (
    <Box 
    maxWidth = 'xl'
      sx={{
        height: '100vh',
        width : 1280,
        margin : 0,
        padding : 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #5f2c82, #49a09d)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4 }}>
        {profiles.map((profile) => (
          <Card
            key={profile.type}
            sx={{
              width: 300,
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: 3,
              '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' },
              transition: 'all 0.3s',
            }}
            onClick={() => navigate(profile.path, {state : profile.type})}
          >
            <CardContent>
              <Box sx={{ mb: 2 }}>{profile.icon}</Box>
              <Typography variant="h6" fontWeight="bold">
                {profile.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
