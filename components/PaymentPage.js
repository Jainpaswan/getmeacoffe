"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentuser, setcurrentuser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  // useEffect(()=>{
  //   getData();
  // },[])

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Payment Done!!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async (params) => {
    let u = await fetchuser(username);
    setcurrentuser({ name: u.name, profilepic: u.profilepic, razorpayid: u.razorpayid }); // Only the needed fields
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments.map(({ name, message, amount }) => ({ name, message, amount }))); // Only required fields
  };
  
  

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Buy me a Coffee", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: `${paymentform.name}`, //your customer's name
        email: "",
        contact: "9432836707", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350]"
          src="/banner.gif"
          alt="banner gif"
        />
        <div className="absolute -bottom-20 right-[46%] border-2 rounded-full bg-slate-700">
          <img
            className="rounded-full"
            width={150}
            height={150}
            src={currentuser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 flex-col gap-2 mb-32">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Lets help {username} get a coffee!..</div>
        <div className="text-slate-400">
          {payments.length} Payments. {currentuser.name} has raised ₹
          {payments.reduce((a, b) => a + b.amount, 0)}
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl  font-bold my-5">Supportes</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && (
                <div className="">No payments done yet!!!</div>
              )}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img
                      width={33}
                      className=" rounded-full border-2 border-white"
                      src="/user-image-2.gif"
                      alt=""
                    />
                    <span>
                      {p.name} <span className="font-bold">{p.amount}</span>{" "}
                      with a message: {p.message}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex flex-col gap-2">
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Name"
                />
              </div>
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amout"
              />
              <button
                onClick={() => pay(Number.parseInt(paymentform.amount * 100))}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-400 disabled:from-purple-300"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4
                }
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2 my-5">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(100)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(5000)}
              >
                Pay ₹50
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(10000)}
              >
                Pay ₹100
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
