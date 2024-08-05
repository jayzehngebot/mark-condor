// header comp
'use client'
import { useState, useEffect } from 'react';
import Alert from "./alert";

async function getAlertData() {
  try {
    const response = await fetch('/api/getAlertData', { cache: "no-cache" });
    
    if (!response.ok) {
      throw new Error("Failed to fetch alert data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching alert text:", error);
    throw error;
  }
}

export default function Header() {
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
      getAlertData()
          .then(data => setAlertData(data))
          .catch(error => console.error("Error setting alert data:", error));
  }, []);

  console.log('alertData : '+ alertData);

  return (
      <header>
          {alertData && alertData[0] === "TRUE" && <Alert alertText={alertData[1]} />}
          <h1 className="ml-10 mt-4">Condor Method</h1>
      </header>
  );
}