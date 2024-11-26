import { useParams } from "react-router-dom";

import "./Priest.scss";
import TeamCards from "../teamCard/TeamCards";


const priests = [
    {
        id: 1,
        name: "Rev. Fr. Bruno Douglas",
        title: "parish priest",
        imgUrl: "pastor3",
        DOB: "August 11, 1978, in Bayelsa, Nigeria",
        Ordained: "July 22, 2007, for the Archdiocese of Lagos",
        bio: {
            Ministry:
                "Fr. Bruno is renowned for his inspiring homilies, compassionate pastoral care, and dedication to education. He has established several educational programs for underprivileged children and has been involved in various community development initiatives. "
            ,

            Personal:
                'Fr. Bruno enjoys reading, playing chess, and listening to classical music. He is a passionate fan of soccer and supports the Nigerian national team. He is the second of five siblings and has nine nieces and nephews who fondly call him "Uncle Bruno".'
            ,

            Education: [
                "Bachelor of Arts in Philosophy, St. Joseph's Seminary (2002)",
                "Master of Divinity, Pontifical Urban University, Rome (2007)"
            ]
            , Assignments: [
                "Parochial Vicar, St. Mary's Parish, Lagos (2007-2012)",
                "Pastor, St.Augustine's Parish, Ibadan (2012-2017)",
                "Pastor, St. Patrick's Parish, Yenagoa, Bayelsa State (2017-present)"
            ]
        }
    },
    {
        id: 2,
        name: "Rev. Fr. Francis Ikwakam",
        title: "Ass. parish priest",
        imgUrl: "pastor2",
        DOB: "August 11, 1994, in Bayelsa, Nigeria",
        Ordained: "July 22, 2007, for the Archdiocese of Lagos",
        bio: {
            Ministry:
                "Fr. Bruno is renowned for his inspiring homilies, compassionate pastoral care, and dedication to education. He has established several educational programs for underprivileged children and has been involved in various community development initiatives. "
            ,

            Personal:
                'Fr. Bruno enjoys reading, playing chess, and listening to classical music. He is a passionate fan of soccer and supports the Nigerian national team. He is the second of five siblings and has nine nieces and nephews who fondly call him "Uncle Bruno".'
            ,

            Education: [
                "Bachelor of Arts in Philosophy, St. Joseph's Seminary (2002)",
                "Master of Divinity, Pontifical Urban University, Rome (2007)"
            ]
            , Assignments: [
                "Parochial Vicar, St. Mary's Parish, Lagos (2007-2012)",
                "Pastor, St.Augustine's Parish, Ibadan (2012-2017)",
                "Pastor, St. Patrick's Parish, Yenagoa, Bayelsa State (2017-present)"
            ]
        }
    },
    {
        id: 3,
        name: "Rev. Fr. Francis Ikwakam",
        title: "Ass. parish priest",
        imgUrl: "pastor1",
        DOB: "August 11, 1978, in Bayelsa, Nigeria",
        Ordained: "July 22, 2007, for the Archdiocese of Lagos",
        bio: {
            Ministry:
                "Fr. Bruno is renowned for his inspiring homilies, compassionate pastoral care, and dedication to education. He has established several educational programs for underprivileged children and has been involved in various community development initiatives. "
            ,

            Personal:
                'Fr. Bruno enjoys reading, playing chess, and listening to classical music. He is a passionate fan of soccer and supports the Nigerian national team. He is the second of five siblings and has nine nieces and nephews who fondly call him "Uncle Bruno".'
            ,

            Education: [
                "Bachelor of Arts in Philosophy, St. Joseph's Seminary (2002)",
                "Master of Divinity, Pontifical Urban University, Rome (2007)"
            ]
            , Assignments: [
                "Parochial Vicar, St. Mary's Parish, Lagos (2007-2012)",
                "Pastor, St.Augustine's Parish, Ibadan (2012-2017)",
                "Pastor, St. Patrick's Parish, Yenagoa, Bayelsa State (2017-present)"
            ]
        }
    },
    {
        id: 4,
        name: "Rev. Fr. Francis Ikwakam",
        title: "Ass. parish priest",
        imgUrl: "p2",
        DOB: "August 11, 1978, in Bayelsa, Nigeria",
        Ordained: "July 22, 2007, for the Archdiocese of Lagos",
        bio: {
            Ministry:
                "Fr. Bruno is renowned for his inspiring homilies, compassionate pastoral care, and dedication to education. He has established several educational programs for underprivileged children and has been involved in various community development initiatives. "
            ,

            Personal:
                'Fr. Bruno enjoys reading, playing chess, and listening to classical music. He is a passionate fan of soccer and supports the Nigerian national team. He is the second of five siblings and has nine nieces and nephews who fondly call him "Uncle Bruno".'
            ,

            Education: [
                "Bachelor of Arts in Philosophy, St. Joseph's Seminary (2002)",
                "Master of Divinity, Pontifical Urban University, Rome (2007)"
            ]
            , Assignments: [
                "Parochial Vicar, St. Mary's Parish, Lagos (2007-2012)",
                "Pastor, St.Augustine's Parish, Ibadan (2012-2017)",
                "Pastor, St. Patrick's Parish, Yenagoa, Bayelsa State (2017-present)"
            ]
        }
    }
];

const team = [
    {
        name: 'Rev. Fr. Bruno Douglas',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Parish Priest',
        imgUrl: "../imgs/pastor3.jpg"
    },
    {
        name: 'Rev. Fr. Francis Ikwakam',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        title: 'Asst. Parish Priest',
        imgUrl: "../imgs/pastor2.jpg"
    },
    {
        name: 'Rev. Fr. Keilah ',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Visiting Priest',
        imgUrl: "../imgs/pastor1.jpg"
    },
    {
        name: 'Rev. Fr. Joseph ',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quisquam quo Numquam.',
        title: 'Visiting Priest',
        imgUrl: "../imgs/p2.jpg"
    }]


const Priest = () => {

    const { pid: priestID } = useParams()

    const priest = priests.filter(fr => fr.id === Number(priestID))[0]

    return (
        <>
            <section className="top" style={{ backgroundImage: `url(../imgs/${priest.imgUrl}.jpg)` }} >
                <div className="overlay"></div>
                <div className="text">
                    <h1>{priest.name}</h1>
                    <h2>{priest.title}</h2>
                </div>
            </section>
            <section className="mid">
                <div className="left">
                    <img src={`../imgs/${priest.imgUrl}.jpg`} alt="" />
                </div>
                <div className="right">
                    <div className="details">

                        <div className="row">
                            <h2>Personal Bio </h2>
                            <p><span>Born: </span> {priest.DOB}</p>
                            <p><span>Ordained: </span> {priest.Ordained}</p>
                        </div>
                        <div className="row">
                            <h4>Education</h4>
                            <ul>{priest.bio.Education.map((ed, idx) => <li key={idx}>- {ed}</li>)}</ul>
                        </div>
                        <div className="row">
                            <h4>Ministry</h4>
                            <p>{priest.bio.Ministry}</p>
                        </div>
                        <div className="row">
                            <h4>Bio</h4>
                            <p>{priest.bio.Personal}</p>
                        </div>
                        <div className="row">
                            <h4>Assignment</h4>
                            <p>{priest.bio.Assignments}</p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="last">
                <div className="wrapper">
                    {team.map((teamMember, idx) =>
                        <TeamCards key={idx} to={`/priest/${idx + 1}`} img={teamMember.imgUrl} name={teamMember.name} desc={teamMember.desc} title={teamMember.title} />
                    )}
                </div>
            </section>
        </>
    );
}

export default Priest;
