import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../lib/store";

export default function ViewCount({ postId }) {
  const { count, increment } = useStore((store) => ({
    count: store.viewCounts[postId],
    increment: store.incrementViewCount,
  }));
  return (
    <span onClick={() => increment(postId)}>
      <FontAwesomeIcon icon={faEye} /> {count}
    </span>
  );
}
