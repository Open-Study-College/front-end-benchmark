import { json, useLoaderData } from "remix";

export async function loader() {
    const res = await fetch(
        "https://6221e286666291106a161556.mockapi.io/api/osc/getMockLeads/leads"
    );
    return json(await res.json());
}

export default function Index() {
    const leads = useLoaderData();
    return (
        <div>
            {leads.map((lead: any) => (
                <div>{lead.name}</div>
            ))}
        </div>
    );
}
