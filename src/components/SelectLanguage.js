import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';
import En from './Flags/En';
import Fr from './Flags/Fr';

const getIcon = langKey => {
  switch (langKey) {
    case 'en': return <En />;
    case 'fr': return <Fr />;
    default: return null;
  }
};

const getLanguage = langKey => {
  switch (langKey) {
    case 'en': return "English";
    case 'fr': return "French";
    default: return null;
  }
};

const SelectLanguage = (props) => {
  const links = props.langs.map(lang =>
      <li className="flags" key={lang.langKey} selected={lang.selected}>
        <Link to={lang.link} alt={lang.langKey} style={{
          color: '#b71540'
        }} aria-label={"Switch to " + getLanguage(lang.langKey)}>
        {getIcon(lang.langKey)}
          </Link>
      </li>
  );

  return (
    <div className="section" style={{ padding: '1.5rem' }}>
      <header style={{
        color: '#b71540'
      }}>
        <FormattedMessage id="selectLanguage" />
      </header>
      <ul>
        {links}
      </ul>
    </div>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
