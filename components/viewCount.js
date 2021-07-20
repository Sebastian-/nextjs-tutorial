import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useStore } from '../lib/store'

export default function ViewCount({ postId }) {
  const { count } = useStore((store) => ({
    count: store.viewCounts[postId],
  }))
  return (
    <span>
      <FontAwesomeIcon icon={faEye} /> {count}
    </span>
  )
}
