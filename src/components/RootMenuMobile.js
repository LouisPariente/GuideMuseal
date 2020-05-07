import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import AccordionCollaps from '../components/AccordionCollaps'
import { FormattedMessage } from 'react-intl';
import menu from '../data/axesMenu'
import menu_P from '../data/paintingMenu'
//import menu_S from '../data/sculptureMenu'
import menu_Perf from '../data/performanceMenu'
import menu_NM from '../data/newmediaMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage } from 'react-icons/fa'

const RootMenuMobile = ( props ) => {

    const langKey = props.langKey;
    //console.log(langKey);
    const sel = select(props.langKey);

    return(
    <div className='navbar-item has-dropdown is-hoverable'>
        <Link classname="navbar-link" to={"/" + props.langKey + "/" + menuTree.navigation[sel] + "/" }>
          <FormattedMessage id="navigation"/>
        </Link>
        <div className="content">
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.acces_art[sel] + "/"}>
            <FormattedMessage id="acces_art"/>
          </Link>
          <div className="navbar-item ">
      </div>
    </div>
</div>
  );
};

RootMenuMobile.propTypes = {
  props: PropTypes.object,
};

export default RootMenuMobile;
