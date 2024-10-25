"use client";

export default function TaskTable({tasks}: {tasks: { id: number; goal: string; lat: number; long: number, start_time: string, end_time: string, start_code: string, end_code: string }[]}) {
  return (
    <table className="w-full text-left my-5 table-fixed">
      <thead className="uppercase bg-primary text-sm">
        <tr>
          <td scope="col" className="px-6 py-3 ">
            Task ID
          </td>
          <td scope="col" className="px-6 py-3">
            Goal
          </td>
          <td scope="col" className="px-6 py-3">
            Lat
          </td>
          <td scope="col" className="px-6 py-3">
            Long
          </td>
          <td scope="col" className="px-6 py-3">
            Current Status
          </td>
          <td scope="col" className="px-6 py-3">Start Time</td>
          <td scope="col" className="px-6 py-3">End Time</td>
          {/* <td scope="col" className="px-6 py-3">Start Code</td>
          <td scope="col" className="px-6 py-3">End Code</td> */}
        </tr>
      </thead>
      <tbody className="text-sm">
        {tasks.map(
          (task: { id: number; goal: string; lat: number; long: number, start_time: string, end_time: string, start_code: string, end_code: string }) =>{
            let status = "Pending";
            if (task.start_time){
              status = "In Progress";
            }
            if (task.end_time){
              status = "Completed";
            }

            return (
              <tr key={task.id}>
                <td className="border px-6 py-3">{task.id}</td>
                <td className="border px-6 py-3">{task.goal}</td>
                <td className="border px-6 py-3">{task.lat}</td>
                <td className="border px-6 py-3">{task.long}</td>
                <td className="border px-6 py-3">{status}</td>
                <td className="border px-6 py-3">{task.start_time}</td>
                <td className="border px-6 py-3">{task.end_time}</td>
                {/* <td className="border px-6 py-3">{task.start_code}</td>
                <td className="border px-6 py-3">{task.end_code}</td> */}
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  );
}
