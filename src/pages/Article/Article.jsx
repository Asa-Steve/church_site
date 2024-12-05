import { Link } from "react-router-dom";
import "./Article.scss";

const Article = () => {
    return (
        <>
            <section className="top">
                <div className="overlay"></div>
                <div className="text">
                    <h1>Event</h1>
                </div>
            </section>

            <div className="stick">
                <div className="event_sect">
                    <div className="left">
                        <img src="./imgs/harvest.jpg" alt="" />
                    </div>
                    <div className="right">
                        <div className="event-head">
                            <h2 className="event-title">
                                Harvest And Thanksgiving 2024
                            </h2>
                            <div className="event-cat"><i><img src="./icons/tag.svg" alt="" /></i>Event</div>
                        </div>

                        <div className="event-body">
                            <h3 className="event-tagline">
                                Harvest of Gratitude
                            </h3>
                            <p className="event-info">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur hic, aperiam esse voluptatum pariatur eveniet sequi dolores eum cupiditate deserunt, maiores rerum fugiat aspernatur alias similique, adipisci dolor quam necessitatibus labore explicabo numquam. Consequatur sed unde voluptate explicabo ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sunt iure accusamus modi ea ullam, corrupti explicabo soluta voluptas nemo cupiditate, cum alias amet odit dignissimos impedit rerum, eum fugiat!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur hic, aperiam esse voluptatum pariatur eveniet sequi dolores eum cupiditate deserunt, maiores rerum fugiat aspernatur alias similique, adipisci dolor quam necessitatibus labore explicabo numquam. Consequatur sed unde voluptate explicabo ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sunt iure accusamus modi ea ullam, corrupti explicabo soluta voluptas nemo cupiditate, cum alias amet odit dignissimos impedit rerum, eum fugiat!
                                dolor sit amet consectetur adipisicing elit. Ipsa tenetur hic, aperiam esse voluptatum pariatur eveniet sequi dolores eum cupiditate deserunt, maiores rerum fugiat aspernatur alias similique, adipisci dolor quam necessitatibus labore explicabo numquam. Consequatur sed unde voluptate explicabo ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sunt iure accusamus modi ea ullam, corrupti explicabo soluta voluptas nemo cupiditate, cum alias amet odit dignissimos impedit rerum, eum fugiat!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur hic, aperiam esse voluptatum pariatur eveniet sequi dolores eum cupiditate deserunt, maiores rerum fugiat aspernatur alias similique, adipisci dolor quam necessitatibus labore explicabo numquam. Consequatur sed unde voluptate explicabo ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sunt iure accusamus modi ea ullam, corrupti explicabo soluta voluptas nemo cupiditate, cum alias amet odit dignissimos impedit rerum, eum fugiat!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tenetur hic, aperiam esse voluptatum pariatur eveniet sequi dolores eum cupiditate deserunt, maiores rerum fugiat aspernatur alias similique, adipisci dolor quam necessitatibus labore explicabo numquam. Consequatur sed unde voluptate explicabo ipsa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sunt iure accusamus modi ea ullam, corrupti explicabo soluta voluptas nemo cupiditate, cum alias amet odit dignissimos impedit rerum, eum fugiat!
                            </p>

                            <p className="source">Source: <Link>htps::/example.com</Link></p>

                            <div className="modalities">
                                <h3>Order of Event</h3>
                                <li>To begin with the Holy Mass on Thursday 18<sup>th</sup> September 2024</li>
                                <li>Followed by the resception 12:00pm GMT +1</li>
                                <li>1 X Rice for Each adult male</li>
                                <li>2 X Live Foul for Each adult Female</li>
                                <li>1 X Pack Of Candle for each Youth and Child. </li>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Article;
