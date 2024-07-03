"use client"
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

export default function AssessmentStatus() {

    return (
        <div>
            <div className='pb-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>Assessment Submissions</div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by class name ..."
                        style={{
                            border: 'none',       // Remove border
                            outline: 'none',
                            padding: '8px',
                            fontSize: '12px',
                            borderRadius: '4px',
                            width: '200px',
                        }}
                    />
                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                        <SearchIcon style={{ color: '#6a5bcd' }} />
                    </div>
                </div>
            </div>
            <div style={{ maxHeight: '60vh', minHeight: '60vh', overflowY: 'auto', padding: '10px' }}>
                <Grid container spacing={3}>
                    {/* {handleSearch().map((classItem) => ( */}
                    {[...Array(5)].map((_, index) => (
                        <Grid item
                            // key={classItem.classroom_id} 
                            xs={12} sm={12} md={12}>
                            <Card className=''>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Typography fontSize='15px' textAlign="start">
                                            {/* {classItem.name} */}Classname
                                        </Typography>
                                        <Typography fontSize='10px' className="py-1" textAlign="start" color="textSecondary">
                                            {/* {classItem.description} */}Module Name
                                        </Typography>
                                        <Typography fontSize='10px' className="py-1" textAlign="start" color="textSecondary">
                                            {/* {classItem.description} */}Assessment Name
                                        </Typography>
                                        <Typography fontSize='10px' textAlign="start" className='ms-3 py-1' component="div">
                                            <ul style={{ listStyleType: 'circle' }}>
                                                <li>Start Date</li>
                                                <li>Deadline</li>
                                            </ul>
                                        </Typography>
                                    </div>
                                    <Typography fontSize='12px' textAlign="start" alignContent='center' style={{ fontWeight: '', color: 'green' }}>
                                        {/* {classItem.name} */}5 Submissions
                                    </Typography>
                                    <Button size="small" startIcon={<ArrowForwardIosIcon />} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {/* ))} */}
                </Grid>
            </div>
        </div>
    );
}
