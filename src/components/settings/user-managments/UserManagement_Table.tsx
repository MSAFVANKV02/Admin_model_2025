import { UserManagementColumn } from '@/components/tasks/table_columns/user-management-table-column';
import { DataTable } from '@/components/tasks/task_components/data-table'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function UserManagementTable({}: Props) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   console.log(users);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "/src/components/tasks/data/admin-users.json"
        ); // Replace with the appropriate API route
        const data = await response.json();
        // const validTasks = z.array(taskSchema).parse(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <DataTable
      enableView
      columns={UserManagementColumn}
      data={users}
      />
      {/* ===== */}
    </div>
  )
}