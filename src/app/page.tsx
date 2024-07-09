import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className=" d-flex justify-content-center h-100 text-white p-5">
        <button className="btn rounded-pill bg-black text-white "><a href="/auth/login" className="text-decoration-none">Login</a></button>
      </div>
     
      
    </>
  );
}
