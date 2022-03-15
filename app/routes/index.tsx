import { json, LinksFunction, useLoaderData } from "remix";

import styles from "~/styles/main.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
};

export async function loader() {
    // This is being flagged as an error by VSCode but as Remix runs loaders on server side, it works fine
    // Argument of type 'string | undefined' is not assignable to parameter of type 'RequestInfo'.
    // Type 'undefined' is not assignable to type 'RequestInfo'.ts(2345)
    // const res = await fetch(process.env.LEADS_ENDPOINT);

    const res = await fetch(
        "https://6221e286666291106a161556.mockapi.io/api/osc/getMockLeads/leads"
    );
    return json(await res.json());
}

export default function Index() {
    const leads = useLoaderData();
    return (
        <div className="card-container">
            {leads.map((lead: any) => (
                <div className="card">
                    <div className="card__header">
                        <img
                            className="card__avatar"
                            src={lead.avatar}
                            alt={"Avatar of " + lead.name}
                        />
                        <h1 className="card__heading">{lead.name}</h1>
                        <h2 className="card__sub-heading">{lead.title}</h2>
                        <div className="card__id">ID: 1234{lead.id}</div>
                    </div>
                    <div className="card__body"></div>
                </div>
            ))}
        </div>
    );
}
