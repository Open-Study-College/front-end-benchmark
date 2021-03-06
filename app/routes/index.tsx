import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faGraduationCap, faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
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
        <div className="c-card-container">
            {leads.map((lead: any) => (
                <div className="c-card">
                    <div className="c-card__header">
                        <FontAwesomeIcon icon={faX} className="c-card__close" />
                        <div className="c-card__avatar-area">
                            <img
                                className="c-card__avatar"
                                src={lead.avatar + "?" + lead.id}
                                alt={"Avatar of " + lead.name}
                            />
                            <div className="c-card__verified">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                        <h1 className="c-card__heading">{lead.name}</h1>
                        <h2 className="c-card__sub-heading">{lead.title}</h2>
                        <div className="c-card__id">ID: {lead.student_id}</div>
                    </div>
                    <div className="c-card__body">
                        <div className="c-card__overlap-tray">
                            <div className="c-card__overlap-tray--half">
                                <h3 className="c-card__overlap-tray__heading">
                                    {lead.enrolment_status}
                                </h3>
                                <h3 className="c-card__overlap-tray__sub-heading">
                                    Enrolment Status
                                </h3>
                            </div>
                            <div className="c-card__overlap-tray--half">
                                <h3 className="c-card__overlap-tray__heading">
                                    {lead.completed_courses}
                                </h3>
                                <h3 className="c-card__overlap-tray__sub-heading">
                                    Completed Courses
                                </h3>
                            </div>
                        </div>

                        <div className="c-card__details">
                            <h4 className="c-card__details__heading">Contact Details</h4>
                            <p className="c-card__details__text">Email: {lead.email}</p>
                            <p className="c-card__details__text">Tel: {lead.telephone}</p>
                        </div>

                        <div className="c-card__details">
                            <h4 className="c-card__details__heading">About Me</h4>
                            <p className="c-card__details__text">{lead.profile_description}</p>
                        </div>

                        <div className="c-card__toggle">
                            <div className="c-card__toggle-header">
                                <span className="c-card__toggle-icon">
                                    <FontAwesomeIcon icon={faGraduationCap} />
                                </span>
                                <div>
                                    <h3 className="c-card__toggle-heading">Current Course:</h3>
                                    <h4 className="c-card__toggle-sub-heading">
                                        {lead.course_title}
                                    </h4>
                                </div>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="c-card__toggle-chevron"
                                />
                            </div>
                            <div className="c-card__toggle-body">Hello</div>
                        </div>

                        <div className="c-card__toggle is-open">
                            <div className="c-card__toggle-header">
                                <h3 className="c-card__toggle-heading">My Photos</h3>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="c-card__toggle-chevron"
                                />
                            </div>

                            <div className="c-card__toggle-body">
                                <div className="c-card__gallery">
                                    {lead.images.map((image: string, key: number) => (
                                        <div className="c-card__gallery__img">
                                            <img src={image + "?" + lead.student_id + key} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
