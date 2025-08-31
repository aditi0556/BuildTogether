import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
export default function Footer(){
    return (
      <div className="flex flex-col items-center h-25 text-md  text-white bg-black">
        <div>Copyright &copy; 2025 Build Together</div>
        <div className="text-xl">
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          &nbsp;
          <a href="#">
            <FontAwesomeIcon icon={faSquareXTwitter} />
          </a>
          &nbsp;
          <a href="#">
            <FontAwesomeIcon icon={faSquareGithub} />
          </a>
        </div>
        <div  className="cursor-pointer">
          Terms
        </div>
        <div  className="cursor-pointer">
          Privacy Policy
        </div>
      </div>
    );
}
