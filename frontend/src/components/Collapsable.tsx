import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import './Collapsable.css';
import React, { useState } from 'react';

interface CollapsableProps {
    header: string;
    children: React.ReactNode;
    onToggle?: (isOpen: boolean) => void;
}

const Collapsable: React.FC<CollapsableProps> = ({ header, children, onToggle }) => {
    const [collapsed, setCollapsed] = useState(true);

    const handleToggle = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        if (onToggle) {
            onToggle(!collapsed);
        }
    };

    return (
        <div className='collapsable-container'>
            <div
                className={`header ${collapsed ? 'rounded-full' : 'rounded-t'}`}
                onClick={handleToggle}
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
