import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './FolderNav.css';

class FolderNav extends Component {
    static contextType = ApiContext;

    render() {
        const { folders=[] } = this.context
        const folderList = folders.map(f => (<li key={f.id}><NavLink className='FolderNav_folder-link'to={`/folder/${f.id}`}>{f.folder_name}</NavLink></li>))
        return(
            <div className='FolderNav'>
                <ul className='FolderNav_list'>
                    {folderList}
                </ul>
                <div className='FolderNav_button-wrapper'>
                    <NavLink to='/add-folder' className='FolderNav_add-folder-button'>
                        Add folder
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default FolderNav;