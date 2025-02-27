import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import './Collapsable.css';
import React, { useState } from 'react';

interface CollapsableProps {
    header: string;
    children: React.ReactNode;
}

const Collapsable: React.FC<CollapsableProps> = ({header, children}) => {
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
               <div className="content-wrapper">{children}</div>
            </div>
        </div>
    );
};

export default Collapsable;
