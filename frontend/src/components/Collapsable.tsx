import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import './Collapsable.css';
import React, { useState } from 'react';

const Collapsable = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>
            <div
                className={`header ${collapsed ? 'rounded-full' : 'rounded-t'}`}
                onClick={() => setCollapsed(!collapsed)}
            >
                <p className="font-bold">Header</p>
                <MdOutlineArrowBackIosNew
                    className={`arrow ${collapsed ? 'rotate-90' : ''}`}
                />
            </div>
            <div className={`footer ${collapsed ? 'collapsed' : ''}`}>
                <p className="font-bold">Footer</p>
            </div>
        </div>
    );
};

export default Collapsable;
