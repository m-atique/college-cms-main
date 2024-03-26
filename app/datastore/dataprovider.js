
'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create contexts
export const ClassContext = createContext();
export const SectionContext = createContext();
export const spUnitContext = createContext();
export const domainContext = createContext();
export const sessionContext = createContext();





const DataStore = ({ children }) => {
  // State to hold data
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [spUnits, setSpUnits] = useState([]);
  const [session, setSession] = useState([]);
  const [base_url, setBase_url] = useState("http://localhost:5010");
  // Fetch classes data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${base_url}/cls/classesList`);
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes data:', error.message);
      }
    };

    fetchClasses();
  }, [base_url]);

  ///fetch sessions info
  useEffect(() => {
    const fetchSessions = async () => {
    
      try {
        const response = await axios.get(`${base_url}/session/sessionList`);
        setSession(response.data);
      } catch (error) {
        console.error('Error fetching sessions data:', error.message);
      }
    };

    fetchSessions();
  }, [base_url]);



  // Fetch table data
  useEffect(() => {
    const fetchSpUnits = async () => {
      try {
        const response = await axios.get(`${base_url}/gen/gettableRecord/sapphireunits`);
        setSpUnits(response.data);
      
      } catch (error) {
        console.error('Error fetching units data:', error.message);
      }
    };

    fetchSpUnits();
  }, [base_url]);

  // Fetch sections data






  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${base_url}/cls/sectionList`);
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections data:', error.message);
      }
    };

    fetchSections();
  }, [base_url]);

  // Provide the data through the contexts
  return (
    <ClassContext.Provider value={classes}>
      <SectionContext.Provider value={sections}>
      <spUnitContext.Provider value={{ spUnits }}>
      <domainContext.Provider value={{ base_url }}>
      <sessionContext.Provider value={{session}}>
        {children}
        </sessionContext.Provider>
        </domainContext.Provider >
        </spUnitContext.Provider >
      </SectionContext.Provider>
    </ClassContext.Provider>
  );
};

export default DataStore;
