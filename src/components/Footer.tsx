import classNames from "@/utils";
import { Link } from "react-router-dom";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={classNames(className, `py-4 border-t border-gray-200 dark:border-gray-800`)}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 flex-wrap">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="logo" className="object-contain h-8 w-10" />
          <p className="hidden md:block text-sm font-bold text-white">Anime Magic</p>
        </Link>
        <p className="text-center">Copyright © {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
