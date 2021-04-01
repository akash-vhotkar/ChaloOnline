import React from "react";
import DashboardIllustration from "../image/dashboard illustration.png";
import Navbar from "./Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
import Card1 from "../image/ill1.png";
import Card2 from "../image/ill2.png";
import Card3 from "../image/ill3.png";
import Card4 from "../image/ill4.png";
import Card5 from "../image/ill5.png";
import Card6 from "../image/ill6.png";

const Dashboard = () => {
    return (
        <React.Fragment>
            <Navbar />
            <section className="container">
                <div className="row my-5">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <img src={DashboardIllustration} alt="Illustration" className="img-fluid" />
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="row my-5">
                    <Card
                        imgsrc={Card1}
                        title="Your Referalls"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                    <Card
                        imgsrc={Card2}
                        title="Team Referalls"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                    <Card
                        imgsrc={Card3}
                        title="Total Referalls Income"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                    <Card
                        imgsrc={Card4}
                        title="Your Points"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                    <Card
                        imgsrc={Card5}
                        title="Activated Account"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                    <Card
                        imgsrc={Card6}
                        title="Withdrawl Income"
                        text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, veritatis neque optio repellat iusto maxime."
                    />
                </div>
            </section>
        </React.Fragment>
    );
}

const Card = (props) => {
    return (
        <>
            <Helmet>
                <title>Dashboard - Chalo Online</title>
                <meta name="description" content="Welcome to Dashboard Chalo online" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

            <div className="col-lg-4 col-md-6 my-3">
                <div className="card">
                    <div className="row py-3">
                        <div className="col-4 my-auto">
                            <img src={props.imgsrc} alt="card" className="img-fluid" />
                        </div>
                        <div className="col-8 pr-4">
                            <h3>{props.title}</h3>
                            <p>{props.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;