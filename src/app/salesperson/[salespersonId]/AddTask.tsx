"use client";
import { createClient } from "@/utils/supabase/client"
import { useState } from "react";

export default function AddTask({salespersonId}: {salespersonId: string}) {
    const client = createClient();
    const [open, setOpen] = useState(false);

    const onAddTask = async (event: React.FormEvent) => {
        event.preventDefault();
        
        var formData = new FormData(event.target as HTMLFormElement);
        const status=await client.from("goals").insert({
            goal: formData.get("goal") as string,
            lat: parseFloat(formData.get("lat") as string),
            long: parseFloat(formData.get("long") as string),
            salesperson_id: salespersonId
        })

        console.log("status", status);
    };

    return (
        <details open={open}>
            <summary><button onClick={()=>{setOpen(!open)}} className="bg-primary p-3 rounded-2xl"> Add Goals </button></summary>

            <form onSubmit={onAddTask}>
                <b>Goal</b>
                <textarea name="goal" className="w-full h-24 border-2 border-gray-300 rounded-lg p-2" placeholder="Enter the goal of the task"></textarea>

                <b>Lat</b>
                <input name="lat" className="w-full border-2 border-gray-300 rounded-lg p-2" placeholder="Enter the latitude of the task"/>

                <b>Long</b>
                <input name="long" className="w-full border-2 border-gray-300 rounded-lg p-2" placeholder="Enter the longitude of the task"/>

                <button type={"submit"} className="bg-primary p-3 rounded-2xl">Add Task</button>
            </form>

        </details>
    )
}