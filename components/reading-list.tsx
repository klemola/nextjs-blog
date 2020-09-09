import useSWR from "swr"

import { fetcher } from "../lib/api"
import styles from "./reading-list.module.css"

export default function ReadingList() {
  const { data, error } = useSWR("/api/reading-list", fetcher)

  if (error) {
    return <div className='failure'>Could not fetch the reading list</div>
  }

  return (
    <div>
      <h2>Reading list</h2>
      <ul className={styles["reading-list"]}>
        {(data || []).map((book) => {
          const id = `book-${book.id}`

          return (
            <li key={id} className={styles["reading-list__book"]}>
              <h3>
                {book.title}
                <span className={styles["reading-list__book__author"]}>
                  {" "}
                  by {book.author}
                </span>
              </h3>
              <input
                type='checkbox'
                className={styles["read-more-state"]}
                id={id}
              />
              <p className={styles["reading-list__book__description"]}>
                {book.description}
              </p>
              <label
                htmlFor={id}
                className={styles["read-more-trigger"]}
              ></label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
