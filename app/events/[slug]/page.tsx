import {Suspense} from "react";
import EventDetails from "@/components/EventDetails";

// Make route dynamic
export const dynamic = 'force-dynamic';

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
    const { slug } = await params;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventDetails params={Promise.resolve(slug)} />
        </Suspense>
    )
}
export default EventDetailsPage