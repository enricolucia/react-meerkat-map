'use strict';

import React from 'react';
import BroadcastCount from './BroadcastCount';
import { ListDivider, ListItem } from 'material-ui/lib/lists';
import ListItemAvatar from './ListItemAvatar';
import { mergeAndPrefix } from '../utils/stylePropable';

class SideListItem extends React.Component {
  _getStyles() {
    const theme = this.context.muiTheme.component.listItem;

    return {
      rippleColor: theme.rippleColor,
      primaryText: {
        fontSize: '12px',
        lineHeight: '15px',
      },
      secondaryText: {
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: 0,
      },
      overflow: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '190px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      },
      innerDiv: {
        paddingLeft: '72px',
        paddingRight: '16px',
        paddingBottom: '6px',
        paddingTop: '8px',
      },
      divider: {
        backgroundColor: theme.borderColor,
        paddingTop: '0.1px',
      },
    };
  }

  render() {
    const styles = this._getStyles();
    /* eslint-disable */
    const {
      avatarUrl,
      count,
      description,
      primaryText,
      ...other
    } = this.props;
    /* eslint-enable */

    return (
      <div>
        <ListItem
          {...other}
          focusRippleColor={styles.rippleColor}
          innerDivStyle={styles.innerDiv}
          leftAvatar={<ListItemAvatar className='avatar' src={avatarUrl} />}
          primaryText={
            <div dangerouslySetInnerHTML={{__html: primaryText}} style={mergeAndPrefix(styles.overflow, styles.primaryText)}></div>
          }
          secondaryText={
            <div style={styles.secondaryText}>
              <BroadcastCount count={count} />
              <div dangerouslySetInnerHTML={{__html: description}} style={styles.overflow}></div>
            </div>
          }
          touchRippleColor={styles.rippleColor}
        />
        <ListDivider className='border-bottom' inset={true} style={styles.divider} />
      </div>
    );
  }
}

SideListItem.contextTypes = {
  muiTheme: React.PropTypes.object,
};

SideListItem.propTypes = {
  avatarUrl: React.PropTypes.string,
  count: React.PropTypes.object,
  description: React.PropTypes.string,
  leftAvatar: React.PropTypes.object,
  onTouchTap: React.PropTypes.func,
  primaryText: React.PropTypes.string,
  secondaryText: React.PropTypes.object,
  secondaryTextLines: React.PropTypes.number,
};

SideListItem.defaultProps = {
  description: '',
  primaryText: '',
};

export default SideListItem;
