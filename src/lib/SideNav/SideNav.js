import React, { Component } from 'react';

/*

    <SideNav>
        <NavSection leftIcon={</Element>} label="" onCLick={() => {}} active={true|false}>
            <NavOption active={true|false} onClick={()={}}>
                text
            </NavOptiion/>
        </NavSection>
    </SideNav>
*/

class SideNav extends Component {
    render() {

        const { children } = this.props;

        return (
            <ul>
                <li>{children}</li>
            </ul>
        );
    }
}

export default SideNav;