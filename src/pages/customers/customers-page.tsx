import { CustomersTableColumn } from "@/components/tasks/table_columns/customers/customers-table-column";
import { DataTable } from "@/components/tasks/task_components/data-table";
import { fetchCustomerDetails } from "@/redux/actions/customerSlice";
import { dispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

function CustomersPage() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  //   console.log(users);

  const { customer, isLoading } = useAppSelector((state) => state.customer);

  // Fetch customer details on mount
  useEffect(() => {
    dispatch(fetchCustomerDetails());
  }, [dispatch]);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     try {
  //       const response = await fetch(
  //         "/src/components/tasks/data/user-data.json"
  //       ); // Replace with the appropriate API route
  //       const data = await response.json();
  //       // const validTasks = z.array(taskSchema).parse(data);
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchTasks();
  // }, []);

  if (isLoading) return <div className="">Loading...</div>;
  return (
    <div>
      <div className="text-sm font-bold p-4">
        <h1>All Customers</h1>
      </div>
      <div className="page-outer">
        {/* <pre>
      {JSON.stringify(customer,null,4)}
    </pre> */}

        <DataTable
          enableSearch
          searchWith="name"
          data={customer}
          columns={CustomersTableColumn}
        />
      </div>
    </div>
  );
}

export default CustomersPage;
