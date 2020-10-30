import React from "react";
import { Navbar } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";

const ChampionDetail = (props) => {
  const { location } = props;
  const { history } = props;
  const { champion } = location.state;
  const openHome = () => {
    // debugger;
    history.push("/");
  };

  return (
    <div className="container">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>My Watchlist</Navbar.Brand>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={openHome}
        >
          Home
        </button>
      </Navbar>
      <ReactBootStrap.Table responsive="lg" striped bordered hover>
        <thead>
          <th colSpan="2">
            <img src={champion.big_image_url} alt={champion.big_image_url} />
          </th>
        </thead>
        <tbody>
          <tr>
            <td>id </td>
            <td>
              {" "}
              {champion.id}
              {" "}
            </td>
          </tr>
          <tr>
            <td>name </td>
            <td>
              {" "}
              {champion.name}
              {" "}
            </td>
          </tr>
          <tr>
            <td>armor </td>
            <td>
              {" "}
              {champion.armor}
              {" "}
            </td>
          </tr>
          <tr>
            <td>armorperlevel </td>
            <td>
              {" "}
              {champion.armorperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>attackdamage </td>
            <td>
              {" "}
              {champion.attackdamage}
              {" "}
            </td>
          </tr>
          <tr>
            <td>attackdamageperlevel </td>
            <td>
              {" "}
              {champion.attackdamageperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>attackrange </td>
            <td>
              {" "}
              {champion.attackrange}
              {" "}
            </td>
          </tr>
          <tr>
            <td>attackspeedoffset </td>
            <td>
              {" "}
              {champion.attackspeedoffset}
              {" "}
            </td>
          </tr>
          <tr>
            <td>attackspeedperlevel </td>
            <td>
              {" "}
              {champion.attackspeedperlevel}
              {" "}
            </td>
          </tr>

          <tr>
            <td>crit </td>
            <td>
              {" "}
              {champion.crit}
              {" "}
            </td>
          </tr>
          <tr>
            <td>critperlevel </td>
            <td>
              {" "}
              {champion.critperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>hp </td>
            <td>
              {" "}
              {champion.hp}
              {" "}
            </td>
          </tr>
          <tr>
            <td>hpperlevel </td>
            <td>
              {" "}
              {champion.hpperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>hpregen </td>
            <td>
              {" "}
              {champion.hpregen}
              {" "}
            </td>
          </tr>
          <tr>
            <td>hpregenperlevel </td>
            <td>
              {" "}
              {champion.hpregenperlevel}
              {" "}
            </td>
          </tr>

          <tr>
            <td>movespeed </td>
            <td>
              {" "}
              {champion.movespeed}
              {" "}
            </td>
          </tr>
          <tr>
            <td>mp </td>
            <td>
              {" "}
              {champion.mp}
              {" "}
            </td>
          </tr>
          <tr>
            <td>mpperlevel </td>
            <td>
              {" "}
              {champion.mpperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>mpregen </td>
            <td>
              {" "}
              {champion.mpregen}
              {" "}
            </td>
          </tr>
          <tr>
            <td>mpregenperlevel </td>
            <td>
              {" "}
              {champion.mpregenperlevel}
              {" "}
            </td>
          </tr>

          <tr>
            <td>spellblock </td>
            <td>
              {" "}
              {champion.spellblock}
              {" "}
            </td>
          </tr>
          <tr>
            <td>spellblockperlevel </td>
            <td>
              {" "}
              {champion.spellblockperlevel}
              {" "}
            </td>
          </tr>
          <tr>
            <td>videogame_versions</td>
            <td>
              {champion.videogame_versions.map((version) => `${version} ,`)}
            </td>
          </tr>
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

ChampionDetail.propTypes = {
  location: Object.isRequired,
  history: Object.isRequired,
};

export default ChampionDetail;
