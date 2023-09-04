import styles from '../styles.module.scss';
import ContactsSearchBar from "../../SearchBars/ContactsSearchBar";
import ContactListItem from '../ContactListItem';
import useResponsive from '../../../../hooks/useResponsive';
export default function Contacts() {

  const width = useResponsive();

  return (
    <div>
      {width >= 768 && <ContactsSearchBar/>}
      <ul className={`${styles.contactsList} `}>
        {Array.from({'length': 33}, (_, i) => {
          return <ContactListItem key={i} id={i.toString()} />
        })}
      </ul>
    </div>
  )
}