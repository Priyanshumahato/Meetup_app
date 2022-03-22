
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  // it has the job of describing dynamic segment values
  // it need to have a path keys which is can array
  // params have dynamic key
  // in a dev env we will also fetch this ids from as database to generate this array dynamically
  // fallback key tells next js weather this fucntion have all supported values or some of them
  // false: contains all
  // true : it will try to generate the mentioned id
  // it helps us to pregenerate some more popular ones with this
  const client = await MongoClient.connect(
    "mongodb+srv://priyanshu:priyanshulovesfootball@cluster0.wafqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  //  as we only want to fetch ids
  const meetups= await meetupsCollection.find({},{_id:1}).toArray();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

// here as we need a single data that is unique to
// we can use help of dynamic page render name as id
// which can be taken from context props which we get
export async function getStaticProps(context) {
  // it dont have req, res like server one but it will have
  // params which will have id name which we have in square bracket we get this through url
  // url changes every time but it only runs when build hence it will not regenrate
  // Fetch data for a single meetup
  // it is needed when use use getStaticProps with dynamic page rendering we have up provide getStaticpaths function
  //   console.log(meetupId); code are outputted in terminal not on client side

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://priyanshu:priyanshulovesfootball@cluster0.wafqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId), // as mongo have their own ids which can v=be different than string 
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
