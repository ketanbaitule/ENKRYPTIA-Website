import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function StaffDashboard() {
  const client = await createClient();
  const user_info = (await client.from("user_info").select("*")).data![0];
  return (
    <div className="px-6 py-5">
      <h1 className="text-3xl">Staff Dashboard</h1>
      <div className="py-3">Agency_Id: 1</div>
      <h2 className="text-xl pb-3">List of SalesPerson In Agency</h2>

      <table className="w-full text-left table-fixed my-5">
        <thead className="uppercase bg-primary text-sm">
          <tr>
            <td scope="col" className="px-6 py-3">
              Salesperson Id
            </td>
            <td scope="col" className="px-6 py-3">
              Salesperson Name
            </td>
            <td scope="col" className="px-6 py-3">
              View Info
            </td>
          </tr>
        </thead>
        <tbody className="text-sm">
          {salesPersons.map((salesPerson) => (
            <tr key={salesPerson.user_id} className="border-b ">
              <td className="px-6 py-4 ">{salesPerson.user_id}</td>
              <td className="px-6 py-4">{salesPerson.name}</td>
              <td className="px-6 py-4">
                <Link href={`/staff/salesperson/${salesPerson.user_id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
