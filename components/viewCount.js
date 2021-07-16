import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function ViewCount() {
  return (
    <span>
      <FontAwesomeIcon icon={faEye} /> 0
    </span>
  );
}
