"use client";
import { useRouter } from "@/i18n/routing";
import { IoIosArrowBack } from "react-icons/io";
const Back = () => {
  const router = useRouter();
  return <IoIosArrowBack size={30} onClick={router.back} />;
};
export default Back;
