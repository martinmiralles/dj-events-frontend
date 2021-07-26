import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <h1>Search Results for: {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}>
          {evt.name}
        </EventItem>
      ))}

      <Link href="/events">Go Back</Link>
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);

  const events = await res.json();
  // console.log(events);

  return {
    props: { events },
  };
}
