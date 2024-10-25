import { createClient } from "../supabase/server";


export async function getAgencyId({ salespersonId }: {salespersonId: string}){
    const client = await createClient();
    const data = (await client.auth.getUser()).data.user;

    if (!data) {
        return null;
    }
    
    const agency_id = (
        await client
            .from("user_info")
            .select("agency_id")
            .eq("user_id", salespersonId)
            .limit(1)
    ).data;

    if (agency_id == null) {
        return null;
    }

    return agency_id[0].agency_id;
}

export async function getLocationHistory({salespersonId} : {salespersonId: string}){ 
    const client = await createClient();
    const data = (await client.from("location_tracker").select("*").eq("salesperson_id", salespersonId).order("datetime", {ascending: false})).data;
    return data!.map((location) => {return [parseFloat((location.lat as number).toFixed(2)), parseFloat((location.long as number).toFixed(2))]});
}