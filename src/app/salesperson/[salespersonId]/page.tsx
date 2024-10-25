import { createClient } from "@/utils/supabase/server";
import TaskTable from "./TaskTable";
import LocationTracker from "./LocationTracker";
import { getAgencyId, getLocationHistory } from "@/utils/helper/utils";
import AddTask from "./AddTask";

export default async function Salesperson({
  params,
}: {
  params: { salespersonId: string };
}) {
  const salespersonId = (await params).salespersonId;

  const client = await createClient();

  const agency_id = await getAgencyId({ salespersonId });

  const user_info = (
    await client
      .from("user_info")
      .select("*")
      .eq("user_id", salespersonId)
      .eq("agency_id", agency_id)
      .limit(1)
  ).data;

  if (!user_info){
    return <div> Error </div>
  };

  const tasks = (await client.from("goals").select("*").eq("salesperson_id", salespersonId)).data;

  const locationHistory = await getLocationHistory({salespersonId});

  console.log("locationHistory=", locationHistory);

  return (
    <div className="px-6 py-5">
      <div className="container flex flex-col md:flex-row mx-auto">
        <section className="space-y-4 w-1/2">
          <h1 className="text-3xl">Salesperson Info </h1>
          <div>
            <b className="font-semibold"> Salesperson Name: </b>{" "}
            {user_info[0].name}{" "}
          </div>
          <div>
            <AddTask salespersonId={salespersonId} />
          </div>
          <div>
            <h2 className="text-2xl"> Task Allocated </h2>

            <TaskTable tasks={tasks!}/>
          </div>
        </section>
        <section className="py-6 px-4 w-1/2">
          <LocationTracker _polyline={locationHistory} salesperson_id={salespersonId} />
        </section>
      </div>
    </div>
  );
}
