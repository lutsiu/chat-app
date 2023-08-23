import styles from '../styles.module.scss';
import ContactsSearchBar from "../../SearchBars/ContactsSearchBar";
import ContactListItem from '../ContactListItem';
export default function Contacts() {

  return (
    <div>
      <ContactsSearchBar/>
      <ul className={`${styles.contactsList} overflow-y-scroll max-h-[35rem] mt-[0.5rem]`}>
        {Array.from({'length': 8}, (_, i) => {
          return <ContactListItem key={i} id={i.toString()} />
        })}
      </ul>
    </div>
  )
}