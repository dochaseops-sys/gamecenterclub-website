import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div
            className="flex flex-col space-y-10 justify-center m-10 border-t border-[var(--red)] pt-10">
<div className="flex justify-between">
    <div>
        <p className="text-gray-700 font-medium">About Us</p>
        <p className="text-gray-700 font-medium">Contact Us</p>
        <p className="text-gray-700 font-medium">Privacy Policy</p>
        <p className="text-gray-700 font-medium">Terms of Service</p>
    </div>
            <div className="flex justify-center space-x-5">
                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
                </Link>
                <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                </Link>
                <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                </Link>
                <Link to="https://messenger.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
                </Link>
                <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
                </Link>
            </div>
            <p className="text-center text-gray-700 font-medium">&copy; 2022 Company Ltd. All rights reservered.</p>
</div>
        </div>
    )
}

export default Footer
