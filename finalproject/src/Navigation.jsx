import Button from './Button';
import './index.css';
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="py-10">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-heading text-nav text-dark_blue">
          No Small Talk
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="font-sans text-nav text-dark_blue">
            Home
          </Link>
          <Link to="/about" className="font-sans text-nav text-dark_blue">
            About
          </Link>
          <Button 
            text="Play Game" 
            link="/start" 
            tcolor="text-paper_white"
          />
        </div>
      </div>
    </nav>
  );
}