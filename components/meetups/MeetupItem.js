import Card from '../ui/Card';
import { useRouter } from "next/router";

import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  // we should use hook at teh root level only hence here
  const router=useRouter();

  function showDetailsHandler(){
    // This push te stack of pages over the view pages equivalalent to Link 
    // it takes path as an argument we pass meetup.id in meetupList
    router.push('/' + props.id)

  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* alternative to link for routing in spa */}
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
