import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
//import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
//import menu from '../data/axesMenu'
//import menu_P from '../data/paintingMenu'
//import menu_S from '../data/sculptureMenu'
//import menu_Perf from '../data/performanceMenu'
//import menu_NM from '../data/newmediaMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
    //const langKey = props.langKey;
    const sel = select(props.langKey);

    return(
      <div className='navbar-item has-dropdown is-hoverable'>
        <div className="navbar-link">
          <FaImage className="menu-names" />
          <FormattedMessage id="axes"/>
        </div>
        <div className="navbar-dropdown">
          <div className="nested navbar-item dropdown">
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="Page navigation">
                <Link to={"/" + props.langKey + "/" + menuTree.navigation[sel] + "/" }>
                  <FormattedMessage id="navigation"/>
                </Link>
              </button>
           </div>
        </div>
      <div className="nested navbar-item dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="page acces art">
            <Link to={"/" + props.langKey + "/" + menuTree.acces_art[sel] + "/"}>
              <FormattedMessage id="acces_art"/>
            </Link>
          </button>
       </div>
    </div>

</div>
</div>
  );
};

RootMenu.propTypes = {
  props: PropTypes.object,
};

export default RootMenu;
