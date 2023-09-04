import ContactListItem from "../GroupAddContactListItem"
import ContactsSearchBar from "../../SearchBars/GroupAddContactsSearchBar";
import styles from '../styles.module.scss';
export default function Contacts() {

  return (
    <div>
      <ContactsSearchBar/>
      <ul className={`${styles.contactsList} mt-[0.5rem]`}>
        {Array.from({'length': 33}, (_, i) => {
          return <ContactListItem key={i} id={i.toString()} />
        })}
      </ul>
    </div>
  )
}