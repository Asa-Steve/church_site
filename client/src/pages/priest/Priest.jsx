import { useParams } from "react-router-dom";

import "./Priest.scss";
import TeamCards from "../../components/common/teamCard/TeamCards";
import priests from "../../components/Utils/priests";
import team from "../../components/Utils/team";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";

const Priest = () => {
  const { pid: priestID } = useParams();

  const [priest] = priests.filter((fr) => fr.id === Number(priestID));
  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section
          className="top"
          style={{ backgroundImage: `url(../imgs/${priest.imgUrl}.jpg)` }}
        >
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
                <p>
                  <span>Born: </span> {priest.DOB}
                </p>
                <p>
                  <span>Ordained: </span> {priest.Ordained}
                </p>
              </div>
              <div className="row">
                <h4>Education</h4>
                <ul>
                  {priest.bio.Education.map((ed, idx) => (
                    <li key={idx}>- {ed}</li>
                  ))}
                </ul>
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
            {team.map((teamMember, idx) => {
              return (
                idx !== Number(priestID) - 1 && (
                  <TeamCards
                    key={idx}
                    to={`/priest/${idx + 1}`}
                    img={teamMember.imgUrl}
                    name={teamMember.name}
                    desc={teamMember.desc}
                    title={teamMember.title}
                  />
                )
              );
            })}
          </div>
        </section>
      </>
    );
  }
};

export default Priest;
