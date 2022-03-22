import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
// next will bundle this in different bundle other than on the client side
// import { useState } from "react/cjs/react.production.min";
// import Layout from '../components/layout/Layout'
// Next js makes it easier to buld a backend togeather with react app in same project
// for this we can use API route

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first trip",
//     image: "https://images.alphacoders.com/736/736461.png",
//     address: "Some address 5, some city",
//     description: "This is our first meetup",
//   },
//   {
//     id: "m2",
//     title: "A second trip",
//     image: "https://images2.alphacoders.com/742/742320.png",
//     address: "Some address 5, some city",
//     description: "This is our second meetup",
//   },
// ];
// these props are genereated by getStaticProps
function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(()=>{
  //   // send http request and fetching data
  //   // but the problem is the rendering done by next js
  //   // as we know that useEffect runs after a component is ran
  //   // loadedMeetups is empty in first render cycle and when the state change is reredner to DUMMY
  //   // nextjs prerender the first one only and send it to the browsers
  //   // next time when rendering happens it happens in browser not on the server
  //   // next js have alternate way of prerendering data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // },[])

  // the next js propvide us woth teo froms of prerendering
  //  static generation                server-side rendering
  // static generation prerendering happens in build in production application
  // This only work in page component files
  // it has to be calles as getStaticProps it is a reserve name it will first call this and then render ur component
  // its job is to prepare jobs for this page

  // filled dot represent static generated site with no props or no fetchig logic 

  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name="description"
        content="Browse a huge list of highly active React meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>;
}
// export async function getServerSideProps(context){
//   // it will always run on the server after deployment not  on the build 
//   // fetch data from an API
//   // we get this context argument in both static and server methord
//   // it is gurantee to run for every request
//   const req= context.req;
//   const res = context.res;

//   return {
//      props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }
//if your data doesn't change every second then getStatic is better 

export async function getStaticProps() {
  // any code in this will never render on client side as it runs on server side only
  // fetch data from an API
  // read files
  // you always return an object you always set a props property there
  // this is also great for search engine as it dont prerender multiple time as it happen in useEffect
  // we need to rebulit site whenever we change data inorder for getStaticProps to change its daata
  // revalidaet will then regenerated on the server every  () second if there are request comming for the page
  // it ensure that your data is never old
  // they can take advantage of caching in cdn
  // is next we can use fetch for server side code too

  // in here we can directly run server side code
   const client = await MongoClient.connect(
     "mongodb+srv://priyanshu:priyanshulovesfootball@cluster0.wafqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
   );
   const db = client.db();

   const meetupsCollection = db.collection("meetups");
   const meetups=await meetupsCollection.find().toArray();
   client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
