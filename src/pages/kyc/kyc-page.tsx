import { taskSchema } from "@/components/tasks/data/schema";
import { kycColumn } from "@/components/tasks/table_columns/kyc_column";
import { DataTable } from "@/components/tasks/task_components/data-table";

import { useEffect, useState } from "react";
import { z } from "zod";



export default function KycPage() {
    const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
    // const [loadig, setLoading] = useState(true);
    // const isDashboard = false; 
    useEffect(() => {
      async function fetchTasks() {
        try {
          const response = await fetch("/src/components/tasks/data/tasks.json"); // Replace with the appropriate API route
          const data = await response.json();
          const validTasks = z.array(taskSchema).parse(data);
          setTasks(validTasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
        //   setLoading(false);
        }
      }
  
      fetchTasks();
    }, []);
    // const columns = kycColumn({ isDashboard: true });
  return (
    <div>
        <div className="">
            <h1 className="p-4 font-bold select-none">KYC verification</h1>
        </div>
        {/* ========= */}
        <div className="page-outer">
            <DataTable
             data={tasks}
             columns={kycColumn} 
            enableSearch
            searchWith="businessName"
            enableView
            
            />
      
        </div>
    </div>
  )
}