
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Google Forms Clone</h1>

      <Link to="/create">
        <button>Create New Form</button>
      </Link>
    </div>
  );
}

export default Home;