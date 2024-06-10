"use client"

import React, { useState, useEffect } from 'react';

// Function to fetch class data (hardcoded data for this example)
const fetchClassData = async () => {
  return [
    {
      id: 1,
      title: 'Web System Development',
      description: 'Facilis nam et quia. Facilis accusamus libero facilis nam eum maiores. Explicabo dolore ipsa facilis nam et quia.',
      startDate: '2.2.2024',
      endDate: '2.2.2024',
      otherEventDates: 'Other Event Dates',
    },
    {
      id: 2,
      title: 'Web System Development',
      description: 'Facilis nam et quia. Facilis accusamus libero facilis nam eum maiores. Explicabo dolore ipsa facilis nam et quia.',
      startDate: '2.2.2024',
      endDate: '2.2.2024',
      otherEventDates: 'Other Event Dates',
    },
  ];
};

// Function to fetch assessment data (hardcoded data for this example)
const fetchAssessmentData = async () => {
  return [
    {
      id: 1,
      className: 'Class Name',
      moduleOrTopic: 'Module or Topic name',
      assignmentOrTask: 'Assignment or task or quiz or exam name',
      deadline: '30.5.2023',
      status: 5,
    },
    {
      id: 2,
      className: 'Class Name',
      moduleOrTopic: 'Module or Topic name',
      assignmentOrTask: 'Assignment or task or quiz or exam name',
      deadline: '30.5.2023',
      status: 8,
    },
    {
      id: 3,
      className: 'Class Name',
      moduleOrTopic: 'Module or Topic name',
      assignmentOrTask: 'Assignment or task or quiz or exam name',
      deadline: '30.5.2023',
      status: 0,
    },
  ];
};

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Fetch and set class data
    fetchClassData().then(data => setClasses(data));
    // Fetch and set assessment data
    fetchAssessmentData().then(data => setAssessments(data));
  }, []);

  return (
    <div className="flex justify-between p-6">
      {/* Left side - Classes */}
      <div className="w-2/3">
        <h2 className="text-xl font-bold mb-4">Classes</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by class name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="space-y-4">
          {classes.map((item) => (
            <div key={item.id} className="bg-white shadow p-4 rounded flex">
              <div className="w-1/4 bg-gray-200 flex items-center justify-center">
                <span>Photo</span>
              </div>
              <div className="w-3/4 pl-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
                <div className="text-sm mt-2">
                  <p>Start Date: {item.startDate}</p>
                  <p>End Date: {item.endDate}</p>
                  <p>{item.otherEventDates}</p>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Assessments */}
      <div className="w-1/3">
        <h2 className="text-xl font-bold mb-4">Assessments</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="space-y-4">
          {assessments.map((item) => (
            <div key={item.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.className}</h3>
                <p className="text-sm text-gray-600">
                  {item.moduleOrTopic} {item.assignmentOrTask}
                </p>
                <p className="text-sm mt-2">Deadline - {item.deadline}</p>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">{item.status} submitted</span>
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">&gt;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
