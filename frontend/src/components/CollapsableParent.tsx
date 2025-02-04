import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import './CollapsableParent.css';
import React, { useState } from 'react';

interface CollapsableParentProps {
    header: string;
    children: React.ReactNode;
}

const CollapsableParent: React.FC<CollapsableParentProps> = ({header, children}) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className='collapsable-container'>
            <div
                className={`header ${collapsed ? 'rounded-full' : 'rounded-t'}`}
                onClick={() => setCollapsed(!collapsed)}
            >
                <p className="font-bold">{header}</p>
                <MdOutlineArrowBackIosNew
                    className={`arrow ${collapsed ? 'rotate-90' : ''}`}
                />
            </div>
            <div className={`footer ${collapsed ? 'collapsed' : ''}`}>
                <p className="font-bold">{children}</p>
            </div>
        </div>
    );
};

export default CollapsableParent;
