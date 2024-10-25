"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function TaskTable({tasks}: {tasks: any[]}) {
  return (
    <table className="w-full text-left table-fixed my-5">
      <thead className="uppercase bg-primary text-sm">
        <tr>
          <td scope="col" className="px-6 py-3">
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
          <td>Start Time</td>
          <td>End Time</td>
        </tr>
      </thead>
      <tbody className="text-sm">
        {tasks.map(
          (task: { id: number; goal: string; lat: number; long: number }) => (
            <tr key={task.id}>
              <td className="border px-6 py-3">{task.id}</td>
              <td className="border px-6 py-3">{task.goal}</td>
              <td className="border px-6 py-3">{task.lat}</td>
              <td className="border px-6 py-3">{task.long}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
