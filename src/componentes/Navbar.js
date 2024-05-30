import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/listar_centros">Centros</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
